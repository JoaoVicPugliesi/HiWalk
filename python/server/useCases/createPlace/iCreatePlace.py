from .iCreatePlaceDTO import validate_create_place_dto

def create_place(self, json):
    content_length = int(self.headers['Content-Length']);
    if(content_length == 0): 
        self.send_response(411);
        self.end_headers();
        return;
    
    post_data = self.rfile.read(content_length)
    try:
        data = json.loads(post_data.decode('utf-8'))
    except json.JSONDecodeError:
        self.send_response(400)
        self.end_headers()
        self.wfile.write(b'Invalid JSON')
        return
    
    try:
        dto = validate_create_place_dto(data)
    except (TypeError, ValueError) as err:
        self.send_response(422)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        error_response = {'error': str(err)}
        body = json.dumps(error_response).encode('utf-8');
        self.wfile.write(body);
        self.wfile.flush();
        return

    print("Validated DTO:", dto)
    
    

    self.send_response(201)
    self.send_header('Content-Type', 'application/json')
    self.send_header('Access-Control-Allow-Origin', '*')
    self.end_headers()

    response = {'message': 'Place Created', 'received': dto}
    self.wfile.write(json.dumps(response).encode('utf-8'))