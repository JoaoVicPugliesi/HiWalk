from iQueue.queue import Queue;
import json;

def dequeue_reservation(self):
    queue = Queue();
    removed = queue.dequeue();
    if removed is None:
        self.send_response(404)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

        response = { 'error': 'No reservations to dequeue' }
        self.wfile.write(json.dumps(response).encode('utf-8'))
        return

    self.send_response(204)
    self.send_header('Access-Control-Allow-Origin', '*')
    self.end_headers()
    return
    