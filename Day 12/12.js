const fs = require('node:fs')
const input = fs.readFileSync('input.txt', 'utf-8')
const testData = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`

const isInBounds = (grid, x, y) => x >= 0 && x < grid[0].length && y >= 0 && y < grid.length
const dirs = [[0, 1, 'd'], [1, 0, 'r'], [0, -1, 'u'], [-1, 0, 'l']]


const part1 = (inputString) => {
  const data = inputString.split(/\r?\n/).map((line, y) => line.split(''))
  const regions = new Map()
  let seen = new Set()
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      const type = data[y][x]
      const perimeter = []
      let size = 0
      let queue = [[x, y]]
      while (queue.length) {
        const current = queue.pop()
        if (seen.has(current[0]+current[1]*10000)) continue
        seen.add(current[0]+current[1]*10000)
        size++

        for (const dir of dirs) {
          const nx = current[0] + dir[0]
          const ny = current[1] + dir[1]
          if (!isInBounds(data, nx, ny) || data[ny][nx] !== type) {
            perimeter.push([current[0], current[1], dir[2]])
            continue
          }
          queue.push([nx, ny])
        }
      }
      if (size > 0 && perimeter.length > 0) {
        if (!regions.has(type)) regions.set(type, [])
        regions.get(type).push({size, perimeter})
      }
    }
  }
  let price = 0
  for (const list of regions)
    for (const region of list[1]) price += region.size * region.perimeter.length
  return price
}

const part2 = (inputString) => {
  const data = inputString.split(/\r?\n/).map((line, y) => line.split(''))
  const regions = new Map()
  let seen = new Set()
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      const type = data[y][x]
      const perimeter = []
      let size = 0
      let queue = [[x, y]]
      while (queue.length) {
        const current = queue.pop()
        if (seen.has(current[0]+current[1]*10000)) continue
        seen.add(current[0]+current[1]*10000)
        size++

        for (const dir of dirs) {
          const nx = current[0] + dir[0]
          const ny = current[1] + dir[1]
          if (!isInBounds(data, nx, ny) || data[ny][nx] !== type) {
            perimeter.push([current[0], current[1], dir[2]])
            continue
          }
          queue.push([nx, ny])
        }
      }
      if (size > 0 && perimeter.length > 0) {
        if (!regions.has(type)) regions.set(type, [])
        regions.get(type).push({size, perimeter})
      }
    }
  }
  let price = 0
  for (const list of regions) {
    for (const region of list[1]) {
      const sides = []
      let count = 0
      for (const dir of dirs) {
        sides.push(region.perimeter.filter((side) => side[2] === dir[2]))
      }
      for (const side of sides) {
        const units = side
        if (units[0][2] === 'd' || units[0][2] === 'u') {
          units.sort((a, b) => a[0] - b[0])
          units.sort((a, b) => a[1] - b[1])
        } else {
          units.sort((a, b) => a[1] - b[1])
          units.sort((a, b) => a[0] - b[0])
        }
        let next = units[0]
        count++
        for (let i = 0; i < units.length; i++) {
          if (units[i][0] !== next[0] || units[i][1] !== next[1]) count++
          if (units[i][2] === 'd' || units[i][2] === 'u') next = [units[i][0] + 1, units[i][1]]
          else next = [units[i][0], units[i][1] + 1]
        }
      }
      price += region.size * count
    }
  }
  return price
}

// console.log(part1(testData))
// console.log(part1(input))

console.log(part2(testData))
console.log(part2(input))