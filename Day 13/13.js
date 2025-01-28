const fs = require('node:fs')
const input = fs.readFileSync('input.txt', 'utf-8')
const testData = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`

const part1 = (inputString) => {
    const machines = inputString.split(/\r?\n\r?\n/).map((machine) => ([...machine.split(/\r?\n/).map((line) => [...line.matchAll(/\d+/g)].map((match) => +match[0]))]))
    let results = []
    for (const machine of machines) {
        const [a, b, prize] = [...machine]
        const det = (a[0] * b[1]) - (a[1] * b[0])
        const det1 = prize[0] * b[1] - prize[1] * b[0]
        const det2 = a[0] * prize[1] - a[1] * prize[0]
        const countA = det1 / det
        const countB = det2 / det
        if (countA % 1 === 0 && countB % 1 === 0) results.push([countA, countB])
    }
    return results.reduce((acc, curr) => acc + curr[1] + (curr[0] * 3), 0)
}

const part2 = (inputString) => {
    const machines = inputString.split(/\r?\n\r?\n/).map((machine) => ([...machine.split(/\r?\n/).map((line) => [...line.matchAll(/\d+/g)].map((match) => +match[0]))]))
    let results = []
    for (const machine of machines) {
        let [a, b, prize] = [...machine]
        prize = prize.map((ele) => ele + 10000000000000)
        const det = (a[0] * b[1]) - (a[1] * b[0])
        const det1 = prize[0] * b[1] - prize[1] * b[0]
        const det2 = a[0] * prize[1] - a[1] * prize[0]
        const countA = det1 / det
        const countB = det2 / det
        if (countA % 1 === 0 && countB % 1 === 0) results.push([countA, countB])
    }
    return results.reduce((acc, curr) => acc + curr[1] + (curr[0] * 3), 0)
}

console.log(part1(testData))
console.log(part1(input))

console.log(part2(testData))
console.log(part2(input))