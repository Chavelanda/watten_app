import React, {useState} from "react";
import {Card} from "react-native-elements";
import {TouchableHighlight, View, StyleSheet, Image} from "react-native";
import {getRankAndSuit, images} from "../utils";

export default function WattenCard({actionName, actionId, isValid, onCardPressed, style}) {

    return (
        <View style={style}>
            <Card containerStyle={isValid ? [styles.cardContainer, validStyles[getRankAndSuit(actionId)[1]]] : styles.cardContainer} wrapperStyle={styles.cardWrapper}>
                <TouchableHighlight disabled={!isValid} style={styles.cardWrapper} onPress={() => onCardPressed(actionId)} activeOpacity={0.3} underlayColor='white'>
                    <Image style={styles.cardImage} source={images[actionId].uri}/>
                </TouchableHighlight>
            </Card>
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 20,
        flex: 1
    },
    cardContainer: {
        borderRadius: 20,
        borderColor: 'black',
        width: 120,
        height: 200,
        backgroundColor: 'white'
    },
    cardWrapper: {
        flex: 1,
    },
    cardImage: {
        width: 114,
        height: 190,
        margin: -13,
    },
    laab: {
        backgroundColor: '#E3FFCD'
    },
    herz: {
        backgroundColor: '#FFCDCD'
    },
    oachl: {
        backgroundColor: '#E5BA94'
    },
    schell: {
        backgroundColor: '#FFFF99'
    }
})

const validStyles = [styles.laab, styles.herz, styles.oachl, styles.schell]
