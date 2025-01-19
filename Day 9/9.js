const fs = require('node:fs')
const input = fs.readFileSync('input.txt', 'utf-8')

const testData = `2333133121414131402`

const part1 = (inputString) => {
  const groups = inputString.match(/.{1,2}/g)
  let output = []
  for (const [index, group] of groups.entries()) {
    const [blocks, spaces] = group.split('')
    for (let i = 0; i < blocks; i++) output.push(index)
    for (let i = 0; i < spaces; i++) output.push('.')
  }
  const periods = output.map((element, index) => element === '.' ? index : null).filter(Number)
  for (const period of periods) {
    while (output[output.length - 1] === '.') output.pop()
    output.splice(period, 1, output.pop())
  }
  const value = output.reduce((acc, curr, index) => acc + (curr * index), 0)
  return value
}

// console.log(part1(testData))
// console.log(part1(input))

const part2 = (inputString) => {
  const groups = inputString.match(/.{1,2}/g)
  let output = []
  for (const [index, group] of groups.entries()) {
    const [blocks, spaces] = group.split('')
    output.push({ id: index, length: +blocks })
    if (spaces > 0) output.push({ id: '.', length: +spaces})
  }
  const highestId = output[output.length - 1].id
  for (let i = highestId; i >= 0; i--) {
    const file = output.findIndex(block => block.id === i)
    const free = output.findIndex(block => block.id === '.' && block.length >= output[file].length)
    if (!output[free] || file < free) continue
    if (output[free].length > output[file].length) {
      output = [...output.slice(0, free), { id: output[file].id, length: output[file].length }, { id: '.', length: output[free].length - output[file].length }, ...output.slice(free + 1)]
      output[file + 1].id = '.'
    } else if (output[free].length === output[file].length) {
      output[free].id = output[file].id
      output[file].id = '.'
    }
  }
  for (let i = 0; i < output.length - 1; i++)
    if (output[i].id === '.' && output[i + 1].id === '.')
      output = [...output.slice(0, i), { id: '.', length: output[i].length + output[i + 1].length }, ...output.slice(i-- + 2)]
  let count = 0, checksum = 0
  for (let i = 0; i < output.length; i++) {
    if (output[i].id === '.') count += output[i].length
    else {
      for (let j = 0; j < output[i].length; j++) {
        checksum += count * output[i].id
        count++
      }
    }
  }
  return checksum
}

console.log(part2(testData))
console.log(part2(input))