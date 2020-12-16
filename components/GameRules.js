import React from "react";
import {Linking, ScrollView, StyleSheet, Text} from "react-native";


export default function GameRules() {


    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>OFFENWATTEN</Text>
            <Text>
                The version of Watten played in this App is called Offenwatten.
            </Text>
            <Text>
                There are only 2 players and 5 cards are given to each player. The
                hand is won by the first player who wins three tricks. Each hand is worth 2 points, the
                first player that reaches 15 points wins.
            </Text>
            <Text style={styles.title}>GAME FLOW</Text>
            <Text>
                After distributing the cards, the first card on the deck is
                shown to both players, while the last one is shown just to the second starting player.
            </Text>
            <Text>
                The starting player declares the rank, while the other one declares the trump suit.
                This version of the game is called Offenwatten because rank and suit are known to all the players.
                If the first player choses the Weli as rank, that will be the Rechte no matter what suit is chosen.
            </Text>
            <Text>
                {'\n'}The card identified by the rank and the suit is called "der Rechte" and it is the strongest one.
            </Text>
            <Text style={styles.example}>
                E.g. The first player chooses 8 as rank, the second one chooses herz as suit: the Rechte is the 8 of herz.
            </Text>
            <Text>
                {'\n'}The cards with the same rank as the Rechte are called "Blinden".
                The Blinden can be beaten only by the Rechte. In case the rank chosen is the Weli,
                there won't be Blinden.
            </Text>
            <Text style={styles.example}>
                E.g. The first player chooses Unter as rank, the second one chooses laab as suit:
                the Blinden will be the Unter of herz, the Unter of Schell and the Unter of Oachl.
            </Text>
            <Text>
                {'\n'}The cards with the same suit as the Rechte are called Trümpfe (trumps).
                After the Rechte and the Blinden the Trümpfe are the strongest cards (from the Ass
                to the 7).
            </Text>
            <Text style={styles.example}>
                E.g. The first player chooses 7 as rank, the second one chooses oachl as suit:
                the Trümpfe will be the cards of oachl excluding the 7.
            </Text>
            <Text>
                {'\n'}So, in summary, the cards in descending order of strength are: the Rechte, the Blinden,
                the Trümpfe and all the other cards.
            </Text>
            <Text>
                {'\n'}The player playing the strongest card will win the trick. If the played cards
                have the same strength, the player that played the card first will win the trick.
                If the Trumpf or the Rechte is played, the opponent must play a trump as well or a Blinde.
                The only exception is in case the only playable card is the Rechte.
                The player winning the trick will start playing the next one.
            </Text>
            <Text>
                {'\n'}After each hand the whole deck is shuffled again and redistributed.
                The players will start playing the hand first alternately.
            </Text>
            <Text style={styles.title}>RAISING</Text>
            <Text>
                At the beginning of each hand the prize for winning it is 2 points.
                However, the players have the possibility to raise the prize in each moment of the game.
                The prize is raised one point at a time. When a player raises, the other can either accept it
                or fold the hand. When a player folds, the hand is won by the opponent with the prize
                before the raise.
            </Text>
            <Text style={styles.example}>
                E.g. The hand is worth 2 points. Player 1 raises, player 2 can either accept or fold.
                If player 2 accepts, then the hand goes on with a prize of 3. On the other hand, if
                player 2 folds, player 1 wins the hand with a prize of 2.
            </Text>
            <Text>
                {'\n'}In the last trick of an hand, the rules for raising are stricter. A player can raise
                only if its last card follows the following rules:
            </Text>
            <Text>{'\u2B24'} It is stronger than the card that is already on the table.</Text>
            <Text>{'\u2B24'} It has the same suit of the card already on the table.</Text>
            <Text>{'\u2B24'} It has the trump suit.</Text>
            <Text>
                {'\n'}Both when the opponent accepts or fold, it is checked whether the raise was allowed.
                If not, then the opponents wins the hand.
            </Text>
            <Text style={styles.title}>PRIZE</Text>
            <Text>
                Normally each hand is worth 2 points. When one player is 2 points from winning the game,
                then the hand is worth 3 points. If the other player has less than 10 points, then the hand
                is automatically worth 4 points.
            </Text>
            <Text style={styles.title}>REMARKS</Text>
            <Text>
                These rules are slightly different from the standard rules of Watten.
            </Text>
            <Text>
                To have a look at the standard rules you can look the <Text style={styles.hyperlink}  onPress={() => Linking.openURL('https://en.wikipedia.org/wiki/Watten_(card_game)')}>wikipedia</Text> page.
            </Text>
            <Text style={styles.lastElement}>
                If you want to play Watten with other human players online you should check <Text style={styles.hyperlink}  onPress={() => Linking.openURL('https://www.watten.org/')}>here</Text>.
            </Text>
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
    example: {
        fontStyle: 'italic'
    },
    hyperlink: {
        color: 'blue',
    },
    lastElement: {
        marginBottom: 20,
    }
})
