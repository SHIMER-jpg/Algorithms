type Node<T> = {
    value: T;
    prev?: Node<T>;
};

interface StackInterface<T> {
    push(item: T): void;
    pop(): T | undefined;
    peek(): T | undefined;
    get length(): number;
}

export default class Stack<T> implements StackInterface<T> {
    public length: number;
    private head?: Node<T>;
    constructor() {
        this.length = 0;
        this.head = undefined;
    }
    push(item: T): void {
        const newNode = { value: item } as Node<T>;
        this.length++;
        if (!this.head) {
            this.head = newNode;
            return;
        }

        newNode.prev = this.head;
        this.head = newNode;
        return;
    }
    pop(): T | undefined {
        if (!this.head) return undefined;
        this.length--;
        const value = this.head.value;
        this.head = this.head.prev;
        return value;
    }
    peek(): T | undefined {
        return this.head?.value;
    }
}
