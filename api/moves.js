const ADDRESS = 'http://watten-ai.herokuapp.com/move/';

export const getMove = async (generation, state, validMovesZeros) => {

    if (generation === -1){
        return getRandomMove(validMovesZeros)
    } else {
        return await getMoveFromServer(state, validMovesZeros)
    }
}

const getMoveFromServer = async (state, validMovesZeros) => {
    try {
        let response = await fetch(ADDRESS, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                distributing: state.humanStarting ? -1 : 1,
                hand_b: state.handB,
                played_cards: state.playedCards,
                current_score_a: state.currentScoreA,
                current_score_b: state.currentScoreB,
                current_prize: state.prize,
                is_last_move_raise: state.isLastMoveRaise,
                is_last_move_accepted_raise: state.isLastMoveAcceptedRaise,
                is_last_hand_raise_valid: state.isLastHandRaiseValid,
                first_card: state.firstCard,
                last_card: state.lastCard,
                rank: state.rank,
                suit: state.suit,
                valid_moves: validMovesZeros,
                tricks_played: state.tricks_played
            })
        });
        let json = await response.json()

        return json.move
    } catch (e) {
        console.log(e)
    }
}

// Gives back a random valid action
function getRandomMove(validMovesZeros) {
    const validTemp = validMovesZeros.map((valid, move) => valid ? move : -1)
    const validMoves = validTemp.filter((val) => val >= 0)
    const randomMove = validMoves[Math.floor(Math.random()*validMoves.length)]

    if (randomMove < 33) {
        return randomMove
    } else if (randomMove === 33) {
        return Math.floor(Math.random() * 9) + 33
    } else if (randomMove === 34) {
        return Math.floor(Math.random() * 4) + 42
    } else {
        return randomMove + 11
    }
}
