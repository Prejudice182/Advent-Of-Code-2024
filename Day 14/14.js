const fs = require('node:fs')
const input = fs.readFileSync('input.txt', 'utf-8')
const testData = `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`

const move = (robot, width, height, moves) => {
    const newX = robot.x + (robot.xVel * moves)
    const newY = robot.y + (robot.yVel * moves)
    robot.x = ((newX % width) + width) % width
    robot.y = ((newY % height) + height) % height
    return robot
}

const part1 = (inputString, width, height) => {
    const data = inputString.split(/\r?\n/).flatMap((line) => [...line.matchAll(/p=(?<x>\d+),(?<y>\d+) v=(?<xVel>-?\d+),(?<yVel>-?\d+)/gm)].map((match) => ({x: +match.groups.x, y: +match.groups.y, xVel: +match.groups.xVel, yVel: +match.groups.yVel})))
    for (let robot of data) {
        robot = move(robot, width, height, 100)
    }
    const n = data.filter((robot) => robot.x < (width - 1) / 2 && robot.y < (height - 1) / 2).length
    const e = data.filter((robot) => robot.x > (width - 1) / 2 && robot.y < (height - 1) / 2).length
    const s = data.filter((robot) => robot.x > (width - 1) / 2 && robot.y > (height - 1) / 2).length
    const w = data.filter((robot) => robot.x < (width - 1) / 2 && robot.y > (height - 1) / 2).length

    return [n, e, s, w].reduce((acc, curr) => acc * curr, 1)
}

const part2 = (inputString, width, height) => {
    const data = inputString.split(/\r?\n/).flatMap((line) => [...line.matchAll(/p=(?<x>\d+),(?<y>\d+) v=(?<xVel>-?\d+),(?<yVel>-?\d+)/gm)].map((match) => ({x: +match.groups.x, y: +match.groups.y, xVel: +match.groups.xVel, yVel: +match.groups.yVel})))
    let count = 100
    for (let robot of data) {
        robot = move(robot, width, height, count)
    }
    main:
    while (true) {
        count++
        for (let robot of data) {
            robot = move(robot, width, height, 1)
        }
        const n = data.filter((robot) => robot.x < (width - 1) / 2 && robot.y < (height - 1) / 2).length
        const e = data.filter((robot) => robot.x > (width - 1) / 2 && robot.y < (height - 1) / 2).length
        const s = data.filter((robot) => robot.x > (width - 1) / 2 && robot.y > (height - 1) / 2).length
        const w = data.filter((robot) => robot.x < (width - 1) / 2 && robot.y > (height - 1) / 2).length
        for (let quad of [n, e, s, w]) 
            if (quad > data.length / 2) 
                break main
    }
    return count
}

console.log(part1(testData, 11, 7))
console.log(part1(input, 101, 103))

console.log(part2(input, 101, 103))