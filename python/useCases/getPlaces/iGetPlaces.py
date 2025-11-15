from hashTable.hashTable import HashTable;
import json;

def get_places(self):
    table = HashTable();
    all_places = [];
    for letter, linked_list in table.buckets.items():
        current = linked_list.head
        while current:
            all_places.append(current.data)
            current = current.next

    self.send_response(200)
    self.send_header('Content-Type', 'application/json')
    self.send_header('Access-Control-Allow-Origin', '*')
    self.end_headers()

    self.wfile.write(json.dumps(all_places).encode('utf-8'))
    return