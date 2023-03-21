/*
 * Runtime O(n^2) coming from the polinomial formula of (N+1) . N/2
 */
export default function bubbleSort(array: number[]) {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[i] > array[j]) {
                const pivot = array[i];
                array[i] = array[j];
                array[j] = pivot;
                i--;
            }
        }
    }
}
