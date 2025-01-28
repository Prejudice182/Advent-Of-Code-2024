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
        for (let aPress = 100; aPress > 0; aPress--) {
            const newCoordsA = a.map((a, i) => prize[i] - (a * aPress))
            if (newCoordsA.some((ele) => ele < 0)) continue
            for (let bPress = 100; bPress > 0; bPress--) {
                const newCoordsB = b.map((b, i) => newCoordsA[i] - (b * bPress))
                if (newCoordsB.some((ele) => ele < 0)) continue
                if (newCoordsB.every((ele) => ele === 0)) results.push([aPress, bPress])
            }
        }
    }
    return results.reduce((acc, curr) => acc + curr[1] + (curr[0] * 3), 0)
}

const part2 = (inputString) => {
    const machines = inputString.split(/\r?\n\r?\n/).map((machine) => ([...machine.split(/\r?\n/).map((line) => [...line.matchAll(/\d+/g)].map((match) => +match[0]))]))
    let results = []
    for (const machine of machines) {
        let [a, b, prize] = [...machine]
        prize = prize.map((ele) => ele + 10000000000000)
        let aPress = 0, bPress = 0
        while (prize.some((ele) => ele > 0)) {
            aPress++
            prize = prize.map((ele, i) => ele - (a[i] * aPress))
            while (prize.some((ele) => ele > 0)) {
                bPress++
                prize = prize.map((ele, i) => ele - (b[i] * bPress))
                if (prize.every((ele) => ele === 0)) results.push([aPress, bPress])
            }
        }
        // for (let aPress = 10000000; aPress > 0; aPress--) {
        //     const newCoordsA = a.map((a, i) => prize[i] - (a * aPress))
        //     if (newCoordsA.some((ele) => ele < 0)) continue
        //     for (let bPress = 10000000; bPress > 0; bPress--) {
        //         const newCoordsB = b.map((b, i) => newCoordsA[i] - (b * bPress))
        //         if (newCoordsB.some((ele) => ele < 0)) continue
        //         if (newCoordsB.every((ele) => ele === 0)) results.push([aPress, bPress])
        //     }
        // }
    }
    return results
}

// console.log(part1(testData))
// console.log(part1(input))

console.log(part2(testData))