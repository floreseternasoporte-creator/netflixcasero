#!/usr/bin/env python3
import os
from flask import Flask, send_from_directory

app = Flask(__name__)

DIRECTORY = os.path.dirname(os.path.abspath(__file__))

@app.route('/')
def index():
    return send_from_directory(DIRECTORY, 'app.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory(DIRECTORY, path)

if __name__ == '__main__':
    print('Atenis server running on http://0.0.0.0:5000')
    app.run(host='0.0.0.0', port=5000, debug=False)
