import React from "react";
import {View, StyleSheet, Text, Image, ScrollView} from "react-native";
import {getRankAndSuit, images, rankNames, suitImages, suitNames} from "../utils";

export default function DeckRules() {

    const mapSuitToImage = (suit) => (
        <View key={suit} style={styles.suitContainer}>
            <Image source={suitImages[suit].uri} style={styles.suitImage} resizeMode='contain' resizeMethod='scale'/>
            <Text style={styles.suitText}>{suitNames[suit]}</Text>
        </View>
    )

    const mapRanksToImage = (rank) => (
        <View key={rank} style={styles.suitContainer}>
            <Image source={images[rank].uri} style={styles.rankImage} resizeMode='contain' resizeMethod='scale'/>
            <Text style={styles.suitText}>{rankNames[getRankAndSuit(rank)[0]]}</Text>
        </View>
    )

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>DECK</Text>
            <Text>
                Watten is a typical game from the tyrolean-bavarian area.
                The Salzburger cards are the one used to play the game.
                The deck is composed of 33 cards: 8 for each suit plus one.
            </Text>
            <Text style={styles.title}>SUITS</Text>
            <Text>
                In Watten there are 4 suits: laab, herz, oachl, schell.
                Each suit is represented by a symbol as follows:
            </Text>
            <View style={styles.rankAndSuits}>
                {[...Array(4).keys()].map(mapSuitToImage)}
            </View>
            <Text style={styles.title}>RANKS</Text>
            <Text>The ranks for each suit, in ascending order, are the following:</Text>
            <View style={styles.rankAndSuits}>
                <View style={styles.weliContainer}>
                    <Image key={32} source={images[32].uri} style={styles.rankImage} resizeMode='contain' resizeMethod='scale'/>
                </View>
                <View style={styles.weliDescription}>
                    <Text>
                        The Weli is a special card. It is the only 6 and it counts as a schell.
                        In some parts of South Tyrol is considered like a jolly.
                    </Text>
                </View>
            </View>
            <View style={styles.rankAndSuits}>
                {[...Array(4).keys()].map((val) => val+24).map(mapRanksToImage)}
            </View>
            <View style={[styles.rankAndSuits, {marginBottom: 20}]}>
                {[...Array(4).keys()].map((val) => val+28).map(mapRanksToImage)}
            </View>
        </ScrollView>
    )

}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: 'white',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20,
    },
    rankAndSuits: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
    },
    suitContainer: {
      alignItems: 'center',
    },
    suitText: {
      fontWeight: 'bold'
    },
    suitImage: {
        height: 50,
        width: 50,
    },
    rankImage: {
        height: 70,
    },
    weliContainer: {
        flex: 1,
        alignItems: 'center',
    },
    weliDescription: {
        flex: 3,
        backgroundColor: 'transparent',
    }
})
