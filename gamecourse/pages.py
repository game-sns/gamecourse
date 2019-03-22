# !/usr/bin/python3
# coding: utf-8

""" Fetches web pages """

from flask import render_template

INDEX_TEMPLATE = "index.html"


def get_index():
    """
    :return: str
        Index page
    """

    return render_template(INDEX_TEMPLATE)