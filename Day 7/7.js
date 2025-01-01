const fs = require('node:fs')

const input = fs.readFileSync('input.txt', 'utf-8')
const testData = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`

const ops = [(a, b) => (a % b === 0 ? a / b : -1), (a, b) => a - b]

const factorOf = (nums, target, i = nums.length - 1) => {
    if (!i) return target === nums[0]
    if (target < 0) return false
    return ops.some((func) => factorOf(nums, func(target, nums[i]), i - 1))
}

const part1 = (lines) => {
    const equations = lines.split(/\r?\n/).map((equation) => equation.match(/\d+/g).map(Number))
    const proper = equations.filter(([target, ...equation]) => factorOf(equation, target)).map(([total]) => total)
    const total = proper.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    console.log(total)
}

const part2 = (lines) => {
    const unconcat = (x, y) => {
        const [sub, yMag] = [x - y, 10 ** (Math.floor(Math.log10(y)) + 1)]
        return sub > 0 && sub % yMag === 0 ? sub / yMag : -1
    }

    ops.push(unconcat)
    part1(lines)
}

part1(testData)
part1(input)

part2(testData)
part2(input)