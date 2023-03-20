/**
 * Time complexity is O(n) since we need to traverse the array
 * Space complexity is O(1) since there is no case where we allocate new memory
 */
export default function linearSearch(
    haystack: number[],
    needle: number,
): boolean {
    for (let i = 0; i < haystack.length; i++) {
        if (haystack[i] === needle) return true;
    }
    return false;
}
