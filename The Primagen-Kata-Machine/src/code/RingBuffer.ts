/*
 * Array Like storage but head, and tail are not in 0 and N (correspondingly), they are somewhere in the middle.
 * So for example deleting in the head is moving it to head+1 and nulling the previous index
 *
 * [ n <---   {               }  ---> n  ]
 * 0          h               t          N
 *
 * Pushing, popping, shifting and unshifting are BigO(1)
 *
 * It's called an array buffer because if tail goes over the edge we can do tail % len and store the tail in the start
 * of the memory slot we reserved
 * [        } <-- n -->  {               ]
 * 0        t            h               N
 *
 * The issue comes with resizing, since we need to maintain order
 */

declare interface BufferType<T> {
    push(item: T): void;
    pop(): T | undefined;
    get(index: number): T | undefined;
}

export default class RingBuffer<T> implements BufferType<T> {
    private head: number;
    private tail: number;
    private capacity: number;
    private list: T[];
    private length: number;

    constructor(capacity = 1) {
        this.capacity = capacity;
        this.list = [];
        this.head = this.tail = Math.floor(this.list.length / 2);
        this.length = 0;
    }

    private getModulusIndex(index: number) {
        return index < 0
            ? (index * -1) % this.list.length
            : index % this.list.length;
    }

    resize(): void {
        this.capacity++;
        const newList: T[] = Array(this.capacity).fill(undefined);

        for (let i = 0; i < this.list.length; i++)
            newList[i] = this.get(i) as any as T;
        /* The issue here is maintaining the order of the items
          To do this we:
          Fill the new array, where Head = 0 and Tail = Lenght
          and we traverse the old array from list: list[head] to list[tail]
          cases
        */

        this.list = [...newList];
        this.head = 0;
        this.tail = this.list.length - 1;
    }
    push(item: T): void {
        /*
         * We push by the TAIL
         * Cases:
         * 1. First item pushed
         * 3. Item pushed but no more room, so we got to resize
         * 2. Item pushed but still room in t
         */
        if (this.length === 0) {
            this.list[this.tail] = item;
            this.length++;
            return;
        }

        if (this.length === this.capacity) this.resize();
        else this.tail = this.getModulusIndex(this.tail + 1);
        this.list[this.tail] = item;
        this.length++;
    }
    pop(): T | undefined {
        /*
         * We pop by the HEAD
         * and we only move it when it's different from the tail (meaning there is something to delete)
         */
        const value = this.list[this.head];
        this.list[this.head] = undefined as any as T;
        this.length = this.length > 0 ? this.length - 1 : this.length;
        if (this.head !== this.tail) {
            this.head = this.getModulusIndex(this.head + 1);
        }
        return value;
    }
    get(index: number): T | undefined {
        return index > this.list.length - 1
            ? undefined
            : this.list[this.getModulusIndex(this.head + index)];
    }

    visualize(): void {
        console.log();
        for (let item of this.list) process.stdout.write(`| ${item}`);
        console.log();
        for (let i = 0; i < this.list.length; i++)
            process.stdout.write(
                "|" + " ".repeat(`${this.list[i]}`.length) + i,
            );

        console.log();
        for (let i = 0; i < this.list.length; i++)
            process.stdout.write(
                " " +
                    " ".repeat(`${this.list[i]}`.length) +
                    `${
                        i === this.head && i === this.tail
                            ? "HT"
                            : i === this.head
                            ? "H"
                            : i === this.tail
                            ? "T"
                            : " "
                    }`,
            );
        console.log();
    }
}
