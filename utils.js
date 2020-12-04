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
