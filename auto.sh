#!/bin/bash

find files posts stories | entr -r -s 'nikola build && nikola serve'
