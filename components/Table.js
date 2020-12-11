import React, {useEffect, useRef, useState} from "react";
import {Text, View, StyleSheet, Animated} from "react-native";
import WattenCard from "./WattenCard";

export default function Table ({playedCards, isLastMoveRaise, turn}) {

    const translateValue = useRef(new Animated.Value(0)).current
    const [cardChanged, setCardChanged] = useState(false)

    const translate = () => {
        const arrival = turn.nextTurnAI ? -5000 : 5000

        if (cardChanged){
            setCardChanged(false)
            Animated.timing(translateValue, {
                toValue: arrival,
                duration: 1000,
                useNativeDriver: false
            }).start()
        }
    }

    useEffect(() => {
        const timer = setTimeout(() =>translate(), 1000)

        return () => {
            clearTimeout(timer)
        }
    }, [turn])

    // so that the translation runs only when a card is played (not with raise)
    useEffect(()=>{
        setCardChanged(true)
        translateValue.setValue(0)
    }, [playedCards])

    return(
        <View style={styles.container}>
            {playedCards.length % 2 === 1 ? (
                <View style={styles.cardContainer}>
                    <WattenCard actionId={playedCards.slice(-1)[0]}  valid={false}/>
                </View>
            ) : playedCards.length > 1 ?
                <Animated.View style={[styles.cardContainerAnimated, {top: translateValue}]}>
                    <WattenCard style={[styles.card, {transform: [{rotateZ: '-15deg'}]}]} actionId={playedCards.slice(-2)[0]} valid={false}/>
                    <WattenCard style={[styles.card, {transform: [{rotateZ: '15deg'}]}]} actionId={playedCards.slice(-1)[0]} valid={false}/>
                </Animated.View> :
                null
            }
            {isLastMoveRaise && turn.nextTurnAI === false ?
                <View style={styles.textContainer}>
                    <Text style={styles.text}>KARL RAISED!</Text>
                </View>: null
            }
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    cardContainer: {
        flex: 5,
        alignItems: 'center'
    },
    cardContainerAnimated: {
        flex: 5,
        alignItems: 'center'
    },
    card: {
        position: 'absolute'
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: 'bold',
    }
})
