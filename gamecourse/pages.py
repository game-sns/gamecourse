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


""" Fetches web pages """

import os

from gamecourse.config import TEMPLATES_FOLDER
from gamecourse.utils import read_file

UPLOAD_TEMPLATE = os.path.join(
    TEMPLATES_FOLDER,
    "upload.html"
)
INDEX_TEMPLATE = os.path.join(
    TEMPLATES_FOLDER,
    "index.html"
)


def get_index():
    """
    :return: str
        Index page
    """

    return read_file(INDEX_TEMPLATE)


def get_simple_upload():
    """
    :return: str
        Page with simple upload
    """

    return read_file(UPLOAD_TEMPLATE)
