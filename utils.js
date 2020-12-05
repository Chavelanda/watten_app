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

