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


""" Models and data structure """

import json

from validate_email import validate_email

from gamecourse.utils import can_upload


class XMLHttpRequest:
    """ Parse XMLHttpRequest """

    def __init__(self, req):
        """
        :param req: Request
            Client request
        """

        self.data = req.data
        self.files = req.files
        self.form = req.form
        self.meta_data = None

        self._parse()

    def _parse(self):
        """
        :return: void
            Parses and prettify data
        """

        self._parse_files()
        self._parse_form()
        self._parse_data()

    def _parse_files(self):
        """
        :return: void
            Parse and prettify raw data files
        """

        files = {}
        for filename in self.files:
            files[filename] = self.files[filename]
        self.files = files

    def _parse_form(self):
        """
        :return: void
            Parse and prettify raw data form
        """

        form = {}
        for entry in self.form:
            form[entry] = self.form[entry]
        self.form = form

    def _parse_data(self):
        """
        :return: void
            Sets metadata
        """

        self.meta_data = self.form["meta-data"] or None
        self.meta_data = json.loads(self.meta_data)

    def is_good_request(self):
        """
        :return: bool
            True iff request is written in valid format
        """

        if len(self.files) != 2:
            return False

        if not can_upload(self.files[0].filename) or \
                not can_upload(self.files[0].filename):
            return False

        if len(self.meta_data) != 3:
            return False

        if not validate_email(self.meta_data["Email"]):
            return False

        if len(self.meta_data["PhysicalProprieties"]) != 7:
            return False

        return True

    def __str__(self):
        out = "*** files: " + str(self.files) + "\n"
        out += "*** meta data: " + str(self.meta_data) + "\n"
        return out
