from .iCreateReserveDTO import validate_create_reservation_dto
from queue.queue import Queue
import json

def create_reserve(self):
    # Verifica se há conteúdo na requisição
    content_length = int(self.headers['Content-Length'])
    if content_length == 0: 
        self.send_response(411)
        self.end_headers()
        return
    
    # Lê e decodifica os dados JSON
    post_data = self.rfile.read(content_length)
    try:
        data = json.loads(post_data.decode('utf-8'))
    except json.JSONDecodeError:
        self.send_response(400)
        self.end_headers()
        self.wfile.write(b'Invalid JSON')
        return
    
    # Valida os dados usando o DTO
    try:
        dto = validate_create_reservation_dto(data)
    except (TypeError, ValueError) as err:
        self.send_response(422)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        error_response = {'error': str(err)}
        body = json.dumps(error_response).encode('utf-8')
        self.wfile.write(body)
        self.wfile.flush()
        return

    print("Validated Reservation DTO:", dto)
    
    # Armazena na Queue
    Queue = Queue()
    Queue.enqueue(dto)
    
    # Resposta de sucesso
    self.send_response(201)
    self.send_header('Content-Type', 'application/json')
    self.send_header('Access-Control-Allow-Origin', '*')
    self.end_headers()

    response = {'message': 'Reservation Created', 'received': dto}
    self.wfile.write(json.dumps(response).encode('utf-8'))