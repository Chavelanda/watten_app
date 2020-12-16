import React, {useState} from "react";
import {Card, Overlay} from "react-native-elements";
import {View, StyleSheet, Image, Pressable} from "react-native";
import GestureRecognizer from 'react-native-swipe-gestures';
import {getRankAndSuit, images} from "../utils/utils";

export default function WattenCard({actionId, isValid, onCardPressed, style}) {

    const [pressing, setPressing] = useState(false)

    const onSwipeUp = (gestureState) => {
        isValid ? onCardPressed(actionId) : null
    }

    return (
        <View style={style}>
            <Card containerStyle={isValid ? [styles.cardContainer, validStyles[getRankAndSuit(actionId)[1]]] : styles.cardContainer} wrapperStyle={styles.cardWrapper}>
                <Pressable style={styles.cardWrapper} onPress={() => setPressing(true)}>
                    <Image style={styles.cardImage} source={images[actionId].uri}/>
                </Pressable>
            </Card>

            <GestureRecognizer style={{flex: 1}} onSwipeUp={(state) => onSwipeUp(state)}>
                <Overlay overlayStyle={styles.overlay} isVisible={pressing} onBackdropPress={() => setPressing(false)}>
                    <Image source={images[actionId].uri}/>
                 </Overlay>
            </GestureRecognizer>
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
    overlay: {
        borderRadius: 20,
        width: 150,
        height: 240,
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
