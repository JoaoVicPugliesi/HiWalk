import json
import os
from .linkedList import LinkedList

STORAGE_DIR = os.path.join(os.path.dirname(__file__), 'storage')

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

        self.buckets[letter].append(place)
        self._save_bucket(letter)
