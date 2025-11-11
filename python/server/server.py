from http.server import  HTTPServer, BaseHTTPRequestHandler;
from useCases.createPlace.iCreatePlace import create_place;
import json;

HOST = '127.0.0.1';
PORT = 8000;

class Server(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200);
        self.send_header('Access-Control-Allow-Origin', '*');
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        self.send_header('Access-Control-Allow-Headers', 'Content-Type');
        self.end_headers();
        
    def do_POST(self):
        if(self.path == '/create_place'):
            create_place(self, json);
            return
        self.send_response(404, 'Endpoint not Found');
        
server = HTTPServer((HOST, PORT), Server);
print('🚀 server is running on http://127.0.0.1:8000');

try:
    server.serve_forever()
except KeyboardInterrupt:
    pass

server.server_close();
print('Server Stopped');