import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {
    getCardName,
    getRankAndSuit,
    rankNames,
    shuffleArray,
    suitNames,
    isTrumpf,
    isRechte,
    isGuate,
    compareCards
} from "../utils/utils";
import {Button} from "react-native-elements";
import WattenCard from "./WattenCard";
import SubGameInfo from "./SubGameInfo";
import MyPicker from "./MyPicker";
import {getMove} from "../api/moves";
import Hand from "./Hand";
import Table from "./Table";

const debug=false

export default function SubGame({gen, initGamePrize, gameNumber, onSubGameEnd, checkRaiseMakesSense, scoreA, scoreB}) {

    //like distributing card player
    const [humanStarting, setHumanStarting] = useState(false)
    const [deck, setDeck] = useState([]);
    const [handPlayerA, setHandPlayerA] = useState([])
    const [handPlayerB, setHandPlayerB] = useState([])
    const [playedCards, setPlayedCards] = useState([])
    const [scorePlayerA, setScorePlayerA] = useState(0)
    const [scorePlayerB, setScorePlayerB] = useState(0)
    const [lastAcceptedRaiseIsHuman, setLastAcceptedRaiseIsHuman] = useState(null)
    const [isLastMoveRaise, setIsLastMoveRaise] = useState(false)
    const [isLastMoveAcceptedRaise, setIsLastMoveAcceptedRaise] = useState(false)
    const [isLastHandRaiseValid, setIsLastHandRaiseValid] = useState(null)
    const [humanStartedRaising, setHumanStartedRaising] = useState(null)
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
    useEffect( () => {
        async function atNewTurn() {
            await prepareTurn()
        }
        let timer = null
        // timer to leave time for game animation
        if (turn.nextTurnAI && playedCards.length > 1 && playedCards.length % 2 === 0) {
            timer = setTimeout(() => atNewTurn(), 1500)
        } else {
            timer = setTimeout(() => atNewTurn(), 0)
        }

        return () => {
            clearTimeout(timer)
        }
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
        setHumanStartedRaising(null)
        setLastAcceptedRaiseIsHuman(null)
        setFirstCardDeck(newDeck[0])
        setLastCardDeck(newDeck.slice(-11)[0])
        setRank(null)
        setSuit(null)
        setGamePrize(initGamePrize)
        return hStarts
    }

    const prepareTurn = async () => {
        if (turn.nextTurnAI) {
            setValidMoves([...Array(38).fill(false)])
            await doAITurn()
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

            //If it can play two cards: the rechte and the guate
            if (valid.reduce((acc, val) => val ? acc + 1 : acc, 0) === 2) {
                const id1 = valid.indexOf(true)
                const id2 = valid.indexOf(true, id1 + 1)
                const rs1 = getRankAndSuit(id1)
                const rs2 = getRankAndSuit(id2)
                if ((isRechte(rs1[0], rs1[1], rank, suit) && isGuate(rs2[0], rs2[1], rank, suit)) ||
                    (isRechte(rs2[0], rs2[1], rank, suit) && isGuate(rs1[0], rs1[1], rank, suit))) {
                    hand.forEach((val) => valid[val] = true)
                }
            }
            // If it can play only one card and the card is rechte or guate
            if (valid.reduce((acc, val) => val ? acc + 1 : acc, 0) === 1) {
                const id = valid.indexOf(true)
                const rs = getRankAndSuit(id)
                if (isRechte(rs[0], rs[1], rank, suit) || isGuate(rs[0], rs[1], rank, suit)) {
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
        return (rank !== null && suit !== null && isLastHandRaiseValid === null && checkRaiseMakesSense(human, gamePrize) &&
        (isLastMoveRaise || lastAcceptedRaiseIsHuman === null || lastAcceptedRaiseIsHuman === human ))
    }

    // TODO: check correctness of state
    const doAITurn = async () => {
        !turn.nextTurnAI ? console.warn("It is impossible to have AI playing" +
            "the turn with nextTurnAI = false") : null
        const state = {
            humanStarting: humanStarting,
            scoreA: scoreA,
            scoreB: scoreB,
            handA: handPlayerA,
            handB: handPlayerB,
            playedCards: playedCards,
            currentScoreA: scorePlayerA,
            currentScoreB: scorePlayerB,
            prize: gamePrize,
            isLastMoveRaise: isLastMoveRaise,
            isLastMoveAcceptedRaise: isLastMoveAcceptedRaise,
            isLastHandRaiseValid: isLastHandRaiseValid,
            firstCard: firstCardDeck,
            lastCard: lastCardDeck,
            rank: rank,
            suit: suit,
            humanStartedRaising: humanStartedRaising,
            lastAcceptedRaiseIsHuman: lastAcceptedRaiseIsHuman
        }

        const move = await getMove(gen, state, getValidMoves(false))
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
        console.log('Human hand: ' + handPlayerA)
        console.log('AI hand: ' + handPlayerB)
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
        console.log('Can Raise? ' + validMoves[35])
        console.log('\n---------------------------------------\n')
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
        if (isLastMoveRaise === false) {
            setHumanStartedRaising(nextAI)
        }
        setIsLastMoveAcceptedRaise(false)
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
        setLastAcceptedRaiseIsHuman(nextAI)
        setIsLastMoveRaise(false)
        setTurn({number: turn.number+1, nextTurnAI: !humanStartedRaising})
    }

    const onFold = (nextAI=true) => {
        const score = gamePrize - 1
        if (isLastHandRaiseValid === null || isLastHandRaiseValid) {
            const message = nextAI ? '' : 'Karl folded!'
            onSubGameEnd(!nextAI, score, message)
        } else {
            const message = nextAI ? 'Karl could not raise in last hand' : 'You could not raise in last hand'
            onSubGameEnd(nextAI, score)
        }
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
            const message = nextAI ? 'You couldn\'t raise in last turn.' : 'Karl couldn\'t raise in last turn'
            onSubGameEnd(!nextAI, gamePrize, message)
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
            <View style={styles.scoreContainer}>
                <Text style={styles.handText}>HAND {scorePlayerA}</Text>
                <Text style={styles.handText}>PRIZE {gamePrize}</Text>
                <Text style={styles.handText}>HAND {scorePlayerB}</Text>
            </View>
            <View style={styles.upperContainer}>
                <View style={styles.infoContainer}>
                    <SubGameInfo scorePlayerA={scorePlayerA} scorePlayerB={scorePlayerB} gamePrize={gamePrize} firstCardDeck={firstCardDeck}
                        humanStarting={humanStarting} lastCardDeck={lastCardDeck} rank={rank} suit={suit}/>
                </View>
                <View style={styles.playedCardContainer}>
                    <Table isLastMoveRaise={isLastMoveRaise} isLastMoveAcceptedRaise={isLastMoveAcceptedRaise} playedCards={playedCards} turn={turn} humanStartedRaising={humanStartedRaising}/>
                </View>
                <View style={styles.buttonsContainer}>
                    {validMoves[35] ? <Button buttonStyle={styles.buttonStyle} title='Raise Prize' onPress={() => onRaise()} type='outline' raised titleStyle={styles.buttonTitleStyle}/> : null}
                    {validMoves[37] ? <Button buttonStyle={styles.buttonStyle} title='Accept Raise' onPress={() => onAcceptRaise()} type='outline' raised titleStyle={styles.buttonTitleStyle}/> : null}
                    {validMoves[36] ? <Button buttonStyle={styles.buttonStyle} title='Fold Hand' onPress={() => onFold()} type='outline' raised titleStyle={styles.buttonTitleStyle}/> : null}
                    {validMoves[33] ? <Button buttonStyle={styles.buttonStyle} title='Select Rank' onPress={() => setChooseRank(true)} type='outline' raised titleStyle={styles.buttonTitleStyle}/> : null}
                    {validMoves[34] ? <Button buttonStyle={styles.buttonStyle} title='Select Suit' onPress={() => setChooseSuit(true)} type='outline' raised titleStyle={styles.buttonTitleStyle}/> : null}
                </View>
            </View>
            <View style={styles.cardsContainer}>
                <Hand hand={handPlayerA} validMoves={validMoves} onPlay={playCard} />
            </View>

            <MyPicker visible={chooseRank} setVisible={setChooseRank} title='Choose Rank' list={rankNames.slice(0,-1)} action={onRankChosen}/>
            <MyPicker visible={chooseSuit} setVisible={setChooseSuit} title='Choose Suit' list={suitNames.slice(0,-1)} action={onSuitChosen}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    debug: {
        flex: 1,
    },
    scoreContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    handText: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 12,
    },
    upperContainer: {
        flex: 8,
        flexDirection: 'row'
    },
    infoContainer: {
        flex: 1,
    },
    playedCardContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonsContainer: {
        flex: 1,
        marginRight: 10,
        alignItems: 'flex-end',
        justifyContent: 'space-around'
    },
    buttonStyle: {
        borderColor: 'black'
    },
    buttonTitleStyle: {
        color: 'black',
    },
    cardsContainer: {
        flex: 8,
        flexDirection: 'row',
    }
})

