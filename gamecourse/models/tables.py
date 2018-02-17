# !/usr/bin/python3
# coding: utf-8

# Copyright YYYY AUTHORS
#
# YOUR COPYRIGHT HERE (IF YOU WANT IT)


""" Tables and logs """

import threading
import time


class ThreadSafeDict(dict):
    def __init__(self, *p_arg, **n_arg):
        dict.__init__(self, *p_arg, **n_arg)
        self._lock = threading.Lock()

    def __enter__(self):
        self._lock.acquire()
        return self

    def __exit__(self, typ, value, traceback):
        self._lock.release()


class User:
    def __init__(self, email, ip, timing=time.time()):
        self.email = str(email)
        self.ip = str(ip)
        self.timing = int(timing)


class ControlTable:
    def __init__(self, max_request_in_hour):
        self.table = ThreadSafeDict()
        self.max_request = int(max_request_in_hour)

    def handle_request(self, req):
        pass

    def log_request(self, user):
        pass
