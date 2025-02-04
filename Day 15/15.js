const fs = require('node:fs')
const input = fs.readFileSync('input.txt', 'utf-8')
const testData = `##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`

const dirs = {'<': [-1, 0], '^': [0, -1], '>': [1, 0], 'v': [0, 1]}

const nextSym = (grid, curr, dir) => {
    const nx = curr.x + dir[0]
    const ny = curr.y + dir[1]
    const next = grid.find((ele) => ele.x === nx && ele.y === ny)
    return next
}

const part1 = (inputString) => {
    const [map, moves] = inputString.split(/\r?\n\r?\n/).map((ele) => ele.split(/\r?\n/))
    const mapObj = map.flatMap((line, y) => line.split('').map((char, x) => ({x, y, sym: char})))
    const movesArray = moves.flatMap((line) => line.split(''))
    for (const move of movesArray) {
        const robot = mapObj.find((ele) => ele.sym === '@')
        const direction = dirs[move]
        let nextInLine = nextSym(mapObj, robot, direction)
        let boxes = 0
        while (nextInLine.sym !== '#' && nextInLine.sym !== '.') {
            boxes++
            nextInLine = nextSym(mapObj, nextInLine, direction)
        }
        const nx = robot.x + (boxes * direction[0]) + direction[0]
        const ny = robot.y + (boxes * direction[1]) + direction[1]
        const newPos = mapObj.find((ele) => ele.x === nx && ele.y === ny)
        if (newPos.sym === '.') {
            nextInLine = nextSym(mapObj, robot, direction)
            robot.sym = '.'
            newPos.sym = 'O'
            nextInLine.sym = '@'
        }
    }
    const newBoxes = mapObj.filter((ele) => ele.sym === 'O')
    const total = newBoxes.reduce((acc, curr) => acc + curr.x + (100 * curr.y), 0)
    console.log(total)
}

const init = (inputString) => {
    const [grid, moves] = inputString.split(/\r?\n\r?\n/)
    return [
        grid.split(/\r?\n/).map((line) => line.split('')),
        moves.split(/\r?\n/).join('').split('')
    ]
}

const part2 = (inputString) => {
    const [origMap, moves] = init(inputString)
    const compareVector = (a, b) => a.length === b.length && a.every((v, i) => v === b[i])
    const addVector = (a, b) => a.map((v, i) => v + b[i])
    const mv = (v) => map[v[1]][v[0]]
    const getRobot = () => objects.filter((obj) => obj.type === 0)[0]

    let objects = []

    const map = origMap.map((row) => {
        const tmp = []
        for (const char of row)
            for (let i = 0; i < 2; i++) tmp.push(char === '#' ? '#' : '.')
        return tmp
    })

    const moveFunc = (dir, o) => {
        const direction = dirs[dir]
        const p = o.pos.map((v, i) => v + direction[i])
        const p2 = addVector(p, addVector(o.size, [-1, -1]))

        if (mv(p) === '#' || mv(p2) === '#') return false

        const obstacles = objects.filter((ob) => {
            if (compareVector(ob.pos, o.pos)) return false
            return compareVector(ob.pos, p) || compareVector(ob.pos, p2) || compareVector(addVector(ob.pos, [1, 0]), p)
        })

        if (obstacles.length === 0 || obstacles.every((ob) => moveFunc(dir, ob))) {
            o.pos = p
            return true
        } else return false
    }

    for (const [y, row] of origMap.entries()) {
        for (const [x, char] of row.entries()) {
            if (['#', '.'].includes(char)) continue
            objects.push({
                pos: [x*2, y],
                type: char === '@' ? 0 : 1,
                size: char === '@' ? [1, 1] : [2, 1]
            })
            origMap[y][x] = '.'
        }
    }

    for (const move of moves) {
        const state = objects.map((a) => ({pos: a.pos.slice(), size: a.size.slice(), type: a.type}))
        if (!moveFunc(move, getRobot())) objects = state
    }
    console.log(objects.filter((obj) => obj.type === 1).reduce((acc, curr) => acc + curr.pos[1]*100 + curr.pos[0], 0))
}

// part1(testData)
// part1(input)

part2(testData)
part2(input)