from iQueue.queue import Queue;
import json;

def get_reservations(self):
    queue = Queue();
    reservations = queue.display();
    if len(reservations) == 0:
        self.send_response(404)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps({'error': 'No reservations found'}).encode('utf-8'))
        return  

    self.send_response(200)
    self.send_header('Content-Type', 'application/json')
    self.send_header('Access-Control-Allow-Origin', '*')
    self.end_headers()

    self.wfile.write(json.dumps(reservations).encode('utf-8'))