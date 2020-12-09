export function getMove(generation, state, validMovesZeros) {
    // simulates request giving back a random valid action
    const validTemp = validMovesZeros.map((valid, move) => valid ? move : -1)
    const validMoves = validTemp.filter((val) => val >= 0)
    const randomMove = validMoves[Math.floor(Math.random()*validMoves.length)]

    if (randomMove < 33) {
        return randomMove
    } else if (randomMove === 33) {
        const rankMove = Math.floor(Math.random()*9) + 33
        return rankMove
    } else if (randomMove === 34) {
        const suitMove = Math.floor(Math.random()*4) + 42
        return suitMove
    } else {
        return randomMove + 11
    }
}
