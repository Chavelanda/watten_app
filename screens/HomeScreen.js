import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { Button } from 'react-native-elements';

export default function HomeScreen({navigation}) {

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text>WattenAI</Text>
      </View>
      <View style={styles.playContainer}>
        <Text>Play Container</Text>
        <Button title='PLAY' onPress={() => navigation.navigate('Play')}/>
      </View>
      <View style={styles.buttonContainer}>
        <Button title='RULES' onPress={() => navigation.navigate('RulesStack')}/>
        <Button title='STATS' onPress={() => navigation.navigate('Stats')}/>
        <Button title='ABOUT' onPress={() => navigation.navigate('About')}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  },
  title: {
    flex: 1,
    backgroundColor: 'blue',
  },
  playContainer: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 3,
    backgroundColor: 'gray',
    justifyContent: 'space-around',
    alignItems: 'center',
  }
})
