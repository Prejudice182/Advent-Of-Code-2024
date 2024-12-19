const testData1 = 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))'

const part1Regex = /mul\((\d{1,3}),(\d{1,3})\)/gm
const test1Results = [...testData1.matchAll(part1Regex)].map((result) => result[1] * result[2]).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
console.log(test1Results)

const fs = require('node:fs')
const input = fs.readFileSync('input.txt', 'utf-8')

const part1Results = [...input.matchAll(part1Regex)].map((result) => result[1] * result[2]).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
console.log(part1Results)

const testData2 = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"

const part2Regex = /don\'t\(\).+?do\(\)/gms
const testData2Stripped = testData2.replaceAll(part2Regex, '')
const test2Results = [...testData2Stripped.matchAll(part1Regex)].map((result) => result[1] * result[2]).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
console.log(test2Results)

const inputStripped = input.replaceAll(part2Regex, '')
const part2Results = [...inputStripped.matchAll(part1Regex)].map((result) => result[1] * result[2]).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
console.log(part2Results)