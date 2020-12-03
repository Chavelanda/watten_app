import React, {useState} from 'react';
import {View, StyleSheet, Text, StatusBar} from 'react-native';
import SubGame from "./SubGame";

export default function Game({gen}) {

    const [currentPlayer, setCurrentPlayer] = useState(1)
    const [distributingCardPlayer, setDistributingCardPlayer] = useState(-1)
    const [scorePlayerA, setScorePlayerA] = useState(0)
    const [scorePlayerB, setScorePlayerB] = useState(0)
    const [winningPlayer, setWinningPlayer] = useState(null)
    const [gameNumber, setGameNumber] = useState(0)
    const winThreshold = 15

    const initGamePrize = () => {
        return (winThreshold - scorePlayerA <= 2 || winThreshold - scorePlayerB <= 2) ? (scorePlayerA < 10 || scorePlayerB < 10) ? 4 : 3 : 2
    }


    return (
        <View style={styles.container}>
            <View style={styles.gameContainer}>
                <View style={styles.genContainer}>
                    <Text>Human vs GEN {gen}</Text>
                </View>
                <View style={styles.scoreContainer}>
                    <Text>Human {scorePlayerA}</Text>
                    <Text>GEN {gen} {scorePlayerB}</Text>
                </View>
            </View>
            <View style={styles.subGameContainer}>
                <SubGame initGamePrize={initGamePrize} gameNumber={gameNumber}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'grey'
    },
    gameContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: StatusBar.currentHeight
    },
    genContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 30,
    },
    scoreContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        marginRight: 30,
    },
    subGameContainer: {
        flex: 6,
    }
})
