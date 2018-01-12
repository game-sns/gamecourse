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


""" Tools """

import os

from werkzeug.utils import secure_filename

from gamecourse.config import ALLOWED_EXTENSIONS, UPLOAD_FOLDER


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


def get_upload_path(filename, upload_folder):
    """
    :param filename: str
        Path or file to upload
    :param upload_folder: str
        Default folder where uploads go
    :return: str
        Path where file should be uploaded
    """

    fil = secure_filename(filename)
    return os.path.join(upload_folder, fil)


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
