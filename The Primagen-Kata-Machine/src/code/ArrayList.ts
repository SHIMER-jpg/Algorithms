/*
 * Array lists use an array as fundamental data type.
 * Since lists have a fixed length in memory, we need to store a capacity.
 * Once that capacity is reached, we need to resize the array to handle a new addition into the list
 * Usually, we don't reduce the capacity of the data-structure.
 *
 * Stack-Like operations are usually easier, since the push and pop operations are BigO(1)
 * and eventually BigO(n) for push if we are outside the capacity
 *
 * Queue-Like operations are less efficient, since any method implies traversing the array will give
 * BigO(n), for enqueue and dequeue
 *
 * With all this in mind.
 * Stacks are better implemented with Array List (better performance)
 * Queue's are better implemented with Node like lists
 */

declare interface List<T> {
    get length(): number;
    removeAt(index: number): T | undefined;
    remove(item: T): T | undefined;
    get(index: number): T | undefined;
    prepend(item: T): void;
    append(item: T): void;
    insertAt(item: T, idx: number): void;
}

export default class ArrayList<T> implements List<T> {
    public length: number;
    private capacity: number;
    private list: T[];
    removeAt(index: number): T | undefined {}
    remove(item: T): T | undefined {}
    get(index: number): T | undefined {}
    prepend(item: T): void {}
    append(item: T): void {}
    insertAt(item: T, idx: number): void {}
}
