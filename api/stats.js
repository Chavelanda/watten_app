const ADDRESS = 'http://watten-ai.herokuapp.com/stats/';

export const updateStatsInServer = async (generation, won) => {

    let response = await fetch(ADDRESS + 'insert', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            generation: generation,
            won: won
        })
    })

    const json = await response.json()
    console.log(json)
}

export const getStatsFromServer = async (generation) => {

    console.log(generation)
    const response = await fetch(ADDRESS + '/' + generation)

    const json = await response.json()
    console.log(json)

    return json
}
