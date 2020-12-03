import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {shuffleArray} from "../utils";

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

    //used to initialize the game
    useEffect(() => {
        initSubGame()
    }, [gameNumber])


    const mapCards = (card) => (
        <Text key={card}>{card} - </Text>
    )

    return (
        <View style={styles.container}>
            <Text>Deck: {deck.map(mapCards)}</Text>
            <Text>Player A hand: {handPlayerA.map(mapCards)}</Text>
            <Text>Player B hand: {handPlayerB.map(mapCards)}</Text>
            <Text>Played cards: {playedCards}</Text>
            <Text>Score A: {scorePlayerA}</Text>
            <Text>Score B: {scorePlayerB}</Text>
            <Text>Last move raise? {isLastMoveRaise ? 'True' : 'False'}</Text>
            <Text>Last move accepted raise? {isLastMoveAcceptedRaise ? 'True' : 'False'}</Text>
            <Text>Last hand raise valid? {isLastHandRaiseValid ? 'True' : 'False'}</Text>
            <Text>First Card: {firstCardDeck}</Text>
            <Text>Last Card: {lastCardDeck}</Text>
            <Text>Rank: {rank}</Text>
            <Text>Suit: {suit}</Text>
            <Text>Game prize: {gamePrize}</Text>
            <Text>Game Number: {gameNumber}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})
