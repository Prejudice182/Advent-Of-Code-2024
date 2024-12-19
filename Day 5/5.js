const fs = require('node:fs')
const input = fs.readFileSync('input.txt', 'utf-8')

const testData = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`

const part1 = (input) => {
  const [first, second] = input.split(/\r?\n\s*\r?\n/).map((line) => line.split(/\r?\n/))
  const rules = first.map((rule) => rule.split('|'))
  const updates = second.map((update) => update.split(','))

  const validUpdates = updates.filter((update) => {
    for (const [x, y] of rules.values()) {
      if (update.indexOf(x) >= 0 && update.indexOf(y) >= 0) {
        if (update.indexOf(x) > update.indexOf(y)) return false
      }
    }
    return true
  })

  return validUpdates.reduce((accumulator, currentValue, index) => accumulator + +currentValue[Math.round((currentValue.length - 1) / 2)], 0)
}

const part2 = (input) => {
  const [first, second] = input.split(/\r?\n\s*\r?\n/).map((line) => line.split(/\r?\n/))
  const rules = first.map((rule) => rule.split('|'))
  const updates = second.map((update) => update.split(','))

  const invalidUpdates = updates.filter((update) => {
    for (const [x, y] of rules.values()) {
      if (update.indexOf(x) >= 0 && update.indexOf(y) >= 0) {
        if (update.indexOf(x) > update.indexOf(y)) return true
      }
    }
    return false
  })

  const fixInvalids = (update) => {
    for (const [x, y] of rules.values()) {
      const xIdx = update.indexOf(x)
      const yIdx = update.indexOf(y)
      if (xIdx >= 0 && yIdx >= 0) {
        if (xIdx > yIdx) {
          [update[xIdx], update[yIdx]] = [update[yIdx], update[xIdx]]
          fixInvalids(update)
        }
      }
    }
    return update
  }

  const fixedInvalids = invalidUpdates.map((update) => fixInvalids(update))

  return fixedInvalids.reduce((accumulator, currentValue, index) => accumulator + +currentValue[Math.round((currentValue.length - 1) / 2)], 0)
}

console.log(part1(testData))
console.log(part1(input))

console.log(part2(testData))
console.log(part2(input))