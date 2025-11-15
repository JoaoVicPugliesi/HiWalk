from .hashTable import HashTable

hash_table = HashTable()

for letter, linked_list in hash_table.buckets.items():
    places = linked_list.to_list()
    if places: 
        print(f'\nBucket {letter}:')
        for place in places:
            print('  -', place)

q_bucket = hash_table.buckets['A'];
first_node = q_bucket.head;
if first_node:
    print('First node data:', first_node.data)
    if first_node.next:
        print('Next node data:', first_node.next.data)
    else:
        print('No next node')
else:
    print('Bucket Q is empty')