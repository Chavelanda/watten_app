import React from "react";
import {View, StyleSheet} from "react-native";
import WattenCard from "./WattenCard";
import {getCardName, getRankAndSuit} from "../utils";

export default function Hand({hand, validMoves, onPlay}){

    const mapCards = (card, index, arr) => {
        const spread = arr.length > 4 ? 60 : arr.length > 1 ? 30 : 0
        const rotAngle = index*30 - spread
        const radAngle = rotAngle*180/Math.PI
        const transform = rotAngle >= 0 ?
            [{translateX: -60}, {translateY: 100}, {rotateZ: rotAngle + 'deg'}, {translateY: -(100+Math.abs(60*Math.sin(radAngle)))}, {translateX: 60*Math.abs(Math.cos(radAngle))}] :
            [{translateX: 60}, {translateY: 100}, {rotateZ: rotAngle + 'deg'}, {translateY: -(100+Math.abs(60*Math.sin(radAngle)))}, {translateX: -60*Math.abs(Math.cos(radAngle))}]

        return(
            <WattenCard
                key={card}
                style={[styles.card, {transform: transform}]}
                isValid={validMoves[card]}
                actionId={card}
                onCardPressed={onPlay}
            />
        )
    }

    return(
        <View style={styles.container}>
            {hand.map(mapCards)}
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    card: {
        position: 'absolute',
    }
})
