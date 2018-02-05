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


""" Install dependencies """

from setuptools import setup, find_packages

LITTLE_DESCRIPTION = "Run a server to accept GAME models input"

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
    version="0.1",
    description=LITTLE_DESCRIPTION,
    long_description=DESCRIPTION,
    license="Apache License, Version 2.0",
    keywords="game flask server",
    url="https://github.com/sirfoga/gamecourse",
    packages=find_packages(exclude=["tests"]),
    # todo package_data={"gamecourse": [".*", "*.json"]},
    include_package_data=True,
    install_requires=[
        "werkzeug",
        "flask",
        "validate_email"
    ],
    entry_points={
        "console_scripts": ["gamecourse = gamecourse.server:cli"]
    }
)
