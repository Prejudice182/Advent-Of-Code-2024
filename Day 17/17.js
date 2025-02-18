const input = require('node:fs').readFileSync('input.txt', 'utf-8')
const testData = `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`
const testData2 = `Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`

const genOutput = (a, b, c, program) => {
    const combo = (operand) => {
        switch (operand) {
            case 4:
                operand = a
                break
            case 5:
                operand = b
                break
            case 6:
                operand = c
                break
        }
        return operand
    }
    const divIns = (operand) => {
        const numerator = a
        operand = combo(operand)
        const denominator = 2 ** operand
        return Math.trunc(numerator / denominator)
    }

    let pointer = 0
    const output = []
    instrLoop:
    while (program[pointer] !== undefined) {
        const instruction = +program[pointer]
        const operand = +program[pointer + 1]
        switch (instruction) {
            case 0:
                a = divIns(operand)
                break
            case 1:
                b = (b ^ operand) >>> 0
                break
            case 2:
                b = combo(operand) % 8
                break
            case 3:
                if (a !== 0) {
                    pointer = operand
                    continue instrLoop
                }
                break
            case 4:
                b = (b ^ c) >>> 0
                break
            case 5:
                output.push(combo(operand) % 8)
                break
            case 6:
                b = divIns(operand)
                break
            case 7:
                c = divIns(operand)
                break
        }
        pointer += 2
    }
    return output.join(',')
}

const part1 = (inputString) => {
    const inputArray = inputString.split(/\r?\n/).filter(Boolean)
    let regA = +inputArray[0].split(':')[1]
    let regB = +inputArray[1].split(':')[1]
    let regC = +inputArray[2].split(':')[1]
    const program = inputArray[3].split(': ')[1].split(',').map(Number)
    return genOutput(regA, regB, regC, program)
}

const part2 = (inputString) => {
    const inputArray = inputString.split(/\r?\n/).filter(Boolean)
    let regA = +inputArray[0].split(':')[1]
    let regB = +inputArray[1].split(':')[1]
    let regC = +inputArray[2].split(':')[1]
    const program = inputArray[3].split(': ')[1].split(',').map(Number)
    
    const queue = []
    queue.push({ result: '', len: 0 })
    while (queue.length) {
        const q = queue.shift()
        if (q.len === program.length) {
            return parseInt(q.result, 2)
        }
        const from = parseInt(q.result + '000', 2)
        const to = parseInt(q.result + '111', 2)
        const expect = program.slice((q.len + 1) * -1).join(',')
        for (let a = from; a <= to; a++) {
            const res = genOutput(a, regB, regC, program)
            if (res === expect) queue.push({ result: a.toString(2), len: q.len + 1 })
        }
    }
}

console.log(part1(testData))
console.log(part1(input))

console.log(part2(testData2))
console.log(part2(input))