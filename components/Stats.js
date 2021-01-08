import React, {useEffect, useState} from "react";
import {Pressable, Text, View, StyleSheet, Dimensions, ImageBackground} from "react-native";
import {Icon} from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyPicker from "./MyPicker";
import {getStatsFromServer} from "../api/stats";

export default function Stats() {

    const [pickerVisible, setPickerVisible] = useState(false)
    const [gen, setGen] = useState(-1)
    const [data, setData] = useState(null)
    const [globalData, setGlobalData] = useState(null)

    const levels = ['Super Easy', 'Still Easy', 'You can do this', 'Train for this', 'Tough one']

    useEffect(() => {
        async function fetchStats () {
            const jsonStats = await AsyncStorage.getItem(gen.toString())
            const stats = jsonStats !== null ? JSON.parse(jsonStats) : null
            if (stats !== null) {
                setData(stats)
            } else {
                setData(null)
            }

            const newGlobalData = await getStatsFromServer(gen)
            setGlobalData(newGlobalData)

        }

        fetchStats()
    }, [gen])

    const onLevelSelected = (gen) => {
        setGen(gen-1)
        setPickerVisible(false)
    }

    return (
        <View style={styles.container}>
            <View style={styles.pickerContainer}>
                <Pressable onPress={() => setPickerVisible(true)} elevation={5} style={styles.picker}>
                    <Text style={styles.pickerText}>{levels[gen+1]}</Text>
                    <Icon containerStyle={styles.iconStyle} name='ios-arrow-down' type='ionicon'/>
                </Pressable>
            </View>
            <ImageBackground source={require('../assets/sfondo3.jpg')} style={styles.image} imageStyle={styles.image}>
                <View style={styles.graphContainer}>
                    <Text style={[styles.graphText, styles.graphTitle]}>Percentage of wins</Text>
                    <View style={styles.columnContainer}>
                        {data !== null ?
                            <View style={styles.singleColumnContainer}>
                                <Text style={styles.graphText}>{(data.won / data.played).toFixed(2) * 100}%</Text>
                                <View style={[styles.columnStyle, {height: 160 * (data.won / data.played).toFixed(4)}]}/>
                            </View> :
                            <View style={[styles.singleColumnContainer, {height: 160, justifyContent: 'center'}]}>
                                <Text>You didn't play{'\n'}any match whit the{'\n'}selected level!</Text>
                            </View>
                        }

                        {globalData !== null && globalData.played > 0?
                            <View style={styles.singleColumnContainer}>
                                <Text style={styles.graphText}>{(globalData.won/globalData.played).toFixed(2)*100}%</Text>
                                <View style={[styles.columnStyle, {height: 160*(globalData.won/globalData.played).toFixed(4)}]}/>
                            </View> :
                            <View style={[styles.singleColumnContainer, {justifyContent: 'center'}]}>
                                <Text>No match has{'\n'}been played whit the{'\n'}selected level yet!</Text>
                            </View>
                        }
                    </View>

                    <View style={styles.lineStyle}/>

                    <View style={styles.textContainer}>
                        <Text allowFontScaling={false} style={styles.graphText}>YOU</Text>
                        <Text allowFontScaling={false} style={styles.graphText}>GLOBAL</Text>
                    </View>
                </View>
            </ImageBackground>
            {data !== null ?
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>Games played: {data.played}</Text>
                    <Text style={styles.infoText}>Games won: {data.won}</Text>
                </View> :
                null
            }
            <MyPicker title={'Choose Level'} visible={pickerVisible} setVisible={setPickerVisible} list={levels} action={onLevelSelected}/>
        </View>
    )
}

const styles=StyleSheet.create({
    image: {
        height: 250,
        width: Dimensions.get('window').width -40,
        resizeMode: "cover",
        borderRadius: 20,
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    pickerContainer: {
        height: 130,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    picker: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 3,
        height: 41,
        borderColor: 'black',
        borderWidth: 0.3,
        alignItems: 'flex-start',
        justifyContent: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
    },
    iconStyle: {
        position: 'absolute',
        right: 10,
        top: 10,
        bottom: 10,
        zIndex: -10
    },
    pickerText: {
        paddingHorizontal: 10,
        marginRight: 20,
        fontWeight: 'bold',
    },
    graphContainer: {
        height: 250,
        width: Dimensions.get('window').width -40,
        backgroundColor: 'rgba(255,127,80,0.75)',
        borderRadius: 20,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 20
    },
    columnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: Dimensions.get('window').width -40,
    },
    singleColumnContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: (Dimensions.get('window').width -40)/2,
    },
    columnStyle: {
        width: 40,
        height: 160,
        backgroundColor: 'white',
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
    },
    lineStyle: {
        height: 1,
        width: '100%',
        backgroundColor: '#a5a5a5'
    },
    graphText: {
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    graphTitle: {
        position: 'absolute',
        top: 10,
    },
    textContainer: {
        height: 20,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        width: Dimensions.get('window').width -40,
    },
    infoContainer: {
        flex: 1,
        margin: 20,
        alignContent: 'center',
        flexDirection: 'row',
    },
    infoText: {
        fontWeight: 'bold',
        fontSize: 15,
        margin: 20,
    }
})
