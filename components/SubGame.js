import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {getRankAndSuit, shuffleArray} from "../utils";
import Move from "./Move";

export default function SubGame({initGamePrize, gameNumber}) {

    const [deck, setDeck] = useState([]);
    const [handPlayerA, setHandPlayerA] = useState([])
    const [handPlayerB, setHandPlayerB] = useState([])
    const [playedCards, setPlayedCards] = useState([])
    const [scorePlayerA, setScorePlayerA] = useState(0)
    const [scorePlayerB, setScorePlayerB] = useState(0)
    const [isLastMoveRaise, setIsLastMoveRaise] = useState(false)
    const [isLastMoveAcceptedRaise, setIsLastMoveAcceptedRaise] = useState(false)
    const [isLastHandRaiseValid, setIsLastHandRaiseValid] = useState(null)
    const [rank, setRank] = useState(null)
    const [suit, setSuit] = useState(null)
    const [gamePrize, setGamePrize] = useState(0)
    const [firstCardDeck, setFirstCardDeck] = useState(0)
    const [lastCardDeck, setLastCardDeck] = useState(0)

    const initSubGame = () => {
        const newDeck = shuffleArray([...Array(33).keys()])
        setHandPlayerA(newDeck.slice(-5))
        setHandPlayerB(newDeck.slice(-10, -5))
        setDeck(newDeck.slice(0, -10))
        setPlayedCards([])
        setScorePlayerA(0)
        setScorePlayerB(0)
        setIsLastMoveRaise(false)
        setIsLastMoveAcceptedRaise(false)
        setIsLastHandRaiseValid(null)
        setFirstCardDeck(newDeck[0])
        setLastCardDeck(newDeck.slice(-11)[0])
        setRank(null)
        setSuit(null)
        setGamePrize(initGamePrize)
    }

    // Used to initialize the game
    useEffect(() => {
        initSubGame()
    }, [gameNumber])


    const mapDebug = (card) => (
        <Text key={card}>{card} - </Text>
    )

    const mapCards = ({item}) => {
        const rs = getRankAndSuit(item)

        const name = rankNames[rs[0]] + ' of ' + suitNames[rs[1]]

        return (
            <Move key={item} actionName={name} actionId={item}/>
        )
    }

    return (
        <View style={styles.container}>
            {false ? (<View style={styles.debug}>
                <Text>Deck: {deck.map(mapDebug)}</Text>
                <Text>Player A hand: {handPlayerA.map(mapDebug)}</Text>
                <Text>Player B hand: {handPlayerB.map(mapDebug)}</Text>
                <Text>Played cards: {playedCards}</Text>
                <Text>Score A: {scorePlayerA}</Text>
                <Text>Score B: {scorePlayerB}</Text>
                <Text>Last move raise? {isLastMoveRaise ? 'True' : 'False'}</Text>
                <Text>Last move accepted raise? {isLastMoveAcceptedRaise ? 'True' : 'False'}</Text>
                <Text>Last hand raise valid? {isLastHandRaiseValid ? 'True' : 'False'}</Text>
                <Text>First Card: {firstCardDeck}; Last Card: {lastCardDeck}</Text>
                <Text>Rank: {rank}; Suit: {suit}</Text>
                <Text>Game prize: {gamePrize}</Text>
                <Text>Game Number: {gameNumber}</Text>
            </View>) : null}
            <View style={styles.cardsContainer}>
                <FlatList
                    data={handPlayerA}
                    renderItem={mapCards}
                    keyExtractor={card => card.toString()}
                    horizontal={true}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    debug: {
        flex: 1,
    },
    upperContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    infoContainer: {
        flex: 1,
    },
    playedCardContainer: {
        flex: 2,
    },
    raiseContainer: {
        flex: 1,
    },
    cardsContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white'
    },
})

const moves = {
    playCard: [...Array(33).keys()],
    pickRank: [...Array(9).keys()].map(i => i + 33),
    pickSuit: [...Array(4).keys()].map(i => i + 42),
    raisePoints: 46,
    foldHand: 47,
    acceptRaise: 48,
    foldHandAndShowValidRaise: 49
}

const rankNames = ['7', '8', '9', '10', 'Unter', 'Ober', 'Koenig', 'Ass', 'Weli', '-']

const suitNames = ['laab', 'herz', 'oachl', 'schell', '-']
