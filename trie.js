class TrieNode {
    constructor() {
        this.children = {}; // Each letter points to another TrieNode
        this.isEndOfWord = false; // Marks the end of a word
        this.data = null; // Stores the full person object
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode(); // Root node, starting point
    }

    insert(person) {
        let node = this.root; // Start from the root node 
        for (const char of person.name.toLowerCase()) { // loop through each letter
            if (!node.children[char]) {
                node.children[char] = new TrieNode(); // Create a new node if missing
            }
            node = node.children[char]; // Move to the next node
        }
        
        node.isEndOfWord = true; // Mark the last letter as the end of a word
        node.data = person; // Store the full person object
    }

    searchPrefix(prefix) {
        let node = this.root;
        for (const char of prefix.toLowerCase()) {
            if (!node.children[char]) {
                return []; // No match found
            }
            node = node.children[char];
        }
        return this._collectWords(node);
    }

    _collectWords(node, results = []) {
        if (node.isEndOfWord) {
            results.push(node.data);
        }
        for (const char in node.children) {
            this._collectWords(node.children[char], results);
        }
        return results;
    }
}

export default Trie;
