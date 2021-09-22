import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import MyPicker from "./MyPicker";

export default function Home({navigation}) {

    const [gen, setGen] = useState(0)
    const [pickerVisible, setPickerVisible] = useState(false)
    const [serverUp, setServerUp] = useState(false)

    useEffect( () => {
        try {
            const timeout = setTimeout(() => setServerUp(false), 5000)
            pingServer(timeout)
        } catch (e) {
            setServerUp(false)
        }
        const interval = setInterval(() =>{
            try {
                const timeout = setTimeout(() => setServerUp(false), 5000)
                pingServer(timeout)
            } catch (e) {
                setServerUp(false)
            }
        }, 10000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    // TODO: automatize pinging heroku
    const pingServer = async (timeout) => {
        let response = await fetch('http://watten-ai.herokuapp.com/')
        if (response.status === 200) {
            clearTimeout(timeout)
            setServerUp(true)
        } else {
            clearTimeout(timeout)
            setServerUp(false)
        }
    }

    const levels = ['Random Player', 'FFNN', 'CNN']
    // const levels = ['Super Easy', 'Still Easy', 'You can do this', 'Train for this', 'Tough one']

    const onLevelSelected = (gen) => {
        setGen(gen)
        setPickerVisible(false)
    }

    // TODO: remove level selection
    return(
        <View style={styles.container}>
            <View style={styles.title}>
                <View style={styles.server}>
                    <View style={[styles.circle, {backgroundColor: serverUp ? 'lightgreen' : 'red'}]}/>
                    <Text>{serverUp ? 'Server awake!' : 'Server waking up'}</Text>
                </View>
                <Text style={styles.titleText}>KARL</Text>
                <Text style={styles.subtitleText}>The AI Watten player</Text>
            </View>
            <View style={styles.playContainer}>
                <View style={styles.genContainer}>
                    <Pressable onPress={() => setPickerVisible(true)} elevation={5} style={styles.pickerContainer}>
                        <Text style={styles.pickerText}>{levels[gen]}</Text>
                        <Icon containerStyle={styles.iconStyle} name='ios-arrow-down' type='ionicon'/>
                    </Pressable>
                </View>
                <View style={styles.playButtonContainer}>
                    <Button disabled={!serverUp} titleStyle={styles.buttonTitleStyle} buttonStyle={styles.buttonStyle} title='PLAY' type='outline' raised onPress={() => navigation.navigate('Play', {gen: gen-1})}/>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button titleStyle={styles.buttonTitleStyle} buttonStyle={styles.buttonStyle} title='RULES' type='outline' raised onPress={() => navigation.navigate('RulesStack')}/>
                <Button titleStyle={styles.buttonTitleStyle} buttonStyle={styles.buttonStyle} title='STATS' type='outline' raised onPress={() => navigation.navigate('Stats')}/>
                <Button titleStyle={styles.buttonTitleStyle} buttonStyle={styles.buttonStyle} title='ABOUT' type='outline' raised onPress={() => navigation.navigate('About')}/>
            </View>

            <MyPicker title={'Choose Level'} visible={pickerVisible} setVisible={setPickerVisible} list={levels} action={onLevelSelected}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        margin: 30,
    },
    server: {
        alignSelf: 'flex-start',
        alignItems: 'center',
        height: 20,
        width: 200,
        flexDirection: 'row',
    },
    circle: {
        height: 16,
        width: 16,
        borderRadius: 8,
        marginRight: 10,
    },
    title: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 50,
    },
    subtitleText: {
        fontStyle: 'italic',
        fontSize: 20,
    },
    playContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    playButtonContainer: {
        flex: 1,
        marginLeft: 10,
    },
    genContainer: {
        flex: 1,
        alignItems: 'center',
        marginRight: 10,
    },
    pickerContainer: {
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
        shadowOpacity: 1.0
    },
    pickerText: {
        paddingHorizontal: 10,
        marginRight: 20,
        fontWeight: 'bold',
    },
    iconStyle: {
        position: 'absolute',
        right: 10,
        top: 10,
        bottom: 10,
        zIndex: -10
    },
    buttonContainer: {
        flex: 3,
        justifyContent: 'space-around',
    },
    buttonStyle: {
        borderColor: 'black'
    },
    buttonTitleStyle: {
        color: 'black'
    }
})
