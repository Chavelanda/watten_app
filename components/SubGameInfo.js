import React from "react";
import {Text, View, StyleSheet} from "react-native";
import {getCardName, getRankAndSuit, rankNames, suitNames} from "../utils";
import {Button} from "react-native-elements";

export default function SubGameInfo (props) {

    return (
        <View style={styles.container}>
            <Button disabledStyle={styles.button} disabledTitleStyle={styles.text} disabled={true} title={'First Card\n' + getCardName(getRankAndSuit(props.firstCardDeck))}/>
            {!props.humanStarting  ? <Button disabledStyle={styles.button} disabledTitleStyle={styles.text} disabled={true} title={'Last Card\n' + getCardName(getRankAndSuit(props.lastCardDeck))}/> : null}
            {props.rank !== null ? <Button disabledStyle={styles.button} disabledTitleStyle={styles.text} disabled={true} title={'Rank ' + rankNames[props.rank]}/> : null}
            {props.suit !== null ? <Button disabledStyle={styles.button} disabledTitleStyle={styles.text} disabled={true} title={'Suit ' + suitNames[props.suit]}/>: null}
        </View>


    )
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        marginLeft: 10,
    },
    text: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 11
    },
    button: {
        backgroundColor: 'white',
    }
})
