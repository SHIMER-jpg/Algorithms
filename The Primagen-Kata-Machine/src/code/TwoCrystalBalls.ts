/*
Given two crystal balls, that will break if dropped form high enough distance, 
determine the exact spot in which it will break in the most optimized way

RunTime is O(sqrt(n))
*/

export default function TwoCrystalBalls(breaks: number[]): number {
    const jump = Math.floor(Math.sqrt(breaks.length));
    let i = jump;
    for (; i < breaks.length; i += jump) {
        if (breaks[i]) break;
    }

    let x = i - jump;
    for (; x < i + jump; x++) {
        if (breaks[x]) return x;
    }

    return -1;
}
