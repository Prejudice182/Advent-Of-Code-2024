import fs from 'node:fs'

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

const part1 = (input) => {
    const permutator = (numbers) => {
        const operators = ['*', '+']
        const mixed = numbers.flatMap((value, index, array) => {
            for 
        })
    }
    const equations = input.split(/\r?\n/).map((equation) => [...equation.matchAll(/\d+/g)].map((match) => match[0]))
    for (const equation of equations) {
        const result = equation.shift()
        console.log(permutator(equation))
    }
    //return equations
}

console.log(part1(testData))