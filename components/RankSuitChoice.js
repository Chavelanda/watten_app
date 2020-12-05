import React from "react";
import {Text, View, StyleSheet} from "react-native";
import {Button, Overlay} from "react-native-elements";

export default function RankSuitChoice ({visible, setVisible, title, list, action}) {

    const mapList = (str, id) => (
        <Button title={str} type='clear' onPress={() => action(id)}/>
    )

    return (
        <Overlay overlayStyle={styles.overlay} isVisible={visible} onBackdropPress={() => setVisible(false)}>
            <View style={styles.choice}>
                <Text style={{alignSelf: 'center'}}>{title}</Text>
                {list.slice(0,-1).map(mapList)}
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
        justifyContent: 'space-around',
    }
})
