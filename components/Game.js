import React, {useState} from 'react';
import {View, StyleSheet, Text, StatusBar} from 'react-native';
import SubGame from "./SubGame";
import {Button, Overlay} from "react-native-elements";

export default function Game({gen, goBack}) {

    const [scorePlayerA, setScorePlayerA] = useState(0)
    const [scorePlayerB, setScorePlayerB] = useState(0)
    const [winningPlayer, setWinningPlayer] = useState(null)
    const [wonSubGame, setWonSubGame] = useState(null)
    const [gameNumber, setGameNumber] = useState(1)
    const winThreshold = 15

    const initGamePrize = () => {
        return (winThreshold - scorePlayerA <= 2 || winThreshold - scorePlayerB <= 2) ? (scorePlayerA < 10 || scorePlayerB < 10) ? 4 : 3 : 2
    }

    const onSubGameEnd = (winsPlayerA, score) => {
        const points = winsPlayerA ? scorePlayerA+score : scorePlayerB+score
        winsPlayerA ? setScorePlayerA(scorePlayerA+score) : setScorePlayerB(scorePlayerB+score)
        winsPlayerA ? setWonSubGame(1) : setWonSubGame(-1)
        checkWin(winsPlayerA, points)
    }

    const checkWin = (winsPlayerA, score) => {
        if (score > 14) {
            winsPlayerA ? setWinningPlayer(1) : setWinningPlayer(-1)
            // send stats to server
        } else {
            setGameNumber(gameNumber+1)
        }
    }

    const checkRaiseMakesSense = (human, prize) => {
        return human ? scorePlayerA + prize < winThreshold : scorePlayerB + prize < winThreshold
    }

    return (
        <View style={styles.container}>
            <View style={styles.gameContainer}>
                <View style={styles.genContainer}>
                    <Text>{gen !== -1 ? 'You vs GEN ' + gen : 'You vs Random'}</Text>
                </View>
                <View style={styles.scoreContainer}>
                    <Text>Human {scorePlayerA}</Text>
                    <Text>{gen !== -1 ? 'GEN ' + gen : 'Random'} {scorePlayerB}</Text>
                </View>
            </View>
            <View style={styles.subGameContainer}>
                <SubGame gen={gen} initGamePrize={initGamePrize} gameNumber={gameNumber} onSubGameEnd={onSubGameEnd} checkRaiseMakesSense={checkRaiseMakesSense}/>
            </View>

            <Overlay overlayStyle={styles.overlay} isVisible={winningPlayer === null && wonSubGame !== null} onBackdropPress={() => setWonSubGame(null)}>
                <Button
                    title={wonSubGame===1 ? 'You won this hand!\nGo on and beat him!\n\nStart next hand' :
                        'Ahiahiahi!\nThis time he got you...\n\nStart next hand'}
                    onPress={() => setWonSubGame(null)}
                    type='clear'
                />
            </Overlay>
            <Overlay isVisible={winningPlayer !== null} overlayStyle={styles.overlay} onBackdropPress={() => goBack()}>
                <Button
                    title={winningPlayer===1 ? 'Congratulations, you won!\n\nGo back to Menu' : 'Unfortunately you lost my dear\n\nGo back to menu'}
                    onPress={() => goBack()}
                    type='clear'
                />
            </Overlay>

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
    },
    overlay: {
        margin: 10,
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'auto'
    }
})
