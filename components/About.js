import React from "react";
import {Image, Linking, Text, View, StyleSheet} from "react-native";

export default function About () {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                This application was developed by Giacomo Melacini
                as part of a thesis project of a Bachelor in Computer Science
                at the Free University of Bozen-Bolzano.
            </Text>
            <Image source={require('../assets/cvfoto.jpeg')} style={styles.image}/>
            <Text>
                The aim of this project has been to try an AlphaZero approach to Watten,
                an incomplete information card game.
                It relies on the AlphaZero framework provided by <Text style={styles.hyperlink}  onPress={() => Linking.openURL('http://ai.arvilab.com/')}>ARVI Lab </Text>
                and on the work previously done by Fabrizio Micheloni.
                Have a look at the <Text style={styles.hyperlink}  onPress={() => Linking.openURL('https://github.com/Chavelanda/offen-watten-alpha-zero')}>Github project</Text>.
            </Text>
        </View>
    )
}

styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        margin: 20,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    hyperlink: {
        color: 'blue'
    },
    text: {
        textAlign: 'justify'
    }
})
