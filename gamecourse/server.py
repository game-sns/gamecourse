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

from flask import Flask, request, redirect, url_for

from gamecourse.config import APP_NAME, APP_HOST, APP_PORT, UPLOAD_FOLDER
from gamecourse.pages import get_index
from gamecourse.utils import can_upload, get_upload_path, prepare_folders

app = Flask(APP_NAME)


def upload_file(req):
    """
    :param req: flask request
        Server request
    :return: void
        Redirects to index after uploading file
    """

    file_to_upload = req.files["file"]
    filename = file_to_upload.filename
    if file_to_upload and can_upload(filename):
        file_to_upload.save(
            get_upload_path(filename, app.config["UPLOAD_FOLDER"])
        )

        return redirect(url_for("index"))


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        upload_file(request)
        return "file uploaded!"

    return get_index()


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
