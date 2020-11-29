import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import RulesScreen from '../screens/RulesScreen'
import DeckScreen from '../screens/DeckScreen'
import GameDesScreen from '../screens/GameDesScreen'
import HistoryScreen from '../screens/HistoryScreen'

const Stack = createStackNavigator()

export default function RulesStack() {

  return (
    <Stack.Navigator initialRouteName='Rules'>
      <Stack.Screen name='Rules' component='RulesScreen' />
      <Stack.Screen name='Deck' component='DeckScreen' />
      <Stack.Screen name='GameDes' component='GameDesScreen' />
      <Stack.Screen name='History' component='HistoryScreen' />
    </Stack.Navigator>
  )
}
