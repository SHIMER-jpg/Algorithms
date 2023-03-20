/*
 * Within an ordered algorithm we can search for the value in the middle of it
 * and determine wether we are left from our value, or right from it.
 * Since we are splitting the array in half constantly, we are saving
 * the time of running half of the array in each side of the iteration
 *
 * Running Time O(log n)
 */

export default function binarySearch(
    haystack: number[],
    needle: number,
): boolean {
    let lo = 0;
    let hi = haystack.length;
    do {
        let m = Math.floor(lo + (hi - lo) / 2);
        let value = haystack[m];
        if (value === needle) return true;
        else if (value > needle) hi = m;
        else lo = m + 1;
    } while (lo < hi);
    return false;
}
