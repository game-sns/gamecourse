# !/usr/bin/python3
# coding: utf-8


""" Handle server requests """

from gamecourse.pages import get_index

from gamecourse.request.core import XMLHttpRequest


def handle_request(req):
    """
    :param req: flask request
        Server request
    :return: str
        Handle GET/POST requests
    """

    if req.method == "POST":
        try:
            if post_request(req):
                return "200"
            return "500"
        except Exception as e:
            print("Cannot handle request due to", e)

    return get_index()


def post_request(req):
    """
    :param req: flask request
        Server request
    :return: void
        Parses request, if good format, then uploads data
    """

    xhr = XMLHttpRequest(req)
    x = xhr.upload()
    print(x)
    return x


def get_request(req):
    """
    :param req: flask request
        Server request
    :return: flask template
        Returns template of file of GET
    """

    return get_index()
