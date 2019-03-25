# !/usr/bin/python3
# coding: utf-8


""" Startup the server """

from flask import Flask, request

from gamecourse.config import APP_NAME, APP_HOST, APP_PORT, UPLOAD_FOLDER
from gamecourse.request.handlers import handle_request
from gamecourse.utils import prepare_folders

app = Flask(APP_NAME)
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024  # 10 MB


@app.route("/", methods=["GET", "POST"])
def index():
    return handle_request(request)


if __name__ == "__main__":
    app.debug = True

    prepare_folders()
    app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
    app.run(host=APP_HOST, port=APP_PORT, debug=True)
