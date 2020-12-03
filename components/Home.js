import React, { useState } from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { Button } from 'react-native-elements';
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
                    <Picker
                        selectedValue={gen}
                        onValueChange={itemValue => setGen(itemValue)}
                        style={styles.picker}>
                        <Picker.Item label="GEN 0" value={0}/>
                        <Picker.Item label="GEN 1" value={1}/>
                        <Picker.Item label="GEN 2" value={2}/>
                        <Picker.Item label="GEN 3" value={3}/>
                    </Picker>
                </View>
                <View style={styles.playButtonContainer}>
                    <Button title='PLAY' type='outline' raised onPress={() => navigation.navigate('Play', {gen: gen})}/>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button title='RULES' type='outline' raised onPress={() => navigation.navigate('RulesStack')}/>
                <Button title='STATS' type='outline' raised onPress={() => navigation.navigate('Stats')}/>
                <Button title='ABOUT' type='outline' raised onPress={() => navigation.navigate('About')}/>
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
    },
    genContainer: {
        flex: 1,
        alignItems: 'center',
    },
    picker: {
        width: '70%',
        backgroundColor: 'white',
    },
    buttonContainer: {
        flex: 3,
        justifyContent: 'space-around',
    }
})
