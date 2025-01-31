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

const dirs = [[-1, 0, '<'], [0, -1, '^'], [1, 0, '>'], [0, 1, 'v']]

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
        const direction = dirs.find((dir) => dir.includes(move))
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

part1(testData)
part1(input)