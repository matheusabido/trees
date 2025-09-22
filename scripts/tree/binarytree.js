import { BinaryNode } from "./nodes.js";
import { LinkedList } from "./linkedlist.js";

export class BinaryTree {
    /**
     * @type {BinaryNode}
     */
    root;
    constructor() {
        this.root = undefined;
    }

    /**
     * @param {number} key
     * @param {any} value
     * @returns {BinaryNode} - parent
     */
    add(key, value) {
        if (!this.root) {
            this.root = new BinaryNode(key, new LinkedList(value));
            return;
        }
        
        let current = this.root
        while (current) {
            if (current.key === key) {
                current.value.add(value);
                return current;
            }

            if (key < current.key) {
                if (!current.left) {
                    current.left = new BinaryNode(key, new LinkedList(value));
                    return current;
                }

                current = current.left;
            } else {
                if (!current.right) {
                    current.right = new BinaryNode(key, new LinkedList(value));
                    return current;
                }

                current = current.right;
            }
        }
    }

    /**
     * @param {number} key 
     * @returns {boolean} - either has been found or not
     */
    remove(key) {
        let current = this.root;
        while (current) {
            if (key < current.key) {
                if (current.left.key === key) {
                    current.left = this.removeNode(current.left)
                    return true;
                }
                current = current.left;
            } else {
                if (current.right.key === key) {
                    current.right = this.removeNode(current.right)
                    return true;
                }
                current = current.right;
            }
        }
        return false;
    }

    /**
     * @param {BinaryNode} node
     * @returns {BinaryNode} - replaced node
     */
    removeNode(node) {
        let current = node.right
        while (current) {
            if (current.left && !current.left.left) {
                const old = current.left;
                current.left = current.left.right;
                return old;
            }
            current = current.left;
        }
    }
}