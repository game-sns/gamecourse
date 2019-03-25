# !/usr/bin/python3
# coding: utf-8

""" Install dependencies """

from setuptools import setup, find_packages

LITTLE_DESCRIPTION = "Run a server to accept GAME request input"

DESCRIPTION = \
    "gamecourse\n\n" + LITTLE_DESCRIPTION + "\n\
    Install\n\n\
    - $ python3 setup.py install  # from source\n\
    \n\
    Questions and issues\n\n\
    The Github issue tracker is only for bug reports and feature requests.\n\
    License: Apache License Version 2.0, January 2004"

setup(
    name="gamecourse",
    version="1.1.0",
    description=LITTLE_DESCRIPTION,
    long_description=DESCRIPTION,
    license="MIT",
    keywords="game flask server",
    url="https://github.com/sirfoga/gamecourse",
    packages=find_packages(exclude=["tests"]),
    include_package_data=True,
    install_requires=[
        "werkzeug",
        "flask",
        "validate_email",
        'requests'
    ],
    entry_points={
        "console_scripts": ["gamecourse = gamecourse.server:cli"]
    }
)
