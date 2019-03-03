# !/usr/bin/bash
# -*- coding: utf-8 -*-

echo "I am in" $(pwd)

source /opt/game/gamecourse/venv/bin/activate
echo "virtualenv is ON"

PYTHONPATH=/opt/game/gamecourse/ python /opt/game/gamecourse/gamecourse/server.py
