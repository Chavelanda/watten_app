import AppIntroSlider from "react-native-app-intro-slider";
import React from "react";
import {Dimensions, Image, StyleSheet, Text, View} from "react-native";


export default function WalkThrough({setShowWalkThrough}) {

    const slides = [
        {
            key: 'one',
            title: 'SCOREBOARD',
            text: 'The scoreboard shows the game result and the hand result for each player.',
            backgroundColor: 'firebrick',
            image: require('../assets/app_walkthrough/tabellone.jpg')
        },
        {
            key: 'two',
            title: 'HANDBOARD',
            text: 'The central part of the screen shows, from left to right,' +
                ' infos about the hand, the cards on the table and the actions connected to raising.',
            backgroundColor: 'firebrick',
            image: require('../assets/app_walkthrough/board.gif')
        },
        {
            key: 'three',
            title: 'HAND',
            text: 'In the lower part of the screen you can see the cards in your hand.',
            backgroundColor: 'firebrick',
            image: require('../assets/app_walkthrough/hand.jpg')
        },
        {
            key: 'four',
            title: 'CARD',
            text: 'Press a card to have a better look',
            backgroundColor: 'firebrick',
            image: require('../assets/app_walkthrough/push.gif')
        },
        {
            key: 'five',
            title: 'PLAY CARD',
            text: 'Swipe up the card to play it! You can only play colored cards.',
            backgroundColor: 'firebrick',
            image: require('../assets/app_walkthrough/swipe.gif')
        },
    ]

    const renderSlide = ({item}) => (
        <View style={[styles.slide, {backgroundColor: item.backgroundColor}]}>
            <Text style={styles.title}>{item.title}</Text>
            <Image style={styles.image} source={item.image} />
            <Text style={styles.slideText}>{item.text}</Text>
        </View>
    )

    return (
        <AppIntroSlider
            data={slides}
            renderItem={renderSlide}
            onDone={() => setShowWalkThrough(false)}
            showSkipButton={true}
            onSkip={() => setShowWalkThrough(false)}
            showPrevButton={true}
        />
    )
}

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 20,
        paddingBottom: 100,
        marginBottom: 10,
        marginTop: 30,
        marginHorizontal: 10,
        borderRadius: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    image: {
        width: 190,
        height: 345,
        resizeMode: 'stretch',
        borderRadius: 10,
        marginBottom: 20,
    },
    slideText: {
        textAlign: 'center',
        marginHorizontal: 30,
        fontWeight: 'bold',
        color: 'white'
    }

})
