from hashTable.hashTable import HashTable
import json

def find_place(self, id):
    table = HashTable()
    found = None

    for letter, linked_list in table.buckets.items():
        current = linked_list.head
        while current:
            if str(current.data.get("id")) == id:
                found = current.data
                break
            current = current.next
        if found:
            break

    if not found:
        self.send_response(404)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(b'{"error":"Place not found"}')
        return

    self.send_response(200)
    self.send_header('Access-Control-Allow-Origin', '*')
    self.send_header('Content-Type', 'application/json')
    self.end_headers()
    self.wfile.write(json.dumps(found).encode('utf-8'))
    return  
