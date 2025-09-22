import { LinkedList } from "./linkedlist.js";

export class BinaryNode {
    /**
     * @type {number}
     */
    key;
    /**
     * @type {LinkedList}
     */
    value;
    /**
     * @type {BinaryNode}
     */
    left;
    /**
     * @type {BinaryNode}
     */
    right;
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.left = undefined;
        this.right = undefined;
    }
}