import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import RulesScreen from '../screens/RulesScreen'
import DeckScreen from '../screens/DeckScreen'
import GameDesScreen from '../screens/GameDesScreen'
import HistoryScreen from '../screens/HistoryScreen'
import {ImageBackground, StyleSheet} from "react-native";
import Header from "@react-navigation/stack/src/views/Header/Header";

const Stack = createStackNavigator()

export default function RulesStack() {

  return (
    <Stack.Navigator
        initialRouteName='Rules'
        screenOptions={{headerStyle: styles.header, headerBackground: ()=>(<ImageBackground style={styles.header} resizeMode='stretch' source={require('../assets/sfondi/header1.png')} />)}}
    >
      <Stack.Screen name='Rules' component={RulesScreen} />
      <Stack.Screen name='Deck' component={DeckScreen} />
      <Stack.Screen name='GameDes' component={GameDesScreen} />
      <Stack.Screen name='History' component={HistoryScreen} />
    </Stack.Navigator>
  )
}

const styles=StyleSheet.create({
  header: {
    height: 80,
  }
})
