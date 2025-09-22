class ListNode {
    /**
     * @type {any}
     */
    value;
    /**
     * @type {ListNode}
     */
    next;
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

export class LinkedList {
    /**
     * @type {ListNode}
     */
    head;
    constructor(value) {
        this.head = new ListNode(value);
    }

    add(value) {
        const newNode = new ListNode(value);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }

    remove(value) {
        if (!this.head) return;
        if (this.head.value === value) {
            this.head = this.head.next;
            return;
        }
        let current = this.head;
        while (current.next && current.next.value !== value) {
            current = current.next;
        }
        if (current.next) {
            current.next = current.next.next;
        }
    }
}