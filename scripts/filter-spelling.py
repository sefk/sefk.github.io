#!/usr/bin/env python3
"""Filter spelling scan output to remove false positives."""

import sys
import re

SKIP = {
    'img', 'px', 'src', 'alt', 'div', 'span', 'css', 'url', 'class',
    'postimage', 'float', 'right', 'border', 'solid', 'width', 'height',
    'pushback', 'one-off', 'premortem', 'as-planned', 'as-built',
    'well-written', 'user-facing', 'comms', 'seo', 'qa', 'sdk', 'api',
    'apis', 'vm', 'vms', 'cli', 'js', 'ui', 'css', 'html', 'cdn',
    'ssl', 'tls', 'dns', 'sql', 'json', 'yaml', 'http', 'https',
    'tcp', 'udp', 'ip', 's3', 'aws', 'ci', 'cd',
}

for line in sys.stdin:
    m = re.match(r"\s+>> '(\w+)'\s*->", line)
    if not m:
        continue
    word = m.group(1).lower()
    if len(word) <= 3 and word.isupper():
        continue
    if word in SKIP:
        continue
    print(line.rstrip())
