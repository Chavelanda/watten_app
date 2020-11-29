import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen'
import RulesStack from './RulesStack'
import StatsScreen from '../screens/StatsScreen'
import AboutScreen from '../screens/AboutScreen'

export default function HomeStack() {

  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name='Home' component='HomeScreen' />
      <Stack.Screen name='RulesStack' component='RulesStack' />
      <Stack.Screen name='Stats' component='StatsScreen' />
      <Stack.Screen name='About' component='AboutScreen' />
    </Stack.Navigator>
  )
}
