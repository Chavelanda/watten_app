import React from "react";
import {Card} from "react-native-elements";
import {TouchableHighlight, View, StyleSheet} from "react-native";

export default function WattenCard({actionName, actionId, isValid, onCardPressed, style}) {

    return (
        <View style={style}>
            <Card containerStyle={styles.cardContainer} wrapperStyle={styles.cardWrapper}>
                <TouchableHighlight disabled={!isValid} style={styles.cardWrapper} onPress={() => onCardPressed(actionId)} activeOpacity={0.3} underlayColor='white'>
                    <Card.Title>{actionName}</Card.Title>
                </TouchableHighlight>
            </Card>
        </View>
    )
}

const styles=StyleSheet.create({
    cardContainer: {
        borderRadius: 20,
        borderColor: 'black',
        width: 150,
        height: 200,
    },
    cardWrapper: {
        flex: 1,

    }
})
