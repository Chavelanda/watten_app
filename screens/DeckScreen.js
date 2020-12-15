import React from 'react';
import { View, StyleSheet} from 'react-native';
import DeckRules from "../components/DeckRules";

export default function DeckScreen() {

  return (
    <View style={styles.container}>
      <DeckRules/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
})
