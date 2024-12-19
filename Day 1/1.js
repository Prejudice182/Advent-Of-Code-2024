import fs from 'node:fs'

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    const leftSide = []
    const rightSide = []
    const lines = data.split(/\r?\n/).forEach((line) => {
        const [left, right] = line.split('   ')
        leftSide.push(left)
        rightSide.push(right)
    })
    leftSide.sort()
    rightSide.sort()
    const distance = leftSide.reduce((accumulator, currentValue, index) => accumulator + Math.abs(currentValue - rightSide[index]), 0)
    const similarity = leftSide.reduce((accumulator, currentValue, index) => accumulator + (rightSide.filter((item) => item === currentValue).length * currentValue), 0)
    console.log(distance, similarity)
})