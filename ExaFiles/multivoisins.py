#!/usr/bin/env python

import sys
import time
#fonctionne qu'avec la topologie à deux routeurs 
messages = [
	'neighbor 192.168.44.2 announce route 192.168.0.0/24 next-hop 192.168.33.1',
	'neighbor 192.168.44.1 router-id 192.168.44.1, neighbor 192.168.44.2 announce route 192.168.55.2/25 next-hop 192.168.55.1',
	'withdraw route 192.168.0.0/24 next-hop 192.168.33.1,
]

while messages:
	message = messages.pop(0)
	sys.stdout.write(message + '\n')
	sys.stdout.flush()
	time.sleep(0.3)

try:
	now = time.time()
	while True and time.time() < now + 5:
		line = sys.stdin.readline().strip()
		if not line or 'shutdown' in line:
			break
		time.sleep(1)
except IOError:
pass
