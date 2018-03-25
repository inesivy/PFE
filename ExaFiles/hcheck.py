
import socket
from sys import stdout
from time import sleep
 
 
def is_alive(address, port):
 
    # cree la socket pour se connecter
    s = socket.socket()
    
    # on passe un couple de @ + port pour se connecter 
    try:
        s.connect((address, port))
        return True
    except socket.error:
        return False
    finally:
        s.close()
 
while True:
    if is_alive('google.com', 80):
        stdout.write('announce route 192.168.3.3/24 next-hop self' + '\n')
        stdout.flush()
    else:
        stdout.write('withdraw route 100.168.3.3/24 next-hop self' + '\n')
        stdout.flush()
    sleep(8)
    
    
