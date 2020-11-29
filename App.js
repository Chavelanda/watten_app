import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeStack from './navigation/HomeStack'
import PlayScreen from './screens/PlayScreen'

export default function App() {

  [playing, setplaying] = useState(false)

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='HomeStack'>
        {playing ? (
          <Stack.Screen name='Play' component={PlayScreen} />
        ) : (
          <Stack.Screen name='HomeStack' component={HomeStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
