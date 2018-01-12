# !/usr/bin/python3
# coding: utf_8

# Copyright 2017-2018 Stefano Fogarollo
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


""" Startup the server """

import os

from flask import Flask, request, redirect, url_for
from werkzeug import secure_filename

APP_NAME = "gamecourse"
APP_HOST = "0.0.0.0"  # todo in cli
APP_PORT = 1729

THIS_FOLDER = os.path.dirname(os.path.realpath(__file__))
UPLOAD_FOLDER = os.path.join(
    THIS_FOLDER,
    "uploads"
)
TEMPLATES_FOLDER = os.path.join(
    THIS_FOLDER,
    "templates"
)
UPLOAD_TEMPLATE = os.path.join(
    TEMPLATES_FOLDER,
    "upload.html"
)
ALLOWED_EXTENSIONS = {"dat"}  # allow only these extensions

app = Flask(APP_NAME)


def get_extension(filename):
    """
    :param filename: str
        Path or file
    :return: str
        Extension of file
    """

    if "." in filename:
        return filename.rsplit(".", 1)[1]
    return None


def can_upload(filename):
    """
    :param filename: str
        Path or file
    :return: bool
        True iff file is allowed tu be uploaded
    """

    return filename and get_extension(filename) in ALLOWED_EXTENSIONS


def get_upload_path(filename):
    """
    :param filename: str
        Path or file to upload
    :return: str
        Path where file should be uploaded
    """

    fil = secure_filename(filename)
    return os.path.join(app.config["UPLOAD_FOLDER"], fil)


def prepare_folders():
    """
    :return: void
        Creates necessary folders to execute server
    """

    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)


def read_file(filename):
    """
    :param filename: str
        Path or file
    :return: str
        Content of file
    """

    with open(filename, "r") as inp:
        return inp.read()


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        file_to_upload = request.files["file"]
        filename = file_to_upload.filename
        if file_to_upload and can_upload(filename):
            file_to_upload.save(get_upload_path(filename))
            return redirect(url_for("index"))

    return read_file(UPLOAD_TEMPLATE)


def cli():
    """
    :return: void
        Run this as cmd program
    """

    app.run(host=APP_HOST, port=APP_PORT, debug=True)


if __name__ == "__main__":
    prepare_folders()
    app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
    cli()
