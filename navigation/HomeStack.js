import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen'
import RulesStack from './RulesStack'
import StatsScreen from '../screens/StatsScreen'
import AboutScreen from '../screens/AboutScreen'
import {ImageBackground, StyleSheet} from "react-native";

const Stack = createStackNavigator()

export default function HomeStack() {

  return (
    <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{headerStyle: styles.header, headerBackground: ()=>(<ImageBackground style={styles.header} resizeMode='stretch' source={require('../assets/sfondi/header1.png')} />)}}
    >
      <Stack.Screen name='Home' component={HomeScreen} options={{headerShown: false}}/>
      <Stack.Screen name='RulesStack' component={RulesStack} options={{headerShown: false}}/>
      <Stack.Screen name='Stats' component={StatsScreen} />
      <Stack.Screen name='About' component={AboutScreen} />
    </Stack.Navigator>
  );
}


const styles=StyleSheet.create({
    header: {
        height: 80,
    }
})
