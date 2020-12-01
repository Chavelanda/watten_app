import React from 'react';
import { View, StyleSheet} from 'react-native';

import Rules from '../components/Rules'

export default function RulesScreen({navigation}) {

  return (
    <View style={styles.container}>
      <Rules navigation={navigation}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
})
