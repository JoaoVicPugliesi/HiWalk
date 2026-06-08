import json
import os
from .linkedList import LinkedList

STORAGE_DIR = os.path.join(os.path.dirname(__file__), 'storage')
ID_COUNTER_FILE = os.path.join(STORAGE_DIR, 'last_id.txt')

class HashTable:
    def __init__(self):
        self.buckets = {}
        self._initialize_buckets()

    def _initialize_buckets(self):
        for i in range(65, 91): 
            letter = chr(i)
            file_path = os.path.join(STORAGE_DIR, f'{letter}.json')

            if os.path.exists(file_path):
                with open(file_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                self.buckets[letter] = LinkedList.from_list(data)
            else:
                self.buckets[letter] = LinkedList()

    def _get_next_id(self):
        if not os.path.exists(ID_COUNTER_FILE):
            with open(ID_COUNTER_FILE, 'w') as f:
                f.write('0')

        with open(ID_COUNTER_FILE, 'r') as f:
            current = int(f.read())

        new_id = current + 1

        with open(ID_COUNTER_FILE, 'w') as f:
            f.write(str(new_id))

        return new_id
    
    def _save_bucket(self, letter):
        file_path = os.path.join(STORAGE_DIR, f'{letter}.json')
        data = self.buckets[letter].to_list()
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

    def insert(self, place):
        name = place.get('name', '')
        if not name:
            raise ValueError('Place must have a name')

        letter = name[0].upper()
        if letter < 'A' or letter > 'Z':
            letter = 'Z' 
            
        bucket = self.buckets[letter]
        current = bucket.head
        while current:
            if current.data['name'].lower() == name.lower():
                raise ValueError(f"Place '{name}' already exists")
            current = current.next
            
        place_with_id = { "id": self._get_next_id(), **place  }
        self.buckets[letter].append(place_with_id)
        self._save_bucket(letter)
