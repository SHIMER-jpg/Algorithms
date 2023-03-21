/**
 *
 * Specific implementation of a singly linked list
 * Where insertions happen at one end
 * and deletions happen at the other
 * We will implement a FIFO = FIRST In is the first Out
 * All methods in this queue are Big O(i) because they are constant
 */

import SinglyLinkedList from "./SinglyLinkedList";

type Node<T> = {
    value: T;
    next?: Node<T>;
};

interface QueueType<T> {
    length: number;
    enqueue(item: T): void;
    deque(): T | undefined;
    peek(): T | undefined;
}

export default class Queue<T> implements QueueType<T> {
    private head?: Node<T>;
    private tail?: Node<T>;
    public length: number;

    constructor() {
        this.head = this.tail = undefined;
        this.length = 0;
    }

    enqueue(item: T): void {
        /*
        Either we initialize the queue
        Or we have at least one element
      */
        const newNode = { value: item } as Node<T>;
        this.length++;
        if (!this.head || !this.tail) {
            this.head = this.tail = newNode;
            return;
        }
        this.tail.next = newNode;
        this.tail = this.tail?.next;
    }
    deque(): T | undefined {
        /*
        Either we have nothing in the queue
      */
        if (!this.head) return undefined;
        this.length--;
        const value = this.head.value;
        this.head = this.head.next || undefined;
        return value;
    }
    peek(): T | undefined {
        return this.head?.value;
    }
}
