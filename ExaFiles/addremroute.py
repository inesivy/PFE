from sys import stdout
from time import sleep


messages = [
 	#ajouter des routes
    'announce route 192.168.10.2/24 next-hop self',
    'announce route 192.168.10.4/24 next-hop self',
]	# en supprimer 
    'withdraw route 192.168.10.2/24',]
sleep(2)
 
for message in messages:
    stdout.write(message + '\n')
    stdout.flush()
    sleep(1)
 
#boucle infinie pour laisser ExaBGP tourner ...
while True:
    sleep(1)
