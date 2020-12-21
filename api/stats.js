const ADDRESS = 'http://192.168.1.228:5000/stats/';

export const updateStatsInServer = async (generation, won) => {
    console.log('Updating stats')
    console.log(generation + ' ' + won)
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
