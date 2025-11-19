import json
import os
from typing import Optional, Any

STORAGE_DIR = os.path.join(os.path.dirname(__file__), 'storage')
RESERVATION_QUEUE_FILE = os.path.join(STORAGE_DIR, 'reservations.json')
ID_COUNTER_FILE = os.path.join(STORAGE_DIR, 'reservation_last_id.txt')

class Node:
    def __init__(self, data: Any):
        self.data = data
        self.next: Optional['Node'] = None

class Queue:
    def __init__(self):
        self.front: Optional[Node] = None
        self.rear: Optional[Node] = None
        self.size = 0
        self._load_from_storage()

    def _get_next_id(self) -> int:
        """Gera o próximo ID para a reserva"""
        if not os.path.exists(ID_COUNTER_FILE):
            with open(ID_COUNTER_FILE, 'w') as f:
                f.write('0')

        with open(ID_COUNTER_FILE, 'r') as f:
            current = int(f.read())

        new_id = current + 1

        with open(ID_COUNTER_FILE, 'w') as f:
            f.write(str(new_id))

        return new_id

    def _load_from_storage(self):
        """Carrega as reservas do arquivo JSON"""
        if not os.path.exists(RESERVATION_QUEUE_FILE):
            return

        try:
            with open(RESERVATION_QUEUE_FILE, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            # Reconstroi a fila a partir dos dados
            for item in data:
                self.enqueue(item, save=False, has_id=True)  # Não salva durante o carregamento
                
        except (json.JSONDecodeError, FileNotFoundError):
            # Se o arquivo estiver corrompido, começa com fila vazia
            pass

    def _save_to_storage(self):
        """Salva toda a fila no arquivo JSON"""
        if not os.path.exists(STORAGE_DIR):
            os.makedirs(STORAGE_DIR)

        data = self.to_list()
        with open(RESERVATION_QUEUE_FILE, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

    def enqueue(self, reservation: dict, save: bool = True, has_id: bool = False) -> None:
        # Generate ID only if the reservation does not already have one
        if not has_id:
            reservation = { "id": self._get_next_id(), **reservation }

        new_node = Node(reservation)

        if self.rear is None:
            self.front = self.rear = new_node
        else:
            self.rear.next = new_node
            self.rear = new_node

        self.size += 1

        if save:
            self._save_to_storage()

    def _shift_ids_down(self):
        """Decrementa todos os IDs em 1 e ajusta o contador"""
        current = self.front
        while current:
            current.data['id'] -= 1
            current = current.next

        # Atualizar arquivo reservation_last_id.txt
        if os.path.exists(ID_COUNTER_FILE):
            with open(ID_COUNTER_FILE, 'r') as f:
                current_id = int(f.read())

            # Evitar número negativo
            new_id = max(current_id - 1, 0)

            with open(ID_COUNTER_FILE, 'w') as f:
                f.write(str(new_id))

    def dequeue(self) -> Optional[dict]:
        """Remove e retorna a reserva do início da fila e atualiza os IDs restantes"""
        if self.is_empty():
            return None

        # Remove o primeiro item
        removed = self.front
        self.front = self.front.next

        if self.front is None:
            self.rear = None

        self.size -= 1

        # Agora precisamos reajustar os IDs
        self._shift_ids_down()

        # Salvar fila atualizada
        self._save_to_storage()

        return removed.data

    def peek(self) -> Optional[dict]:
        """Retorna a reserva do início da fila sem remover"""
        if self.is_empty():
            return None
        return self.front.data

    def is_empty(self) -> bool:
        """Verifica se a fila está vazia"""
        return self.front is None

    def get_size(self) -> int:
        """Retorna o tamanho da fila"""
        return self.size

    def to_list(self) -> list:
        """Converte a fila para lista (para serialização)"""
        result = []
        current = self.front
        while current:
            result.append(current.data)
            current = current.next
        return result

    def display(self) -> list:
        """Retorna todas as reservas na fila como lista JSON-serializável"""
        result = []
        current = self.front
        while current:
            result.append(current.data)
            current = current.next
        return result
        
'''
import json
import os
from hashTable.linkedList import Node



QUEUE_DIR = os.path.join(os.path.dirname(__file__), 'queue_storage')

class Queue:
    def __init__(self):
        self.head = None
        self.tail = None
        self.size = 0
    
    def is_empty(self):
        return self.size == 0
    
    #Método de enfileirar, para receber as reservas
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
    
    #Método para desenfileirar, remover apenas um item da fila
    def dequeue(self):
        if self.is_empty():
            return None
        if self.size == 1:
            removed = self.head
            self.head = None
            self.tail = None
            self.size -=1
            return removed 
        
        removed = self.head
        self.head = self.head.next
        self.size -=1
        return removed

    #Método para limpar fila, excluindo todos os dados
    def clearQueue (self):
        
        if self.is_empty():
            return
        
        self.head = None
        self.tail = None
        self.size = 0
        
'''   

