const fs = require('node:fs')
const input = fs.readFileSync('input.txt', 'utf-8')

const testData = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`

const includesArray = (data, arr) => data.some((e) => Array.isArray(e) && e.every((o, i) => Object.is(arr[i], o)))

const part1 = (input) => {
  const length = input.split(/\r?\n/).length
  const symbols = input.split(/\r?\n/).flatMap((line, index) => [...line.matchAll(/\w/g)].map((match) => ({sym: match[0], x: match.index, y: index})))
  const uniqueSymbols = [... new Set(symbols.map((value) => value.sym))]
  const antinodes = []
  for (const unique of uniqueSymbols) {
    const matching = symbols.filter((obj) => obj.sym === unique)
    for (const [i, match] of matching.entries()) {
      for (const [j, match2] of matching.entries()) {
        if (matching[i] === matching[j]) continue
        const newX = match.x + (match.x - match2.x)
        const newY = match.y + (match.y - match2.y)
        const antinode = [newX, newY]
        if (newX < length && newY < length && newX > -1 && newY > -1 && !includesArray(antinodes, antinode)) antinodes.push(antinode)
      }
    }
  }
  console.log(antinodes.length)
}

const part2 = (input) => {
  const length = input.split(/\r?\n/).length
  const symbols = input.split(/\r?\n/).flatMap((line, index) => [...line.matchAll(/\w/g)].map((match) => ({sym: match[0], x: match.index, y: index})))
  const uniqueSymbols = [... new Set(symbols.map((value) => value.sym))]
  const antinodes = []
  for (const unique of uniqueSymbols) {
    const matching = symbols.filter((obj) => obj.sym === unique)
    for (const [i, match] of matching.entries()) {
      for (const [j, match2] of matching.entries()) {
        if (matching[i] === matching[j]) continue
        if (!includesArray(antinodes, [match2.x, match2.y])) antinodes.push([match2.x, match2.y])
        const xDiff = match.x - match2.x
        const yDiff = match.y - match2.y
        let newX = match.x + xDiff
        let newY = match.y + yDiff
        while (newX < length && newY < length && newX > -1 && newY > -1) {
          let antinode = [newX, newY]
          if (!includesArray(antinodes, antinode)) antinodes.push(antinode)
          newX += xDiff
          newY += yDiff
        }
      }
    }
  }
  console.log(antinodes.length)
}

part1(testData)
part1(input)

part2(testData)
part2(input)