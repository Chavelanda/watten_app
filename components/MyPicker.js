import React from "react";
import {Text, View, StyleSheet} from "react-native";
import {Button, Divider, Overlay} from "react-native-elements";

export default function MyPicker ({visible, setVisible, title, list, action}) {

    const mapList = (str, id, list) => (
        <View key={id} style={[styles.listElementContainer, {height: 95/list.length + '%'}]}>
            {id === 0 ? <Divider /> : null}
            <Button titleStyle={styles.text} title={str} type='clear' onPress={() => action(id)}/>
            <Divider />
        </View>
    )

    return (
        <Overlay overlayStyle={styles.overlay} isVisible={visible} onBackdropPress={() => setVisible(false)}>
            <View style={styles.choice}>
                <Text style={[{alignSelf: 'center', fontWeight: 'bold'}, styles.text]}>{title}</Text>
                {list.map(mapList)}
            </View>
        </Overlay>
    )
}

const styles=StyleSheet.create({
    overlay: {
        flex: 1,
        margin: 10,
        width: '50%'
    },
    choice: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        color: 'black',
    },
    listElementContainer: {
        justifyContent: 'space-around',
        backgroundColor: 'white'
    },
    divider: {

    }
})
