export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

export function getRankAndSuit(id) {
    if (id > 32) {
        console.warn('Card ID can\'t be greater than 32')
        return [9, 4]
    } else if (id === 32) {
        return [8, 3]
    } else {
        const s = Math.floor(id/8)
        const r = id - 8*s
        return [r, s]
    }
}

export function getCardName (rs) {
    return rankNames[rs[0]] + ' of ' + suitNames[rs[1]]
}

export const moves = {
    playCard: [...Array(33).keys()],
    pickRank: [...Array(9).keys()].map(i => i + 33),
    pickSuit: [...Array(4).keys()].map(i => i + 42),
    raisePoints: 46,
    foldHand: 47,
    acceptRaise: 48,
    foldHandAndShowValidRaise: 49
}

export const rankNames = ['7', '8', '9', '10', 'Unter', 'Ober', 'Koenig', 'Ass', 'Weli', '-']

export const suitNames = ['laab', 'herz', 'oachl', 'schell', '-']

export const isRechte = (r, s, rank, suit) => {
    return ((r === 8 && rank === 8) || (r === rank && s === suit))
}

export const isBlinde = (r, rank) => {
    return r === rank
}

export const isTrumpf = (r, s, rank, suit) => {
    if (isRechte(r, s, rank, suit)) {
        return false
    } else {
        return (s === suit)
    }
}

export const isRankHigher = (r1, r2) => {
    if (r1 === 8) {
        return false
    } else if (r2 === 8) {
        return true
    } else {
        return r1 > r2
    }
}

// returns true if the first card wins over the second
// firstPlayed should be the card already on the table
export const compareCards = (firstPlayed, secondPlayed, rank, suit) => {
    const fRS = getRankAndSuit(firstPlayed)
    const sRS = getRankAndSuit(secondPlayed)

    if (isRechte(fRS[0], fRS[1], rank, suit)) {
        return true
    } else if (isRechte(sRS[0], sRS[1], rank, suit)) {
        return false
    } else if (isBlinde(fRS[0], rank)) {
        return true
    } else if (isBlinde(sRS[0], rank)){
        return false
    } else if (isTrumpf(fRS[0], fRS[1], rank, suit)){
        if (isTrumpf(sRS[0], sRS[1], rank, suit)) {
            return isRankHigher(fRS[0], sRS[0])
        } else {
            return true
        }
    } else if (sRS[1] === suit) {
        return false
    } else if (fRS[1] !== sRS[1]) {
        return true
    } else {
        return isRankHigher(fRS[0], sRS[0])
    }
}



