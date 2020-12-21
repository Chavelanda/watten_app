const ADDRESS = 'http://192.168.1.228:5000/stats/';

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


    const response = await fetch(ADDRESS + 'get?gen=' + generation)

    const json = await response.json()
    console.log(json)

    return json
}
