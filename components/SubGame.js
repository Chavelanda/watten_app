import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {getCardName, getRankAndSuit, shuffleArray} from "../utils";
import {Button} from "react-native-elements";
import Move from "./Move";

const debug=false

export default function SubGame({initGamePrize, gameNumber}) {

    const [currentPlayer, setCurrentPlayer] = useState(1)
    const [distributingCardPlayer, setDistributingCardPlayer] = useState(-1)
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

    const prepareTurn = () => {
        if (currentPlayer === -1) {
            doAITurn()
        } else {
            console.log('preparing turn')
        }
    }

    const doAITurn = () => {
        console.log('doing AI turn')
    }

    // Used to initialize the game
    useEffect(() => {
        initSubGame()
        prepareTurn()
    }, [gameNumber])

    const printDebug = () =>{
        console.log('Deck: ' + deck)
        console.log('Player A hand: ' + handPlayerA)
        console.log('Player B hand: ' + handPlayerB)
        console.log('Played cards: ' + playedCards)
        console.log('Score A: ' + scorePlayerA)
        console.log('Score B: ' + scorePlayerB)
        console.log('Last move raise? ' + isLastMoveRaise)
        console.log('Last move accepted raise? ' + isLastMoveAcceptedRaise)
        console.log('Last hand raise valid?' + isLastHandRaiseValid)
        console.log('First Card: ' + firstCardDeck + '; Last Card: '+ lastCardDeck)
        console.log('Rank: ' + rank + '; Suit: ' + suit)
        console.log('Game prize: ' + gamePrize)
        console.log('Game Number: ' + gameNumber)
        console.log('CurrentPlayer: ' + currentPlayer)
        console.log('Distributing card: ' + distributingCardPlayer)
    }

    const mapCards = ({item}) => (
        <Move key={item} actionName={getCardName(getRankAndSuit(item))} actionId={item}/>
)

    return (
        <View style={styles.container}>
            {debug ? printDebug() : null}
            <View style={styles.upperContainer}>
                <View style={styles.infoContainer}>
                    <Text>You {scorePlayerA}</Text>
                    <Text>AI {scorePlayerB}</Text>
                    <Text>Prize {gamePrize}</Text>
                    <Text>First Card {getCardName(getRankAndSuit(firstCardDeck))}</Text>
                    {distributingCardPlayer === 1 ? <Text>Last Card {getCardName(getRankAndSuit(lastCardDeck))}</Text> : null}
                    {rank ? <Text>Rank {rank}</Text> : null}
                    {suit ? <Text>Suit {suit}</Text>: null}
                </View>
                <View style={styles.playedCardContainer}>
                    {playedCards.length % 2 === 1 ? (
                        <View style={styles.playedCardContainer}>
                            <Text>Card on the table</Text>
                            {mapCards({item: playedCards.slice(-1)[0]})}
                        </View>
                        ) : null
                    }
                    {isLastMoveRaise && currentPlayer === 1 ? <Text>AI raised!</Text> : null}
                </View>
                <View style={styles.raiseContainer}>
                    <Button title='Raise Prize' onPress={() => console.log('raise')} type='outline' raised/>
                    <Button title='Accept Raise' onPress={() => console.log('accept raise')} type='outline' raised/>
                    <Button title='Fold Hand' onPress={() => console.log('fold hand')} type='outline' raised/>
                    <Button title='Show valid raise' onPress={() => console.log('fold hand and show valid raise')} type='outline' raised/>
                </View>
            </View>
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
        justifyContent: 'space-around',
        marginLeft: 10,
    },
    playedCardContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    raiseContainer: {
        flex: 1,
        marginRight: 10,
        alignItems: 'flex-end',
        justifyContent: 'space-around'
    },
    cardsContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white'
    },
})

