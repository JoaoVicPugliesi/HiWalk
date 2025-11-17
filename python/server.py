from http.server import  HTTPServer, BaseHTTPRequestHandler;
from useCases.createPlace.iCreatePlace import create_place;
from useCases.getPlaces.iGetPlaces import get_places;
from useCases.findPlace.iFindPlace import find_place;
from useCases.createReserve.iCreateReserve import create_reserve;
HOST = '127.0.0.1';
PORT = 8000;

class Server(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200);
        self.send_header('Access-Control-Allow-Origin', '*');
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        self.send_header('Access-Control-Allow-Headers', 'Content-Type');
        self.end_headers();
        
    def do_GET(self):
        if(self.path == '/places'):
            get_places(self);
            return
        if self.path.startswith('/places/place/'):
            id = self.path.split('/')[-1]
            find_place(self, id)
            return
        self.send_response(404);
        self.end_headers();
        self.wfile.write(b'Endpoint not Found');
    def do_POST(self):
        if(self.path == '/place/create'):
            create_place(self);
            return
        if(self.path == '/place/reserve'):
            create_reserve(self);
            return
        self.send_response(404);
        self.end_headers();
        self.wfile.write(b'Endpoint not Found');
        
server = HTTPServer((HOST, PORT), Server);
print('🚀 server is running on http://127.0.0.1:8000');

try:
    server.serve_forever()
except KeyboardInterrupt:
    pass

server.server_close();
print('Server Stopped');