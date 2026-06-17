#!/usr/bin/env python3
import hashlib
import time
import os
import json
from flask import Flask, request, jsonify, send_from_directory, send_file

app = Flask(__name__)

CLOUDINARY_API_KEY    = '238548142884869'
CLOUDINARY_API_SECRET = 'R9mMGi3x6q6qp2U1hgaT_g1yWNQ'
CLOUDINARY_CLOUD_NAME = 'dubsgko2k'

DIRECTORY = os.path.dirname(os.path.abspath(__file__))

@app.route('/api/cloudinary-sign', methods=['POST', 'OPTIONS'])
def cloudinary_sign():
    if request.method == 'OPTIONS':
        resp = jsonify({})
        resp.headers['Access-Control-Allow-Origin'] = '*'
        resp.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        resp.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        return resp

    data = request.get_json(force=True) or {}
    timestamp = int(time.time())

    extra = {k: v for k, v in data.items() if k not in ('file', 'api_key', 'api_secret')}
    params = {'folder': 'atenis-mini', 'timestamp': timestamp}
    params.update(extra)

    sorted_params = sorted(params.items())
    param_string = '&'.join(f'{k}={v}' for k, v in sorted_params)
    param_string += CLOUDINARY_API_SECRET

    signature = hashlib.sha1(param_string.encode('utf-8')).hexdigest()

    resp = jsonify({
        'signature':    signature,
        'timestamp':    timestamp,
        'api_key':      CLOUDINARY_API_KEY,
        'cloud_name':   CLOUDINARY_CLOUD_NAME
    })
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
