const fs = require('node:fs')
const input = fs.readFileSync('input.txt', 'utf-8')

const testData = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`

const part1 = (input) => {
  const floor = input.match(/./g)
  const inputLength = input.split(/\r?\n/).length
  const directions = [-inputLength, 1, inputLength, -1]

  let currentPos = floor.indexOf('^')
  floor[currentPos] = 1
  let currentDir = 3
  
  const walk = () => {
    const rules = [currentPos >= inputLength, (currentPos + 1) % inputLength, currentPos < inputLength ** 2 - inputLength, currentPos % inputLength]
    return rules[currentDir % 4]
  }
  for (; walk() && ++currentDir;) {
    for (; walk() && floor[currentPos + directions[currentDir % 4]] !== '#'; currentPos += directions[currentDir % 4]) {
      floor[currentPos] = '1'
    }
  }
  return floor.join('').split('1').length
}

const part2 = (input) => {
  const floor = input.match(/./g)
  const size = input.split(/\r?\n/).length
  const directions = [-size, 1, size, -1]
  let currentDir = 0
  let successfulPaths = 0
  let visited = []

  const inBounds = (position, direction) => {
    const rules = [position >= size, (position + 1) % size, position < size ** 2 - size, position % size]
    return rules[direction]
  }
  const validMove = (tiles, position, direction) => tiles[position + directions[direction]] !== '#' && inBounds(position, direction)
  const findPath = (tiles, position, direction, seen, steps = 0) => {
    for (; inBounds(position, direction) && ++steps < size * 2;) {
      while (validMove(tiles, position, direction)) {
        let nextPos = position + directions[direction]
        if (seen && !visited.includes(nextPos)) {
          tiles[nextPos] = '#'
          visited.push(nextPos)
          if (findPath(tiles, position, direction, 0)) successfulPaths++
        }
        tiles[position] |= 2 ** direction
        position = nextPos
      }
      if (inBounds(position, direction)) direction = ++direction % 4
    }
    return steps == size * 2
  }
  findPath(floor, floor.indexOf('^'), currentDir, 1)
  return successfulPaths
}

console.log(part1(testData))
console.log(part1(input))

console.log(part2(testData))
console.log(part2(input))