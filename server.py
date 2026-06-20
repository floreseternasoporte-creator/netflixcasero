#!/usr/bin/env python3
import hashlib
import time
import os
import io
import requests
from urllib.parse import urlparse, urlunparse, parse_qsl, urlencode
from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__)

CLOUDINARY_API_KEY    = os.environ.get('CLOUDINARY_API_KEY', '238548142884869')
CLOUDINARY_API_SECRET = os.environ.get('CLOUDINARY_API_SECRET', 'R9mMGi3x6q6qp2U1hgaT_g1yWNQ')
CLOUDINARY_CLOUD_NAME = os.environ.get('CLOUDINARY_CLOUD_NAME', 'dubsgko2k')
ELEVENLABS_API_KEY    = os.environ.get('ELEVENLABS_API_KEY', '')

DIRECTORY = os.path.dirname(os.path.abspath(__file__))

LANGUAGE_CODE_ALIASES = {
    'auto': 'auto',
    'automatic': 'auto',
    'original': 'auto',
    '': 'auto',
    'es': 'es',
    'spa': 'es',
    'spanish': 'es',
    'español': 'es',
    'espanol': 'es',
    'castellano': 'es',
    'en': 'en',
    'eng': 'en',
    'english': 'en',
    'inglés': 'en',
    'ingles': 'en',
    'pt': 'pt',
    'por': 'pt',
    'portuguese': 'pt',
    'portugués': 'pt',
    'portugues': 'pt',
    'ja': 'ja',
    'jpn': 'ja',
    'japanese': 'ja',
    'japonés': 'ja',
    'japones': 'ja',
    '日本語': 'ja',
    'ko': 'ko',
    'kor': 'ko',
    'korean': 'ko',
    'coreano': 'ko',
    'zh': 'zh',
    'zho': 'zh',
    'chi': 'zh',
    'chinese': 'zh',
    'chino': 'zh',
}


def normalize_language_code(value):
    """Return an ElevenLabs-compatible language code or auto."""
    if value is None:
        return 'auto'
    key = str(value).strip().lower()
    return LANGUAGE_CODE_ALIASES.get(key, key if 2 <= len(key) <= 3 and key.isalpha() else 'auto')


def normalize_source_url(source_url):
    """Normalize user-facing media URLs before passing them to ElevenLabs."""
    if not source_url:
        return ''
    source_url = str(source_url).strip()
    parsed = urlparse(source_url)
    if not parsed.scheme or not parsed.netloc:
        return source_url

    host = parsed.netloc.lower()
    query = dict(parse_qsl(parsed.query, keep_blank_values=True))
    if host in ('dropbox.com', 'www.dropbox.com'):
        query.pop('dl', None)
        return urlunparse((
            parsed.scheme,
            'dl.dropboxusercontent.com',
            parsed.path,
            parsed.params,
            urlencode(query),
            parsed.fragment,
        ))

    if host == 'dl.dropboxusercontent.com':
        query.pop('dl', None)
        return urlunparse((parsed.scheme, parsed.netloc, parsed.path, parsed.params, urlencode(query), parsed.fragment))

    return source_url


@app.route('/api/upload', methods=['POST', 'OPTIONS'])
def upload_proxy():
    if request.method == 'OPTIONS':
        resp = jsonify({})
        resp.headers['Access-Control-Allow-Origin'] = '*'
        resp.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        resp.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        return resp

    file = request.files.get('file')
    if not file:
        return jsonify({'error': 'No se recibió ningún archivo'}), 400

    folder    = request.form.get('folder', 'atenis-mini')
    timestamp = int(time.time())

    param_string = f'folder={folder}&timestamp={timestamp}{CLOUDINARY_API_SECRET}'
    signature    = hashlib.sha1(param_string.encode('utf-8')).hexdigest()

    upload_url = f'https://api.cloudinary.com/v1_1/{CLOUDINARY_CLOUD_NAME}/auto/upload'

    try:
        resp = requests.post(upload_url, data={
            'api_key':   CLOUDINARY_API_KEY,
            'timestamp': timestamp,
            'signature': signature,
            'folder':    folder,
        }, files={
            'file': (file.filename, file.stream, file.content_type)
        }, timeout=300)

        data = resp.json()
        if resp.status_code == 200:
            result = jsonify({'url': data['secure_url']})
        else:
            msg = data.get('error', {}).get('message', f'HTTP {resp.status_code}')
            result = jsonify({'error': msg}), resp.status_code
    except requests.exceptions.Timeout:
        result = jsonify({'error': 'Tiempo de espera agotado al subir a Cloudinary'}), 504
    except Exception as e:
        result = jsonify({'error': str(e)}), 500

    if isinstance(result, tuple):
        resp_obj, code = result
        resp_obj.headers['Access-Control-Allow-Origin'] = '*'
        return resp_obj, code
    result.headers['Access-Control-Allow-Origin'] = '*'
    return result


# ── ElevenLabs Dubbing Proxy ──────────────────────────────────────────────────

@app.route('/api/dub', methods=['POST', 'OPTIONS'])
def start_dubbing():
    if request.method == 'OPTIONS':
        resp = jsonify({})
        resp.headers['Access-Control-Allow-Origin'] = '*'
        resp.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        resp.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        return resp

    if not ELEVENLABS_API_KEY:
        return jsonify({'error': 'ElevenLabs API key not configured'}), 500

    data = request.get_json()
    if not data:
        return jsonify({'error': 'JSON body required'}), 400

    source_url  = normalize_source_url(data.get('source_url'))
    target_lang = normalize_language_code(data.get('target_lang'))
    source_lang = normalize_language_code(data.get('source_lang', 'auto'))

    if not source_url or not target_lang:
        return jsonify({'error': 'source_url and target_lang are required'}), 400

    try:
        form_data = {
            'source_url': source_url,
            'target_lang': target_lang,
            'num_speakers': '0',
            'watermark': 'false',
        }
        if source_lang != 'auto':
            form_data['source_lang'] = source_lang

        # ElevenLabs dubbing API requires multipart/form-data, NOT JSON
        el_resp = requests.post(
            'https://api.elevenlabs.io/v1/dubbing',
            headers={'xi-api-key': ELEVENLABS_API_KEY},
            data=form_data,
            timeout=60
        )

        if el_resp.status_code == 200:
            result = jsonify(el_resp.json())
        else:
            try:
                err_data = el_resp.json()
            except Exception:
                err_data = {'detail': el_resp.text}
            result = jsonify({'error': err_data.get('detail', f'HTTP {el_resp.status_code}')}), el_resp.status_code

    except Exception as e:
        result = jsonify({'error': str(e)}), 500

    if isinstance(result, tuple):
        resp_obj, code = result
        resp_obj.headers['Access-Control-Allow-Origin'] = '*'
        return resp_obj, code
    result.headers['Access-Control-Allow-Origin'] = '*'
    return result


@app.route('/api/dub/<job_id>/status', methods=['GET'])
def check_dubbing_status(job_id):
    if not ELEVENLABS_API_KEY:
        return jsonify({'error': 'ElevenLabs API key not configured'}), 500

    try:
        el_resp = requests.get(
            f'https://api.elevenlabs.io/v1/dubbing/{job_id}',
            headers={'xi-api-key': ELEVENLABS_API_KEY},
            timeout=30
        )
        resp = jsonify(el_resp.json())
    except Exception as e:
        resp = jsonify({'error': str(e)}), 500

    if isinstance(resp, tuple):
        r, c = resp
        r.headers['Access-Control-Allow-Origin'] = '*'
        return r, c
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp


@app.route('/api/dub/<job_id>/audio/<lang>', methods=['GET'])
def get_dubbed_audio(job_id, lang):
    """Download dubbed audio from ElevenLabs and upload to Cloudinary."""
    if not ELEVENLABS_API_KEY:
        return jsonify({'error': 'ElevenLabs API key not configured'}), 500

    try:
        # Download audio from ElevenLabs
        el_resp = requests.get(
            f'https://api.elevenlabs.io/v1/dubbing/{job_id}/audio/{lang}',
            headers={'xi-api-key': ELEVENLABS_API_KEY},
            timeout=120,
            stream=True
        )

        if el_resp.status_code != 200:
            try:
                err = el_resp.json()
            except Exception:
                err = {'detail': el_resp.text}
            resp = jsonify({'error': err.get('detail', f'HTTP {el_resp.status_code}')}), el_resp.status_code
            if isinstance(resp, tuple):
                r, c = resp
                r.headers['Access-Control-Allow-Origin'] = '*'
                return r, c

        audio_data = el_resp.content
        content_type = el_resp.headers.get('Content-Type', 'audio/mpeg')

        # Upload to Cloudinary
        folder    = 'atenis-dubs'
        timestamp = int(time.time())
        public_id = f'{job_id}_{lang}'
        param_str = f'folder={folder}&public_id={public_id}&timestamp={timestamp}{CLOUDINARY_API_SECRET}'
        signature = hashlib.sha1(param_str.encode('utf-8')).hexdigest()

        upload_url = f'https://api.cloudinary.com/v1_1/{CLOUDINARY_CLOUD_NAME}/raw/upload'

        cloud_resp = requests.post(upload_url, data={
            'api_key':   CLOUDINARY_API_KEY,
            'timestamp': timestamp,
            'signature': signature,
            'folder':    folder,
            'public_id': public_id,
        }, files={
            'file': (f'{public_id}.mp3', io.BytesIO(audio_data), content_type)
        }, timeout=300)

        cloud_data = cloud_resp.json()
        if cloud_resp.status_code == 200 and cloud_data.get('secure_url'):
            resp = jsonify({'url': cloud_data['secure_url']})
        else:
            msg = cloud_data.get('error', {}).get('message', f'Cloudinary HTTP {cloud_resp.status_code}')
            resp = jsonify({'error': msg}), cloud_resp.status_code

    except Exception as e:
        resp = jsonify({'error': str(e)}), 500

    if isinstance(resp, tuple):
        r, c = resp
        r.headers['Access-Control-Allow-Origin'] = '*'
        return r, c
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp


@app.after_request
def add_headers(response):
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    response.headers['Pragma']        = 'no-cache'
    response.headers['Expires']       = '0'
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


@app.route('/')
def index():
    return send_from_directory(DIRECTORY, 'app.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory(DIRECTORY, path)


if __name__ == '__main__':
    print('Atenis server running on http://0.0.0.0:5000')
    app.run(host='0.0.0.0', port=5000, debug=False)
