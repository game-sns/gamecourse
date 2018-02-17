# !/usr/bin/python3
# coding: utf-8

# Copyright YYYY AUTHORS
#
# YOUR COPYRIGHT HERE (IF YOU WANT IT)


""" Startup the server """

from flask import Flask, request, abort

from gamecourse.config import APP_NAME, APP_HOST, APP_PORT, UPLOAD_FOLDER
from gamecourse.request.handlers import handle_request
from gamecourse.utils import prepare_folders

app = Flask(APP_NAME)


@app.before_request
def limit_remote_addr():
    if request.remote_addr != '10.20.30.40':
        abort(403)  # forbidden


@app.route("/", methods=["GET", "POST"])
def index():
    return handle_request(request)


if __name__ == "__main__":
    app.debug = True

    prepare_folders()
    app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
    app.run(host=APP_HOST, port=APP_PORT, debug=True)
