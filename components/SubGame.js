import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {
    getCardName,
    getRankAndSuit,
    rankNames,
    shuffleArray,
    suitNames,
    isTrumpf,
    compareCards
} from "../utils";
import {Button} from "react-native-elements";
import WattenCard from "./WattenCard";
import SubGameInfo from "./SubGameInfo";
import RankSuitChoice from "./RankSuitChoice";
import {getMove} from "../api/api";

const debug=false

export default function SubGame({initGamePrize, gameNumber, onSubGameEnd, checkRaiseMakesSense}) {

    //like distributing card player
    const [humanStarting, setHumanStarting] = useState(false)
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
    const [validMoves, setValidMoves] = useState([...Array(39).fill(false)])
    // like current player
    const [turn, setTurn] = useState({number: 0, nextTurnAI: false})


    // Used to initialize the game
    useEffect(() => {
        const hStarts = initSubGame()
        setTurn({number: 1, nextTurnAI: !hStarts})
    }, [gameNumber])

    // At each new turn
    useEffect(() => {
        prepareTurn()
    }, [turn])

    const initSubGame = () => {
        const hStarts = !humanStarting
        setHumanStarting(!humanStarting)
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
        return hStarts
    }

    const prepareTurn = () => {
        if (turn.nextTurnAI) {
            setValidMoves([...Array(38).fill(false)])
            doAITurn()
        } else {
            setValidMoves(getValidMoves())
        }
    }

    const getValidMoves = (human = true) => {
        const hand = human ? handPlayerA : handPlayerB
        const valid = [...Array(39).fill(false)]

        if (isLastMoveRaise && (!isLastMoveAcceptedRaise)){
            valid[36] = true
            valid[37] = true
            if (isLastHandRaiseValid !== null) {
                valid[38] = true
            }
        } else if (rank === null) {
            valid[33] = true
        } else if (suit === null){
            valid[34] = true
        } else if (playedCards.length % 2 === 0) {
            hand.forEach((val) => valid[val] = true)
        } else {
            const playedRS = getRankAndSuit(playedCards.slice(-1)[0])
            hand.forEach((id) => canPlayCard(id, playedRS) ? valid[id] = true : valid[id] = false)
            if (valid.reduce((acc, val) => val ? acc + 1 : acc, 0) === 1) {
                const id = valid.indexOf(true)
                const rs = getRankAndSuit(id)
                if (rs[0] === rank && rs[1] === suit) {
                    hand.forEach((val) => valid[val] = true)
                }
            } else if (valid.reduce((acc, val) => val ? acc + 1 : acc, 0) === 0){
                hand.forEach((val) => valid[val] = true)
            }
        }
        valid[35] = checkRaiseAllowed(human)
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

    const checkRaiseAllowed = (human) => {
        return (!isLastMoveRaise && !isLastMoveAcceptedRaise && isLastHandRaiseValid === null && checkRaiseMakesSense(human, gamePrize))
    }

    const doAITurn = () => {
        !turn.nextTurnAI ? console.warn("It is impossible to have AI playing" +
            "the turn with nextTurnAI = false") : null
        const move = getMove(0, [], getValidMoves(false))
        if (move < 33) {
            playCard(move, false)
        } else if (move < 42) {
            onRankChosen(move - 33, false)
        } else if (move < 46) {
            onSuitChosen(move - 42, false)
        } else if (move === 46) {
            onRaise(false)
        } else if (move === 47) {
            onFold(false)
        } else if (move === 48) {
            onAcceptRaise(false)
        } else if (move === 49) {
            onFold(false)
        } else {
            console.warn("AI move does not exists")
        }
    }

    const printDebug = () =>{
        console.log('Human Starting: ' + humanStarting)
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
        console.log('Turn: ' + turn.number + ' Next AI: ' + turn.nextTurnAI)
        console.log('Valid moves: ' + validMoves)
    }

    const mapCards = ({item}) => (
        <WattenCard key={item} actionName={getCardName(getRankAndSuit(item))} actionId={item} isValid={validMoves[item]} onCardPressed={playCard}/>
    )

    const onRankChosen = (rank, nextAI=true) => {
        setIsLastMoveRaise(false)
        setIsLastMoveAcceptedRaise(false)
        setRank(rank)
        setChooseRank(false)
        setTurn({number: turn.number+1, nextTurnAI: nextAI})
    }

    const onSuitChosen = (suit, nextAI=true) => {
        setIsLastMoveRaise(false)
        setIsLastMoveAcceptedRaise(false)
        setSuit(suit)
        setChooseSuit(false)
        setTurn({number: turn.number+1, nextTurnAI: nextAI})
    }

    const onRaise = (nextAI=true) => {
        setIsLastMoveRaise(true)
        if (playedCards.length >= 8) {
            setIsLastHandRaiseValid(checkLastHandRaiseValid(nextAI))
        }
        setGamePrize(gamePrize+1)
        setTurn({number: turn.number+1, nextTurnAI: nextAI})
    }

    const checkLastHandRaiseValid = (isPlayerA) => {
        const lastCard = isPlayerA ? handPlayerA[0] : handPlayerB[0]
        const lastCardRS = getRankAndSuit(lastCard)
        if (isTrumpf(lastCardRS[0], lastCardRS[1], rank, suit)) {
            return true
        } else if (playedCards.length === 9) {
            const lastPlayedCard = playedCards.slice(-1)[0]
            const lpcRS = getRankAndSuit(lastPlayedCard)
            return lastCardRS[1] === lpcRS[1] || (!compareCards(lastPlayedCard, lastCard, rank, suit));
        } else {
            return false
        }
    }

    const onAcceptRaise = (nextAI=true) => {
        setIsLastMoveAcceptedRaise(true)
        setIsLastMoveRaise(false)
        setTurn({number: turn.number+1, nextTurnAI: nextAI})
    }

    const onFold = (nextAI=true) => {
        const score = gamePrize - 1
        isLastHandRaiseValid === null || isLastHandRaiseValid ?
            onSubGameEnd(!nextAI, score) :
            onSubGameEnd(nextAI, score)
    }

    const playCard = (card, nextAI=true) => {
        setIsLastMoveRaise(false)
        setIsLastMoveAcceptedRaise(false)
        if (nextAI) {
            const newHand = [...handPlayerA]
            newHand.splice(handPlayerA.indexOf(card), 1)
            setHandPlayerA(newHand)
        } else {
            const newHand = [...handPlayerB]
            newHand.splice(handPlayerB.indexOf(card), 1)
            setHandPlayerB(newHand)
        }

        if(isLastHandRaiseValid !== null && !isLastHandRaiseValid) {
            onSubGameEnd(!nextAI, gamePrize)
        } else {
            if (playedCards.length % 2 === 0) {
                const newPlayedCards = [...playedCards]
                newPlayedCards.push(card)
                setPlayedCards(newPlayedCards)
                setTurn({number: turn.number+1, nextTurnAI: nextAI})
            } else {
                const lastPlayedCard = playedCards.slice(-1)[0]
                const newPlayedCards = [...playedCards]
                newPlayedCards.push(card)
                setPlayedCards(newPlayedCards)
                const currentPlayerWins = !compareCards(lastPlayedCard, card, rank, suit)
                if (currentPlayerWins) {
                    nextAI ? setScorePlayerA(scorePlayerA+1) : setScorePlayerB(scorePlayerB+1)
                } else {
                    !nextAI ? setScorePlayerA(scorePlayerA+1) : setScorePlayerB(scorePlayerB+1)
                }

            }
        }

    }
    // check if sub game ends when score changes
    useEffect(() => {
        if (scorePlayerA !== 0) {
            if (scorePlayerA >= 3) {
                onSubGameEnd(true, gamePrize)
            } else {
                setTurn({number: turn.number+1, nextTurnAI: false})
            }
        }
    }, [scorePlayerA])

    useEffect(() => {
        if (scorePlayerB !== 0) {
            if (scorePlayerB >= 3) {
                onSubGameEnd(false, gamePrize)
            } else {
                setTurn({number: turn.number+1, nextTurnAI: true})
            }
        }
    }, [scorePlayerB])

    return (
        <View style={styles.container}>
            {debug ? printDebug() : null}
            <View style={styles.upperContainer}>
                <View style={styles.infoContainer}>
                    <SubGameInfo scorePlayerA={scorePlayerA} scorePlayerB={scorePlayerB} gamePrize={gamePrize} firstCardDeck={firstCardDeck}
                        humanStarting={humanStarting} lastCardDeck={lastCardDeck} rank={rank} suit={suit}/>
                </View>
                <View style={styles.playedCardContainer}>
                    {playedCards.length % 2 === 1 ? (
                        <View style={styles.playedCardContainer}>
                            <Text>Card on the table</Text>
                            <WattenCard actionId={playedCards.slice(-1)[0]} actionName={getCardName(getRankAndSuit(playedCards.slice(-1)[0]))} valid={false} onCardPressed={null}/>
                        </View>
                        ) : null
                    }
                    {isLastMoveRaise && turn.nextTurnAI === false ? <Text>AI raised!</Text> : null}
                </View>
                <View style={styles.buttonsContainer}>
                    {validMoves[35] ? <Button title='Raise Prize' onPress={() => onRaise()} type='outline' raised/> : null}
                    {validMoves[37] ? <Button title='Accept Raise' onPress={() => onAcceptRaise()} type='outline' raised/> : null}
                    {validMoves[36] ? <Button title='Fold Hand' onPress={() => onFold()} type='outline' raised/> : null}
                    {validMoves[38] ? <Button title='Show valid raise' onPress={() => onFold()}
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

