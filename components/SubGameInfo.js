import React from "react";
import {Text, View, StyleSheet} from "react-native";
import {getCardName, getRankAndSuit, rankNames, suitNames} from "../utils";
import {Button} from "react-native-elements";

export default function SubGameInfo (props) {

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.text}>First Card</Text>
                <Text style={styles.text}>{getCardName(getRankAndSuit(props.firstCardDeck))}</Text>
            </View>
            {!props.humanStarting  ?
                <View style={styles.box}>
                    <Text style={styles.text}>Last Card</Text>
                    <Text style={styles.text}>{getCardName(getRankAndSuit(props.lastCardDeck))}</Text>
                </View> : null}
            {props.rank !== null ?
                <View style={styles.box}>
                    <Text style={styles.text}>Rank {rankNames[props.rank]}</Text>
                </View> : null}
            {props.suit !== null ?
                <View style={styles.box}>
                    <Text style={styles.text}>Suit {suitNames[props.suit]}</Text>
                </View> : null}
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        marginLeft: 10,
    },
    box: {
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 5,
        paddingVertical: 5,
    },
    text: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 11,
    }
})
