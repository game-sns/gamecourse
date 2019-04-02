# !/usr/bin/python3
# coding: utf-8


""" Models and data structure """

import json
import os
import uuid

import requests
from validate_email import validate_email

from gamecourse.config import UPLOAD_FOLDER, CONFIG
from gamecourse.utils import can_upload, upload_file

CAPTCHA_VALIDATE_URL = "https://www.google.com/recaptcha/api/siteverify"


class XMLHttpRequest:
    """ Parse XMLHttpRequest """

    def __init__(self, req):
        """
        :param req: Request
            Client request
        """

        if True:  # self._is_captcha_correct(req):
            self.files = req.files
            self.input_file, self.error_file = None, None

            self.form = req.form
            self.meta_data = None
            self.upload_folder = None

            self._parse()

    def _is_captcha_correct(self, req):
        try:
            candidate_response = str(req.form['g-recaptcha-response'])
            secret = CONFIG['captcha secret']
            payload = {'response': candidate_response, 'secret': secret}
            response = requests.post(CAPTCHA_VALIDATE_URL, payload)

            response_text = json.loads(response.text)
            return bool(response_text['success'])
        except Exception as e:
            print(e)
            return False

    def _parse(self):
        """
        :return: void
            Parses and prettify data
        """

        self._parse_files()
        self._parse_form()

    def _parse_files(self):
        """
        :return: void
            Parse and prettify raw data files
        """

        self.input_file = self.files['fileInputs']
        self.error_file = self.files['fileErrors']

    def _parse_form(self):
        """
        :return: void
            Parse and prettify raw data form
        """

        self.meta_data = json.loads(self.form["meta-data"])
        labels = {
            "n": self.meta_data["PhysicalProprieties"][0],
            "NH": self.meta_data["PhysicalProprieties"][1],
            "g0": self.meta_data["PhysicalProprieties"][2],
            "U": self.meta_data["PhysicalProprieties"][3],
            "Z": self.meta_data["PhysicalProprieties"][4],
            "fesc": self.meta_data["PhysicalProprieties"][5],
            "AV": self.meta_data["PhysicalProprieties"][6],
        }
        self.meta_data["labels"] = [
            key for key, val in labels.items()
            if val
        ]  # just the requested labels

    def _create_upload_folder(self):
        """
        :return: void
            Create folder where can upload data
        """

        self.upload_folder = self.get_upload_folder()
        self.meta_data["OutputFolder"] = os.path.join(
            self.upload_folder, 'output'
        )
        self.meta_data["InputFile"] = os.path.join(
            self.upload_folder, self.input_file.filename
        )
        self.meta_data["ErrorFile"] = os.path.join(
            self.upload_folder, self.error_file.filename
        )
        self.meta_data["LabelsFile"] = os.path.join(
            self.upload_folder, "labels.dat"
        )
        os.makedirs(self.upload_folder)

    def is_good_request(self):
        """
        :return: bool
            True iff request is written in valid format
        """

        # captcha already checked before parsing

        if len(self.files) != 2:
            return False

        for _, file in self.files.items():
            if not can_upload(file.filename):
                return False

        if len(self.meta_data) != 8:
            return False

        if not validate_email(self.meta_data["Email"]):
            return False

        if len(self.meta_data["PhysicalProprieties"]) != 7:
            return False

        return True

    def write_data_to_file(self):
        """
        :return: void
            Saves meta data to file
        """

        output_file = os.path.join(self.upload_folder, "data.json")
        with open(output_file, "w") as out:
            json.dump(
                self.meta_data,
                out,
                indent=4, sort_keys=True  # pretty print
            )

    def write_labels_to_file(self):
        """
        :return: void
            Saves labels data to file
        """

        output_file = os.path.join(self.upload_folder, "labels.dat")
        labels = self.meta_data["LabelsArray"]
        with open(output_file, "w") as out:
            out.write("\n".join(labels))

    def upload(self):
        try:
            if self.is_good_request():
                self._create_upload_folder()
                for _, file in self.files.items():
                    if not upload_file(file, folder=self.upload_folder):
                        return False
                self.write_data_to_file()  # write meta-data
                self.write_labels_to_file()
                return True

            return False
        except:
            return False

    @staticmethod
    def get_upload_folder():
        """
        :return: str
            Path to folder than can be used to store data
        """

        return os.path.join(UPLOAD_FOLDER, str(uuid.uuid4()))

    def __str__(self):
        out = "*** files: " + str(self.files) + "\n"
        out += "*** meta data: " + str(self.meta_data) + "\n"
        out += "*** folder: " + str(self.upload_folder) + "\n"
        return out
