import React from "react";
import {Card} from "react-native-elements";
import {TouchableHighlight, View, StyleSheet} from "react-native";

export default function Move({actionName, actionId}) {

    return (
        <View style={styles.container}>
            <Card containerStyle={styles.cardContainer} wrapperStyle={styles.cardWrapper}>
                <TouchableHighlight style={styles.cardWrapper} onPress={() => console.log('pressed ' + actionId)} activeOpacity={0.3} underlayColor='white'>
                    <Card.Title>{actionName}</Card.Title>
                </TouchableHighlight>
            </Card>
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
    },
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
