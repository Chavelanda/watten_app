import React from 'react';
import { View, StyleSheet} from 'react-native';
import GameRules from "../components/GameRules";

export default function GameDesScreen() {

  return (

      <View style={styles.container}>
          <GameRules />
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
})
