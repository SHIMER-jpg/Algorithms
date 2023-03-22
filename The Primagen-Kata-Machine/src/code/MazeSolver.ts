declare type Point = {
    x: number;
    y: number;
};

/*
 * We move block by block, and there are some base cases
 * 1. We've already been there
 * 2. We are on a wall
 * 3. We are off the map
 * 4. We are on the end - exit
 *
 * The recursive case is to check all directions
 */

const dir = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
];

function walk(
    maze: string[],
    wall: string,
    curr: Point,
    end: Point,
    seen: boolean[][],
    path: Point[],
): boolean {
    //3.
    if (
        curr.x < 0 ||
        curr.x >= maze[0].length ||
        curr.y < 0 ||
        curr.y >= maze.length
    )
        return false;

    //2.
    if (maze[curr.y][curr.x] === wall) return false;

    if (seen[curr.y][curr.x]) return false;

    if (curr.x === end.x && curr.y === end.y) {
        path.push(curr);
        return true;
    }
    seen[curr.y][curr.x] = true;
    path.push(curr);

    for (let i = 0; i < dir.length; i++) {
        const [x, y] = dir[i];
        if (
            walk(maze, wall, { x: curr.x + x, y: curr.y + y }, end, seen, path)
        ) {
            return true;
        }
    }

    path.pop();
    return false;
}

export default function mazeSolver(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const seen: boolean[][] = [];
    const path: Point[] = [];
    for (let i = 0; i < maze.length; i++) {
        seen.push(new Array(maze[0].length).fill(false));
    }

    walk(maze, wall, start, end, seen, path);
    /* 
      pre
      recourse
      post 
    */
    return path;
}
