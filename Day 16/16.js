const input = require('node:fs').readFileSync('input.txt', 'utf-8')
const testData = `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`

const isInBounds = (grid, x, y) => x >= 0 && x < grid[0].length && y >= 0 && y < grid.length
const dirs = [[1, 0], [0, -1], [-1, 0], [0, 1]]

const queueNext = (queue, current, dir, map, diff = 0) => {
    const [x, y] = [current.x, current.y].map((v, i) => v + dirs[dir][i])
    if (isInBounds(map, x, y) && map[y][x].char !== '#') {
        let next = {}
        if (dir === current.dir || map[y][x].char === 'E') next.score = current.score + 1
        else next.score = current.score + 1001
        if ((map[y][x].score + diff) <= next.score) return queue

        next.x = x
        next.y = y
        next.char = current.char
        next.last_dir = current.dir
        next.dir = dir
        next.visited = [...current.visited, [x, y]]

        queue.push(next)
    }
    return queue
}

let bestPath = []

const part1 = (inputString) => {
    let start = []
    let end = []
    const map = inputString.split(/\r?\n/).map((line, y) => line.split('').map((char, x) => {
        if (char === 'S') start = [x, y]
        else if (char === 'E') end = [x, y]
        return {x, y, char, dir: 0, last_dir: 0, score: Infinity, visited: []}
    }))
    let queue = []
    let answer = 0
    for (let i = 0; i < 4; i++) {
        map[start[1]][start[0]].score = 0
        map[start[1]][start[0]].last_dir = 1
        queue = queueNext(queue, map[start[1]][start[0]], i, map)
    }
    let path = []
    while (queue.length) {
        queue = queue.sort((a, b) => a.score - b.score)
        const current = queue.shift()
        if (current.x === end[0] && current.y === end[1]) {
            bestPath = [...current.visited]
            answer = current.score
            break
        }
        if (current.score > map[current.y][current.x].score) continue

        map[current.y][current.x].score = current.score
        map[current.y][current.x].dir = current.dir
        map[current.y][current.x].last_dir = current.last_dir

        for (let i = 0; i < 4; i++) {
            if (Math.abs(i - current.dir) === 2) continue
            queue = queueNext(queue, current, i, map)
        }
    }
    return answer
}

console.log(part1(testData))
console.log(part1(input))

const part2 = (inputString) => {
    let start = []
    let end = []
    const map = inputString.split(/\r?\n/).map((line, y) => line.split('').map((char, x) => {
        if (char === 'S') start = [x, y]
        else if (char === 'E') end = [x, y]
        return {x, y, char, dir: 0, last_dir: 0, score: Infinity, visited: []}
    }))

    let bestPaths = []
    let bestScore = Infinity
    let queue = []

    for (let i = 0; i < 4; i++) {
        map[start[1]][start[0]].score = 0
        map[start[1]][start[0]].last_dir = 1
        queue = queueNext(queue, map[start[1]][start[0]], i, map, 1001)
    }
    while (queue.length) {
        queue = queue.sort((a, b) => a.score - b.score)
        const current = queue.shift()
        if (current.x === end[0] && current.y === end[1]) {
            if (current.score > bestScore) continue
            bestPaths.push({score: current.score, visited: [...current.visited]})
            bestScore = current.score
            continue
        }
        if (current.score > bestScore || current.visited.length > bestPath.length) continue

        map[current.y][current.x].score = current.score
        map[current.y][current.x].dir = current.dir
        map[current.y][current.x].last_dir = current.last_dir

        for (let i = 0; i < 4; i++) {
            if (Math.abs(i - current.dir) === 2) continue
            queue = queueNext(queue, current, i, map, 1001)
        }
    }
    const answer = new Set()
    for (const path of bestPaths) {
        for (const coords of path.visited) {
            answer.add(coords.join(','))
        }
    }
    return answer.size + 1
}

console.log(part2(testData))
console.log(part2(input))