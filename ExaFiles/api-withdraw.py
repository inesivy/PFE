#!/usr/bin/env python

import sys
import time

messages = [
	'withdraw route 192.168.44.2/24 next-hop 192.168.33.1',
]

while messages:
	message = messages.pop(0)
	sys.stdout.write(message + '\n')
	sys.stdout.flush()
	time.sleep(0.1)

try:
	now = time.time()
	while True and time.time() < now + 5:
		line = sys.stdin.readline().strip()
		if not line or 'shutdown' in line:
			break
		time.sleep(1)
except IOError:
pass
