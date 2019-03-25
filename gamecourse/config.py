# !/usr/bin/python3
# coding: utf-8

""" Server config """

import json
import os

APP_NAME = "gamecourse"
APP_HOST = "localhost"
APP_PORT = 8001

THIS_FOLDER = os.path.dirname(os.path.realpath(__file__))
ROOT_FOLDER = os.path.dirname(THIS_FOLDER)
CONFIG_FILE = os.path.join(ROOT_FOLDER, 'config', 'config.json')
CONFIG = json.load(open(CONFIG_FILE, 'r'))

UPLOAD_FOLDER = CONFIG['upload folder']

TEMPLATES_FOLDER = os.path.join(
    ROOT_FOLDER,
    "templates"
)
STATIC_FOLDER = os.path.join(
    ROOT_FOLDER,
    "static"
)
DATA_FOLDER = os.path.join(
    ROOT_FOLDER,
    "data"
)
ALLOWED_EXTENSIONS = {"dat"}
MAX_REQUESTS_PER_HOUR = {
    "get": {
        "ip": 60 * 4,  # one each 15 seconds
        "email": 60 * 4
    },
    "post": {
        "ip": 12,  # one each 5 minutes
        "email": 6  # one each 10 minutes
    }
}
