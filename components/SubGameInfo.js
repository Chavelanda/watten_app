import React from "react";
import {Text, View, StyleSheet} from "react-native";
import {getCardName, getRankAndSuit, rankNames, suitNames} from "../utils";

export default function SubGameInfo (props) {

    return (
        <View style={styles.container}>
            <Text>You {props.scorePlayerA}</Text>
            <Text>AI {props.scorePlayerB}</Text>
            <Text>Prize {props.gamePrize}</Text>
            <Text>First Card {getCardName(getRankAndSuit(props.firstCardDeck))}</Text>
            {props.distributingCardPlayer === 1 ? <Text>Last Card {getCardName(getRankAndSuit(props.lastCardDeck))}</Text> : null}
            {props.rank ? <Text>Rank {rankNames[props.rank]}</Text> : null}
            {props.suit ? <Text>Suit {suitNames[props.suit]}</Text>: null}
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        marginLeft: 10,
    }
})
