const fs = require('node:fs')
const input = fs.readFileSync('input.txt', 'utf-8')

const testData = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`

const isInBounds = (grid, x, y) => x >= 0 && x < grid[0].length && y >= 0 && y < grid.length

const part1 = (inputString) => {
    const inputArray = inputString.split(/\r?\n/).map((line) => line.split('').map(Number))
    const trailheads = inputArray.reduce((acc, curr, index) => {
        if (curr.includes(0)) {
            const zeroes = curr.reduce((a, c, i) => {
                if (c === 0) a.push({x: i, y: index, val: inputArray[index][i]})
                return a
            }, [])
            acc.push(zeroes)
        }
        return acc
    }, []).flat()
    const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]]
    let count = 0
    for (const trailhead of trailheads) {
        const found = new Set()
        const stack = [trailhead]
        while (stack.length > 0) {
            const current = stack.pop()
            if (current.val === 9) {
                found.add(current.x+current.y*1000)
                continue
            }
            for (const dir of dirs) {
                const x = current.x + dir[0]
                const y = current.y + dir[1]
                if (isInBounds(inputArray, x, y) && inputArray[y][x] === current.val + 1) stack.push({x, y, val: inputArray[y][x]})
            }
        }
        count += found.size
    }
    return count
}

const part2 = (inputString) => {
    const inputArray = inputString.split(/\r?\n/).map((line) => line.split('').map(Number))
    const trailheads = inputArray.reduce((acc, curr, index) => {
        if (curr.includes(0)) {
            const zeroes = curr.reduce((a, c, i) => {
                if (c === 0) a.push({x: i, y: index, val: inputArray[index][i]})
                return a
            }, [])
            acc.push(zeroes)
        }
        return acc
    }, []).flat()
    const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]]
    let answer = 0
    for (const trailhead of trailheads) {
        let count = 0
        const stack = [trailhead]
        while (stack.length > 0) {
            const current = stack.pop()
            if (current.val === 9) {
                count++
                continue
            }
            for (const dir of dirs) {
                const x = current.x + dir[0]
                const y = current.y + dir[1]
                if (isInBounds(inputArray, x, y) && inputArray[y][x] === current.val + 1) stack.push({x, y, val: inputArray[y][x]})
            }
        }
        answer += count
    }
    return answer
}

console.log(part1(testData))
console.log(part1(input))

console.log(part2(testData))
console.log(part2(input))