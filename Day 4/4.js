const testData1 = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`

const parsedTest = testData1.split(/\r?\n/).map((line) => line.split(''))
const width = parsedTest[0].length
const depth = parsedTest.length
const directions = [[0, 1], [1, 0], [1, 1], [1, -1], [0, -1], [-1, 0], [-1, -1], [-1, 1]]

const checkWord = (x, y, dx, dy, grid, word) => {
  for (const [index, letter] of word.split('').entries()) {
    const nextX = x + index * dx
    const nextY = y + index * dy
    if (nextX < 0 || nextY < 0 || nextX >= grid.length || nextY >= grid[0].length || grid[nextY][nextX] !== letter) return false
  }
  return true
}

const part1 = (grid) => {
  let count = 0
  const word = 'XMAS'

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      for (const [dx, dy] of directions) {
        if (checkWord(x, y, dx, dy, grid, word)) count++
      }
    }
  }
  return count
}

const part2 = (grid) => {
  let count = 0
  for (let x = 1; x < grid.length - 1; x++) {
    for (let y = 1; y < grid[0].length - 1; y++) {
      if (grid[x][y] === 'A') {
        const tlbr = (grid[x-1][y-1] === 'M' && grid[x+1][y+1] === 'S') || (grid[x-1][y-1] === 'S' && grid[x+1][y+1] === 'M')
        const trbl = (grid[x-1][y+1] === 'M' && grid[x+1][y-1] === 'S') || (grid[x-1][y+1] === 'S' && grid[x+1][y-1] === 'M')
        if (tlbr && trbl) count++
      }
    }
  }
  return count
}

console.log(part1(parsedTest))

const fs = require('node:fs')
const input = fs.readFileSync('input.txt', 'utf-8')
const parsedInput = input.split(/\r?\n/).map((line) => line.split(''))

console.log(part1(parsedInput))

console.log(part2(parsedTest))
console.log(part2(parsedInput))