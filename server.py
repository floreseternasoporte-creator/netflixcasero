#!/usr/bin/env python3
import hashlib
import time
import os
import requests
from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__)

CLOUDINARY_API_KEY    = '238548142884869'
CLOUDINARY_API_SECRET = 'R9mMGi3x6q6qp2U1hgaT_g1yWNQ'
CLOUDINARY_CLOUD_NAME = 'dubsgko2k'

DIRECTORY = os.path.dirname(os.path.abspath(__file__))


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
