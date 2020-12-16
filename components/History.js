import React from "react";
import {Linking, Text, View} from "react-native";


export default function History() {


    return(
        <View>
            <Text>
                According to tradition the game emerged in its present form in the
                Kingdom of Bavaria during the time of the Napoleonic Wars.
                At that time, allied French and Bavarian troops spent their spare
                time together in their military encampments.
                The name came from the French phrase, va tout, which meant "last trump".
                However, Tyrolean historian, Hans Fink, believes the game originated in formerly
                Austrian South Tyrol and came from the Italian word battere, "beating" or "thumping".
            </Text>
            <Text style={{color: 'blue'}} onPress={()=>Linking.openURL('https://en.wikipedia.org/wiki/Watten_(card_game)#Origin')}>
                {'\n'}Source: wikipedia
            </Text>
        </View>
    )
}
