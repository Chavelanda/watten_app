import React from 'react';
import { View, StyleSheet } from 'react-native';
import Game from "../components/Game";

export default function PlayScreen({route}) {

  return (
    <View style={styles.container}>
      <Game gen={route.params.gen}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow'
  }
})
