const input = require('node:fs').readFileSync('input.txt', 'utf-8')
const testData = `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`

const part1 = (inputString) => {
    let [patterns, desired] = [...inputString.split(/\r?\n\r?\n/)]
    patterns = patterns.split(', ')
    desired = desired.split(/\r?\n/)
    let count = 0
    outerLoop:
    for (const desire of desired) {
        const queue = patterns.filter((pattern) => pattern === desire.slice(0, pattern.length))
        while (queue.length > 0) {
            const current = queue.shift()
            if (current === desire) {
                count++
                continue outerLoop
            }
            for (const pattern of patterns) {
                const next = current + pattern
                if (next.split('').every((char, ind) => char === desire[ind])) queue.unshift(next)
            }
        }
    }
    console.log(count)
}

const part2 = (inputString) => {
    let [patterns, desired] = [...inputString.split(/\r?\n\r?\n/)]
    patterns = patterns.split(', ')
    desired = desired.split(/\r?\n/)
    const memo = new Map()
    memo.set('', 1)

    const findDesired = (desire) => {
        if (memo.has(desire)) return memo.get(desire)
        if (desire === '') return true
        let count = 0
        for (const pattern of patterns) {
            if (desire.startsWith(pattern))
                if (findDesired(desire.slice(pattern.length)))
                    count += memo.get(desire.slice(pattern.length))
        }
        memo.set(desire, count)
        return count > 0
    }
    let res1 = 0
    let res2 = 0
    for (const desire of desired) {
        findDesired(desire)
        res1 += memo.get(desire) > 0 ? 1: 0
        res2 += memo.get(desire)
    }
    console.log(res1, res2, memo)
}

part1(testData)
part1(input)

part2(testData)
part2(input)