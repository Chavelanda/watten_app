import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {getCardName, getRankAndSuit, rankNames, shuffleArray, suitNames} from "../utils";
import {Button} from "react-native-elements";
import WattenCard from "./WattenCard";
import SubGameInfo from "./SubGameInfo";
import RankSuitChoice from "./RankSuitChoice";

const debug=false

export default function SubGame({initGamePrize, gameNumber}) {

    const [humanStarting, setHumanStarting] = useState(true)
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
    const [chooseRank, setChooseRank] = useState(false)
    const [suit, setSuit] = useState(null)
    const [chooseSuit, setChooseSuit] = useState(false)
    const [gamePrize, setGamePrize] = useState(0)
    const [firstCardDeck, setFirstCardDeck] = useState(0)
    const [lastCardDeck, setLastCardDeck] = useState(0)
    // 0-33 for each card, 33 rank, 34 suit, 35 raise, 36 fold, 37 accept raise, 38 fold and show valid raise
    const [validMoves, setValidMoves] = useState([...Array(38).fill(false)])

    // Used to initialize the game
    useEffect(() => {
        initSubGame()
        prepareTurn(!humanStarting)
    }, [gameNumber])

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

    const prepareTurn = (aiTurn) => {
        if (aiTurn) {
            setValidMoves([...Array(38).fill(false)])
            doAITurn()
        } else {
            setValidMoves(getValidMoves())
        }
    }

    const getValidMoves = () => {
        const valid = [...Array(38).fill(0)]

        if (isLastMoveRaise && (!isLastMoveAcceptedRaise)){
            valid[36] = true
            valid[37] = true
            if (isLastHandRaiseValid !== null) {
                valid[38] = true
            }
        } else if (rank === null) {
            valid[33] = true
            valid[35] = true
        } else if (suit === null){
            valid[34] = true
            valid[35] = true
        } else if (playedCards.length % 2 === 0) {
            handPlayerA.forEach((val) => valid[val] = true)
            valid[35] = true
        } else {
            const playedRS = getRankAndSuit(playedCards.slice(-1)[0])
            handPlayerA.forEach((id) => canPlayCard(id, playedRS) ? valid[id] = true : valid[id] = false)
            if (valid.reduce((acc, val) => val ? acc + 1 : acc) === 1) {
                const id = valid.indexOf(true)
                const rs = getRankAndSuit(id)
                if (rs[0] === rank && rs[1] === suit) {
                    handPlayerA.forEach((val) => valid[val] = true)
                }
            } else if (valid.reduce((acc, val) => val ? acc + 1 : acc) === 0){
                handPlayerA.forEach((val) => valid[val] = true)
            }
            valid[35] = true
        }
        console.log(valid)
        return valid
    }

    const canPlayCard = (id, pRS) => {
        const cRS = getRankAndSuit(id)
        if (pRS[1] === suit && cRS[1] === pRS[1]){
            return true
        } else if (cRS[0] === rank){
            return true
        } else return pRS[1] !== suit;
    }

    const doAITurn = () => {
        console.log('doing AI turn')
    }

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
        <WattenCard key={item} actionName={getCardName(getRankAndSuit(item))} actionId={item} isValid={validMoves[item]}/>
    )

    const onRankChosen = (rank, nextTurnAi=true) => {
        setRank(rank)
        setChooseRank(false)
        prepareTurn(nextTurnAi)
    }

    const onSuitChosen = (suit, nextTurnAi=true) => {
        setSuit(suit)
        setChooseSuit(false)
        prepareTurn(nextTurnAi)
    }

    const onRaise = (nextTurnAi=true) => {
        setIsLastMoveRaise(true)
        if (playedCards.length >= 8) {
            setIsLastHandRaiseValid(checkLastHandRaiseValid(nextTurnAi))
        }
        setGamePrize(gamePrize+1)
        prepareTurn(nextTurnAi)
    }

    const onAcceptRaise = (nextTurnAI=true) => {
        setIsLastMoveAcceptedRaise(true)
        setIsLastMoveRaise(false)
        prepareTurn(nextTurnAI)
    }

    const checkLastHandRaiseValid = (isPlayerA) => {
        const lastCard = isPlayerA ? handPlayerA[0] : handPlayerB[0]
        const lastCardRS = getRankAndSuit(lastCard)
        if (isTrumpf(lastCardRS[0], lastCardRS[1])) {
            return true
        } else if (playedCards.length === 9) {
            const lastPlayedCard = playedCards.slice(-1)[0]
            const lpcRS = getRankAndSuit(lastPlayedCard)
            return lastCardRS[1] === lpcRS[1] || (!compareCards(lastPlayedCard, lastCard));
        } else {
            return false
        }
    }

    const isRechte = (r, s) => {
        return ((r === 8 && rank === 8) || (r === rank && s === suit))
    }

    const isBlinde = (r) => {
        return r === rank
    }

    const isTrumpf = (r, s) => {
        if (isRechte(r, s)) {
            return false
        } else {
            return (s === suit)
        }
    }

    // returns true if the first card wins over the second
    // firstPlayed should be the card already on the table
    const compareCards = (firstPlayed, secondPlayed) => {
        const fRS = getRankAndSuit(firstPlayed)
        const sRS = getRankAndSuit(secondPlayed)

        if (isRechte(fRS[0], fRS[1])) {
            return true
        } else if (isRechte(sRS[0], sRS[1])) {
            return false
        } else if (isBlinde(fRS[0])) {
            return true
        } else if (isBlinde(sRS[0])){
            return false
        } else if (isTrumpf(fRS[0], fRS[1])){
            if (isTrumpf(sRS[0], sRS[1])) {
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

    const isRankHigher = (r1, r2) => {
        if (r1 === 8) {
            return false
        } else if (r2 === 8) {
            return true
        } else {
            return r1 > r2
        }
    }

    return (
        <View style={styles.container}>
            {debug ? printDebug() : null}
            <View style={styles.upperContainer}>
                <View style={styles.infoContainer}>
                    <SubGameInfo scorePlayerA={scorePlayerA} scorePlayerB={scorePlayerB} gamePrize={gamePrize} firstCardDeck={firstCardDeck}
                        distributingCardPlayer={distributingCardPlayer} lastCardDeck={lastCardDeck} rank={rank} suit={suit}/>
                </View>
                <View style={styles.playedCardContainer}>
                    {playedCards.length % 2 === 1 ? (
                        <View style={styles.playedCardContainer}>
                            <Text>Card on the table</Text>
                            {mapCards({item: playedCards.slice(-1)[0]})}
                        </View>
                        ) : null
                    }
                    {isLastMoveRaise ? <Text>Raised!</Text> : null}
                </View>
                <View style={styles.buttonsContainer}>
                    {validMoves[35] ? <Button title='Raise Prize' onPress={() => onRaise()} type='outline' raised/> : null}
                    {validMoves[37] ? <Button title='Accept Raise' onPress={() => onAcceptRaise()} type='outline' raised/> : null}
                    {validMoves[36] ? <Button title='Fold Hand' onPress={() => console.log('fold hand')} type='outline' raised/> : null}
                    {validMoves[38] ? <Button title='Show valid raise' onPress={() => console.log('fold hand and show valid raise')}
                             type='outline' raised/> : null}
                    {validMoves[33] ? <Button title='Select Rank' onPress={() => setChooseRank(true)} type='outline' raised/> : null}
                    {validMoves[34] ? <Button title='Select Suit' onPress={() => setChooseSuit(true)} type='outline' raised/> : null}
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

            <RankSuitChoice visible={chooseRank} setVisible={setChooseRank} title='Choose Rank' list={rankNames.slice(0,-1)} action={onRankChosen}/>
            <RankSuitChoice visible={chooseSuit} setVisible={setChooseSuit} title='Choose Suit' list={suitNames.slice(0,-1)} action={onSuitChosen}/>
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
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    buttonsContainer: {
        flex: 1,
        marginRight: 10,
        alignItems: 'flex-end',
        justifyContent: 'space-around'
    },
    cardsContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white'
    }
})

