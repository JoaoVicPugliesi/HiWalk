from http.server import HTTPServer, SimpleHTTPRequestHandler;
from useCases.createPlace.iCreatePlace import create_place;
from useCases.getPlaces.iGetPlaces import get_places;
from useCases.findPlace.iFindPlace import find_place;
from useCases.enqueueReservation.iEnqueueReservation import enqueue_reservation;
from useCases.dequeueReservation.iDequeueReservation import dequeue_reservation;
from useCases.getReservations.iGetReservations import get_reservations;

import socketserver

HOST = '127.0.0.1';
PORT = 7000;

class Server(HTTPServer):
    def do_OPTIONS(self):
        self.send_response(200);
        self.send_header('Access-Control-Allow-Origin', '*');
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
        self.send_header('Access-Control-Allow-Headers', 'Content-Type');
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        self.end_headers();

    def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'
            return super().do_GET()
        if self.path == '/places':
            get_places(self);
            return
        if self.path.startswith('/places/place/'):
            id = self.path.split('/')[-1]
            find_place(self, id)
            return
        if self.path == '/reservations':
            get_reservations(self);
            return;
        self.send_response(404);
        self.end_headers();
        self.wfile.write(b'Endpoint not Found');
    def do_POST(self):
        if self.path == '/place/create':
            create_place(self);
            return
        if self.path == '/reservation/enqueue':
            enqueue_reservation(self);
            return
        self.send_response(404);
        self.end_headers();
        self.wfile.write(b'Endpoint not Found');
    def do_DELETE(self):
        if self.path == '/reservation/dequeue':
            dequeue_reservation(self);
            return
        self.send_response(404);
        self.end_headers();
        self.wfile.write(b'Endpoint not Found');


Handler = SimpleHTTPRequestHandler

socketserver.TCPServer.allow_reuse_address = True

with socketserver.TCPServer((HOST, PORT), Handler) as httpd:
    print(f'Server is running on http://{HOST}:{PORT}');

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        httpd.server_close();
        print('Server Stopped');

    httpd.server_close();
    print('Server Stopped');
