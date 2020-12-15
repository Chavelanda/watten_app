import React, { useState } from 'react';
import { View, StyleSheet, Text} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import { Picker } from '@react-native-picker/picker'

export default function Home({navigation}) {

    const [gen, setGen] = useState(0)

    return(
        <View style={styles.container}>
            <View style={styles.title}>
                <Text>WattenAI</Text>
            </View>
            <View style={styles.playContainer}>
                <View style={styles.genContainer}>
                    <View elevation={5} style={styles.pickerContainer}>
                        <Picker
                            selectedValue={gen}
                            onValueChange={itemValue => setGen(itemValue)}
                            style={styles.picker}
                            itemStyle={{fontWeight: 'bold'}}>
                            <Picker.Item label="Random" value={-1}/>
                            <Picker.Item label="GEN 0" value={0}/>
                            <Picker.Item label="GEN 1" value={1}/>
                            <Picker.Item label="GEN 2" value={2}/>
                            <Picker.Item label="GEN 3" value={3}/>
                        </Picker>
                        <Icon containerStyle={styles.iconStyle} name='ios-arrow-down' type='ionicon'/>
                    </View>
                </View>
                <View style={styles.playButtonContainer}>
                    <Button titleStyle={styles.buttonTitleStyle} buttonStyle={styles.buttonStyle} title='PLAY' type='outline' raised onPress={() => navigation.navigate('Play', {gen: gen})}/>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button titleStyle={styles.buttonTitleStyle} buttonStyle={styles.buttonStyle} title='RULES' type='outline' raised onPress={() => navigation.navigate('RulesStack')}/>
                <Button titleStyle={styles.buttonTitleStyle} buttonStyle={styles.buttonStyle} title='STATS' type='outline' raised onPress={() => navigation.navigate('Stats')}/>
                <Button titleStyle={styles.buttonTitleStyle} buttonStyle={styles.buttonStyle} title='ABOUT' type='outline' raised onPress={() => navigation.navigate('About')}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        margin: 30,
    },
    title: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
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
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0
    },
    picker: {
        width: '100%',
        backgroundColor: 'transparent',
        borderRadius: 10,
        height: '100%'
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
