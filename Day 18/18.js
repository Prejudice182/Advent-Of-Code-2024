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

const isInBounds = (grid, x, y) => x >= 0 && x < grid[0].length && y >= 0 && y < grid.length
const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]]
const findShortest = (visited, target) => {
    if (!visited[target]) return false
    let current = target
    const path = []
    while (current) {
        path.unshift(current)
        current = visited[current]
    }
    return path
}

const part1 = (inputString) => {
    const matrix = new Array(7).fill('.').map(() => new Array(7).fill('.'))
    const inputArray = inputString.split(/\r?\n/).map((value) => ({x: value.split(',')[0], y: value.split(',')[1]}))
    for (let i = 0; i <= 12; i++) {
        const current = inputArray[i]
        matrix[current.y][current.x] = '#'
    }
    const stack = [[0, 0]]
    const path = []
    const lastVisited = {}
    lastVisited['0,0'] = null
    while (true) {
        const [x, y] = [...stack.pop()]
        path.push([x, y].join(','))
        matrix[y][x] = 'O'
        if (x === matrix[0].length - 1 && y === matrix.length - 1) break
        let unvisited = 0
        for (const dir of dirs) {
            const [nx, ny] = [x + dir[0], y + dir[1]]
            if (isInBounds(matrix, nx, ny) && matrix[ny][nx] === '.') {
                const key = [nx, ny].join(',')
                if (!(key in lastVisited)) {
                    lastVisited[key] = [x, y].join(',')
                }
                stack.push([nx, ny])
                unvisited++
            }
        }
    }
    return findShortest(lastVisited, '6,6')
}

console.log(part1(testData))