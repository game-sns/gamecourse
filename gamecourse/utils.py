# !/usr/bin/python3
# coding: utf-8

# Copyright YYYY AUTHORS
#
# YOUR COPYRIGHT HERE (IF YOU WANT IT)


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
