const fs = require('node:fs')
const input = fs.readFileSync('input.txt', 'utf-8')
const testData = `125 17`
let cache

const blink = (num, times) => {
    const cacheKey = `${num}-${times}`
    if (cache.has(cacheKey)) return cache.get(cacheKey)
    if (times === 0) return 1
    if (num === 0) {
        const result = blink(1, times - 1)
        cache.set(cacheKey, result)
        return result
    }
    const numStr = (''+num)
    let result
    if (numStr.length % 2 === 0) {
        const first = +(numStr.slice(0, numStr.length / 2))
        const second = +(numStr.slice(numStr.length / 2))
        result = blink(first, times - 1) + blink(second, times - 1)
    } else result = blink(num * 2024, times - 1)
    cache.set(cacheKey, result)
    return result
}

const part1 = (inputString) => {
    const numbers = inputString.split(' ').map(Number)
    cache = new Map()
    const answer = numbers.map((num) => blink(num, 25)).reduce((a, b) => a + b, 0)
    return answer
}

const part2 = (inputString) => {
    const numbers = inputString.split(' ').map(Number)
    cache = new Map()
    const answer = numbers.map((num) => blink(num, 75)).reduce((a, b) => a + b, 0)
    return answer
}

console.log(part1(testData))
console.log(part1(input))

console.log(part2(testData))
console.log(part2(input))