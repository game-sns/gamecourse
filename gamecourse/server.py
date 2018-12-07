# !/usr/bin/python3
# coding: utf-8


""" Startup the server """

from flask import Flask, request, abort

from gamecourse.config import APP_NAME, APP_HOST, APP_PORT, UPLOAD_FOLDER, \
    MAX_REQUESTS_PER_HOUR
from gamecourse.models.tables import ControlTable
from gamecourse.request.handlers import handle_request
from gamecourse.utils import prepare_folders

app = Flask(APP_NAME)
ip_table = ControlTable(
    MAX_REQUESTS_PER_HOUR["get"]["ip"],
    MAX_REQUESTS_PER_HOUR["post"]["ip"]
)  # table to control requests by IP
email_table = ControlTable(
    MAX_REQUESTS_PER_HOUR["get"]["email"],
    MAX_REQUESTS_PER_HOUR["post"]["email"]
)  # table to control requests by email


@app.before_request
def limit_remote_addr():
    if not (ip_table.handle_request(request) and email_table.handle_request(
            request)):
        abort(429)  # too many request in given time


@app.route("/", methods=["GET", "POST"])
def index():
    return handle_request(request)


if __name__ == "__main__":
    app.debug = True

    prepare_folders()
    app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
    app.run(host=APP_HOST, port=APP_PORT, debug=True)
