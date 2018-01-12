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

UPLOAD_FOLDER = "/tmp/"
ALLOWED_EXTENSIONS = {"txt"}

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


def allowed_file(filename):
    allowed = "." in filename and \
              filename.rsplit(".", 1)[1] in ALLOWED_EXTENSIONS
    print(filename, "allowed?", allowed)
    return allowed


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        file = request.files["file"]
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            p = os.path.join(app.config["UPLOAD_FOLDER"], filename)
            print("saved file to", p)
            file.save(p)
            return redirect(url_for("index"))
    return """
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form action="" method=post enctype=multipart/form-data>
      <p><input type=file name=file>
         <input type=submit value=Upload>
    </form>
    <p>%s</p>
    """ % "<br>".join(os.listdir(app.config["UPLOAD_FOLDER"], ))


def cli():
    """
    :return: void
        Run this as cmd program
    """

    app.run(host="0.0.0.0", port=5001, debug=True)


if __name__ == "__main__":
    cli()
