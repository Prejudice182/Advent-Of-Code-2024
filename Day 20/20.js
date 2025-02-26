const input = require('node:fs').readFileSync('input.txt', 'utf-8')
const testData = `###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############`

const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]]
const isInBounds = (grid, x, y) => x >= 0 && x < grid[0].length && y >= 0 && y < grid.length
const manhattanDist = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1])
const findPos = (grid, char) => {
    const y = grid.findIndex((row) => row.includes(char))
    const x = grid[y].findIndex((col) => col === char)
    return [x, y]
}
const getPath = (grid, start, [endX, endY]) => {
    const path = [start]
    while (([x, y] = path.at(-1)) && (x !== endX || y !== endY)) {
        const [px, py] = path.at(-2) ?? [-1, -1]
        const [nx, ny] = dirs.map(([dx, dy]) => [x + dx, y + dy]).find(([nx, ny]) => isInBounds(grid, nx, ny) && grid[ny][nx] !== '#' && (nx !== px || ny !== py))
        path.push([nx, ny])
    }
    return path
}
const cheat = (path, at, duration) => {
    const saved = []
    for (let i = at + 1; i < path.length; ++i) {
        const dist = manhattanDist(path[at], path[i])
        const save = i - at - dist
        if (dist <= duration && save > 0) saved.push([save, { from: at, to: i }])
    }
    return saved
}
const getOptimalCheats = (path, duration, saved) => path.flatMap((_, at, path) => cheat(path, at, duration)).reduce((sum, [timeSaved]) => (timeSaved >= saved ? sum + 1 : sum), 0)
const part1 = (inputString, save) => {
    const maze = inputString.split(/\r?\n/).map((line) => line.split(''))
    const [start, end] = [findPos(maze, 'S'), findPos(maze, 'E')]
    const path = getPath(maze, start, end)
    const cheats = getOptimalCheats(path, 2, save)
    return cheats
}

const part2 = (inputString, save) => {
    const maze = inputString.split(/\r?\n/).map((line) => line.split(''))
    const [start, end] = [findPos(maze, 'S'), findPos(maze, 'E')]
    const path = getPath(maze, start, end)
    const cheats = getOptimalCheats(path, 20, save)
    return cheats
}

console.log(part1(testData, 64))
console.log(part1(input, 100))

console.log(part2(testData, 50))
console.log(part2(input, 100))