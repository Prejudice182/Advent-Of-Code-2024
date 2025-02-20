const input = require('node:fs').readFileSync('input.txt', 'utf-8')
const testData = `5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`

const isInBounds = (grid, x, y) =>
    x >= 0 && x < grid[0].length && y >= 0 && y < grid.length
const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
]

const part1 = (inputString, size, take) => {
    const matrix = new Array(size)
        .fill('.')
        .map(() => new Array(size).fill('.'))
    const bytes = inputString
        .split(/\r?\n/)
        .map((value) => value.split(',').map(Number))
    const byteSegment = bytes.slice(0, take)
    const seen = { '0,0': 1 }
    for (const [x, y] of byteSegment) seen[[x, y].join(',')] = 1
    const stack = [{ distance: 0, x: 0, y: 0 }]
    while (stack.length) {
        const current = stack.shift()
        if (current.x === size - 1 && current.y === size - 1)
            return current.distance
        for (const dir of dirs) {
            const [nx, ny] = [current.x + dir[0], current.y + dir[1]]
            if (isInBounds(matrix, nx, ny) && !seen[[nx, ny].join(',')]) {
                seen[[nx, ny].join(',')] = 2
                stack.push({ distance: current.distance + 1, x: nx, y: ny })
            }
        }
    }
}

console.log(part1(testData, 7, 12))
console.log(part1(input, 71, 1024))

const part2 = (inputString, size) => {
    const matrix = new Array(size)
        .fill('.')
        .map(() => new Array(size).fill('.'))
    const bytes = inputString
        .split(/\r?\n/)
        .map((value) => value.split(',').map(Number))
    const walls = []
    mazeLoop: for (const [x, y] of bytes) {
        const seen = { '0,0': 1 }
        const key = [x, y].join(',')
        walls.push(key)
        for (const wall of walls) {
            seen[wall] = 1
        }
        const stack = [{ distance: 0, x: 0, y: 0 }]
        while (stack.length) {
            const current = stack.shift()
            if (current.x === size - 1 && current.y === size - 1)
                continue mazeLoop
            for (const dir of dirs) {
                const [nx, ny] = [current.x + dir[0], current.y + dir[1]]
                if (isInBounds(matrix, nx, ny) && !seen[[nx, ny].join(',')]) {
                    seen[[nx, ny].join(',')] = 2
                    stack.push({ distance: current.distance + 1, x: nx, y: ny })
                }
            }
        }
        return [x, y].join(',')
    }
}

console.log(part2(testData, 7))
console.log(part2(input, 71))
