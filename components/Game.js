import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, StatusBar} from 'react-native';
import SubGame from "./SubGame";
import {Button, Overlay, Icon} from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateStatsInServer} from "../api/stats";
import Walkthrough from "./Walkthrough";

export default function Game({gen, goBack}) {

    const [scorePlayerA, setScorePlayerA] = useState(0)
    const [scorePlayerB, setScorePlayerB] = useState(0)
    const [winningPlayer, setWinningPlayer] = useState(null)
    const [wonSubGame, setWonSubGame] = useState(null)
    const [message, setMessage] = useState('')
    const [gameNumber, setGameNumber] = useState(1)
    const winThreshold = 15
    const [showWalkthrough, setShowWalkthrough] = useState(false)

    // To update stats
    useEffect(()=> {
        async function updateStats() {
            const genStatsJSON = await AsyncStorage.getItem(gen.toString())
            const genStats = genStatsJSON !== null ? JSON.parse(genStatsJSON) : null

            const gameWon = winningPlayer === 1 ? 1 : 0
            const newStats = genStats !== null ?
                {played: genStats.played + 1, won: genStats.won + gameWon} :
                {played: 1, won: gameWon}

            try {
                await AsyncStorage.setItem(gen.toString(), JSON.stringify(newStats))
                await updateStatsInServer(gen, gameWon)
            } catch (e) {
                console.log(e)
            }
        }

        if (winningPlayer !== null) {
            updateStats()
        }
    }, [winningPlayer])

    // Check if app walkthrough is needed
    useEffect( () => {
        async function retrieveWalkthrough() {
            try {
                const value = await AsyncStorage.getItem('showWalkthrough')
                if(value == null) {
                    setShowWalkthrough(true)
                }
            } catch(e) {
                console.log(e)
            }
        }

        retrieveWalkthrough()
    }, [])

    // Set asyncStorage when showWalkthrough is changed
    useEffect( () => {
        async function updateWalkthrough() {
            try {
                await AsyncStorage.setItem('showWalkthrough', JSON.stringify(false))
            } catch (e) {
                // saving error
            }
        }

        if (!showWalkthrough) {
            updateWalkthrough()
        }
    }, [showWalkthrough])

    const initGamePrize = () => {
        return (winThreshold - scorePlayerA <= 2 || winThreshold - scorePlayerB <= 2) ? (scorePlayerA < 10 || scorePlayerB < 10) ? 4 : 3 : 2
    }

    const onSubGameEnd = (winsPlayerA, score, mess='') => {
        mess = mess !== '' ? mess + '\n' : mess
        setMessage(mess)
        const points = winsPlayerA ? scorePlayerA+score : scorePlayerB+score
        winsPlayerA ? setScorePlayerA(scorePlayerA+score) : setScorePlayerB(scorePlayerB+score)
        winsPlayerA ? setWonSubGame(1) : setWonSubGame(-1)
        checkWin(winsPlayerA, points)
    }

    const checkWin = (winsPlayerA, score) => {
        if (score > 14) {
            winsPlayerA ? setWinningPlayer(1) : setWinningPlayer(-1)
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
                <View style={styles.youContainer}>
                    <Text style={styles.nameText}>YOU</Text>
                    <Text style={styles.gameText}>GAME {scorePlayerA}</Text>
                </View>
                <Icon iconStyle={styles.icon} size={30} name='ios-help-circle-outline' type='ionicon' onPress={() => setShowWalkthrough(true)}/>
                <View style={styles.karlContainer}>
                    <Text style={styles.nameText}>KARL{gen+1}</Text>
                    <Text style={styles.gameText}>GAME {scorePlayerB}</Text>
                </View>
            </View>
            <View style={styles.subGameContainer}>
                <SubGame scoreA={scorePlayerA} scoreB={scorePlayerB} gen={gen} initGamePrize={initGamePrize} gameNumber={gameNumber} onSubGameEnd={onSubGameEnd} checkRaiseMakesSense={checkRaiseMakesSense}/>
            </View>

            <Overlay overlayStyle={styles.overlay} isVisible={winningPlayer === null && wonSubGame !== null} onBackdropPress={() => setWonSubGame(null)}>
                <Button
                    title={wonSubGame===1 ? message + 'You won this hand!\nGo on and beat him!\n\nStart next hand' :
                        'Ahiahiahi!\nThis time he got you...\n\nStart next hand'}
                    onPress={() => setWonSubGame(null)}
                    type='clear'
                    titleStyle={styles.overlayText}
                />
            </Overlay>
            <Overlay isVisible={winningPlayer !== null} overlayStyle={styles.overlay} onBackdropPress={() => goBack()}>
                <Button
                    title={winningPlayer===1 ? message + 'Congratulations, you won!\n\nGo back to Menu' : 'Unfortunately you lost my dear\n\nGo back to menu'}
                    onPress={() => goBack()}
                    type='clear'
                    titleStyle={styles.overlayText}
                />
            </Overlay>
            <Overlay isVisible={showWalkthrough} overlayStyle={styles.helpOverlay} onBackdropPress={() => setShowWalkthrough(false)}>
                <Walkthrough setShowWalkThrough={setShowWalkthrough}/>
            </Overlay>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    gameContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: StatusBar.currentHeight,
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    youContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        marginLeft: 10,
    },
    karlContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        marginRight: 10,
    },
    nameText:{
        fontWeight: 'bold',
        fontSize: 20,
    },
    gameText: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 12,
    },
    subGameContainer: {
        flex: 10,
    },
    overlay: {
        margin: 10,
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'auto'
    },
    overlayText: {
        color: 'black'
    },
    icon: {
        margin: 10,
    },
    helpOverlay: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',

    }

})
