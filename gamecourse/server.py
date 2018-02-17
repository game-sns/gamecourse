# !/usr/bin/python3
# coding: utf-8

# Copyright YYYY AUTHORS
#
# YOUR COPYRIGHT HERE (IF YOU WANT IT)


""" Startup the server """

from flask import Flask, request

from gamecourse.config import APP_NAME, APP_HOST, APP_PORT, UPLOAD_FOLDER
from gamecourse.models import XMLHttpRequest
from gamecourse.pages import get_index
from gamecourse.utils import can_upload, get_upload_path, prepare_folders

app = Flask(APP_NAME)
app.debug = True


def upload_file(file_to_upload, folder=UPLOAD_FOLDER):
    """
    :param file_to_upload: file to upload in request
        File request
    :param folder: str
        Path to folder where to upload file
    :return: void
        Redirects to index after uploading file
    """

    filename = file_to_upload.filename
    if file_to_upload and can_upload(filename):
        file_to_upload.save(
            get_upload_path(filename, folder)
        )
        return True

    return False


def handle_request(req):
    """
    :param req: flask request
        Server request
    :return: void
        Parses request, if good format, then uploads data
    """

    xhr = XMLHttpRequest(req)
    if xhr.is_good_request():
        for _, file in xhr.files.items():
            if not upload_file(file, folder=xhr.upload_folder):
                return False
        xhr.write_data_to_file()  # write meta-data
        xhr.write_labels_to_file()
        return True

    return False


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        try:
            if handle_request(request):
                return "200"
            return "-1"
        except Exception as e:
            print("Cannot handle request due to", e)

    return get_index()  # GET request


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
