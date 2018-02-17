# !/usr/bin/python3
# coding: utf-8

# Copyright YYYY AUTHORS
#
# YOUR COPYRIGHT HERE (IF YOU WANT IT)


""" Tables and logs """

import threading
import time


class ThreadSafeDict(dict):
    """ Dict safe also in threads """

    def __init__(self, *p_arg, **n_arg):
        dict.__init__(self, *p_arg, **n_arg)
        self._lock = threading.Lock()

    def __enter__(self):
        self._lock.acquire()
        return self

    def __exit__(self, typ, value, traceback):
        self._lock.release()


class User:
    """ GAME client """

    def __init__(self, email, ip, timing=time.time()):
        self.email = str(email).strip() if email else None
        self.ip = str(ip).strip() if ip else None
        self.timing = int(timing)

    def __eq__(self, other):
        if isinstance(other, User):
            return self.email == other.email or self.ip == other.ip

    def __hash__(self):
        pass  # todo


class ControlTable:
    """ Controls users by IPs, emails ... """

    def __init__(self, get_max_request_in_hour, post_max_request_per_hour):
        self.table = ThreadSafeDict()
        self.get_max = int(get_max_request_in_hour)
        self.post_max = int(post_max_request_per_hour)

    def handle_request(self, req):
        self.log(req)
        return True

    def log(self, req):
        email, ip = self.get_raw_email(req), self.get_raw_ip(req)
        if not (email is None and ip is None):  # can log something
            user = User(email, ip)
            self.log_to_table(user, user)

    def log_to_table(self, key, value):
        if key not in self.table:
            self.table[key] = [value]
        else:
            self.table[key].append(value)

    @staticmethod
    def get_raw_ip(req):
        try:
            raw = req.remote_addr
            return str(raw).strip()
        except:
            return None

    @staticmethod
    def get_raw_email(req):
        try:
            raw = req.form["meta-data"]["Email"]
            return str(raw).strip()
        except:
            return None
