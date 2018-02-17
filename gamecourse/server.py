# !/usr/bin/python3
# coding: utf-8

# Copyright YYYY AUTHORS
#
# YOUR COPYRIGHT HERE (IF YOU WANT IT)


""" Startup the server """

from flask import Flask, request

from gamecourse.config import APP_NAME, APP_HOST, APP_PORT, UPLOAD_FOLDER
from gamecourse.request.handlers import handle_request
from gamecourse.utils import prepare_folders

app = Flask(APP_NAME)


@app.route("/", methods=["GET", "POST"])
def index():
    handle_request(request)


if __name__ == "__main__":
    prepare_folders()
    app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
    app.run(host=APP_HOST, port=APP_PORT, debug=True)
