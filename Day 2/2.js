const testData = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`

const isAscending = (arr) => arr.every((level, index) => !index || +level > +arr[index - 1])
const isDescending = (arr) => arr.every((level, index) => !index || +level < +arr[index - 1])
const levelsJump = (arr) => arr.every((level, index) => !index || Math.abs(+level - +arr[index - 1]) <= 3)

const part1 = (nums) => (isAscending(nums) || isDescending(nums)) && levelsJump(nums)

const testLines = testData.split(/\r?\n/).map((line) => line.split(/\s/)).filter(part1).length
console.log(`Test data has ${testLines} safe reports`)

import fs from 'node:fs'
const input = fs.readFileSync('input.txt', 'utf-8')
const partOneLines = input.split(/\r?\n/).map((line) => line.split(/\s/)).filter(part1).length
console.log(`Real data has ${partOneLines} safe reports`)

const testLines2 = testData.split(/\r?\n/).map((line) => line.split(/\s/)).filter((nums, index) => {
    if (part1(nums)) return true
    let problemDampener = false
    nums.forEach((num, index, nums) => {
        const oneRemoved = nums.toSpliced(index, 1)
        if (part1(oneRemoved)) {
            problemDampener = true
        }
    })
    return problemDampener
}).length

console.log(`Test data has ${testLines2} safe reports with problem dampener`)

const partTwoLines = input.split(/\r?\n/).map((line) => line.split(/\s/)).filter((nums, index) => {
    if (part1(nums)) return true
    let problemDampener = false
    nums.forEach((num, index, nums) => {
        const oneRemoved = nums.toSpliced(index, 1)
        if (part1(oneRemoved)) {
            problemDampener = true
        }
    })
    return problemDampener
}).length

console.log(`Real data has ${partTwoLines} safe reports with problem dampener`)