import SocketServer
import SimpleHTTPServer

from sys import stdout
 
PORT = 5000
class ServerHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
 
    def createResponse(self, command):
        """ renvoi une confirmation """
        
       
    def do_POST(self):
        """ process command depuis POST et output vers la sortie stantard """
 

    def do_GET(self):
        """  (process command) depuis GET et output vers la sortie stantard """
