/*
  Single Linked List Data structure.

  This is the first layer of abstraction into modern arrays.
  They have the methods:
    * append(item): null -- Runtime Big O(i)
    * get(index): number -- Runtime Big O(n)
    * remove(item): number -- Runtime Big O(n)
    * removeAt(index): number -- Runtime Big O(n)
    * prepend(item): undefined -> adds at the start -- Runtime Big O(i)
    * Property -> length: number


  The most basic information Node structure could be:
  node<t>
    val: t
    next?: Node<t>


  Doubly linked list, that allow us to walk through them in the same way as 
  singly linked lists, also have a pointer to the previous node

    prev?: Node<T>

  allowing us to walk it in reverse as well
*/

declare type ListNode<T> = {
    value: T;
    next?: ListNode<T>;
    prev?: ListNode<T>;
};

declare interface List<T> {
    get length(): number;
    removeAt(index: number): T | undefined;
    remove(item: T): T | undefined;
    get(index: number): T | undefined;
    prepend(item: T): void;
    append(item: T): void;
    insertAt(item: T, idx: number): void;
}

export default class SinglyLinkedList<T> implements List<T> {
    private head: ListNode<T> | undefined;
    length: number;

    constructor() {
        this.length = 0;
    }

    createNode<T>(
        item: T,
        next: ListNode<T> | undefined = undefined,
    ): ListNode<T> {
        this.length++;
        return { value: item, next };
    }

    append(item: T) {
        if (!this.head) {
            this.head = this.createNode(item);
            return;
        }
        let temp = this.head;
        while (temp.next) temp = temp.next;
        temp.next = this.createNode(item);
    }

    prepend(item: T) {
        if (!this.head) {
            this.head = this.createNode(item);
            return;
        }
        const newNode = this.createNode(item);
        newNode.next = this.head;
        this.head = newNode;
    }

    get(index: number): T | undefined {
        // Base case, we have no head, hence undefined
        if (!this.head) return undefined;
        let temp = this.head;
        for (let i = 0; i != index; i++) {
            if (!temp?.next) return undefined;
            temp = temp.next;
        }
        return temp.value;
    }
    remove(item: T): T | undefined {
        // Base case, we have no head, hence undefined
        if (!this.head) return undefined;

        // If item is head, then we just go for the next if it exists, else we get undefined
        if (this.head.value === item) {
            this.head = this.head.next;
            this.length--;
            return item;
        }
        // Item is somewhere in the list, so we traverse it, either until we finish the list, or until we find the value
        let temp = this.head;
        while (temp?.next && temp?.next.value !== item) temp = temp.next;

        //If there is a next item then we found the value, since those were the two clauses for traversing
        if (temp?.next) {
            temp.next = temp.next.next || undefined;
            this.length--;
            return item;
        }

        //We didn't find the value, thus undefined
        return undefined;
    }
    removeAt(index: number): T | undefined {
        // Base case, we have no head, hence undefined
        if (!this.head) return undefined;
        let value = undefined;

        // If we get index 0, then we substitute the head
        if (index === 0) {
            value = this.head.value;
            this.head = this.head.next || undefined;
            this.length--;
            return value;
        }
        let temp = this.head;
        for (let i = 0; i != index - 1; i++) {
            if (!temp?.next) return undefined;
            temp = temp.next;
        }
        value = temp.next?.value;
        temp.next = temp.next?.next || undefined;
        this.length--;
        return value;
    }

    insertAt(item: T, index: number): void {
        if (index === 0 || !this.head) {
            this.head = this.createNode(item);
            this.length++;
            return;
        }
        let temp = this.head;
        for (let i = 0; i != index; i++) {
            if (!temp?.next) {
                temp.next = this.createNode(item);
                this.length++;
                return;
            }
            temp = temp.next;
        }
        temp.next = this.createNode(item);
        this.length++;
        return;
    }
}
