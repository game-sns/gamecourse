# !/usr/bin/python3
# coding: utf-8

""" Fetches web pages """

from flask import render_template

UPLOAD_TEMPLATE = "upload.html"
INDEX_TEMPLATE = "index.html"


def get_index():
    """
    :return: str
        Index page
    """

    return render_template(INDEX_TEMPLATE)


def get_simple_upload():
    """
    :return: str
        Page with simple upload
    """

    return render_template(UPLOAD_TEMPLATE)
