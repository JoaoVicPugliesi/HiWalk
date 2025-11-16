from hashTable.linkedList import Node

class Queue:
    def __init__(self):
        self.head = None
        self.tail = None
        self.size = 0
    
    def is_empty(self):
        return self.size == 0
    
    def enqueue(self, data):
        new_node = Node(self, data)

        if self.is_empty():
            self.head = new_node
            self.tail = new_node
            self.size += 1
            return
        
        self.tail.next = new_node
        self.tail = new_node
        self.size += 1
    
    

