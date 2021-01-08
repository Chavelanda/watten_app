import React from 'react';
import { View, StyleSheet} from 'react-native';
import About from "../components/About";

export default function AboutScreen() {

  return (
    <View style={styles.container}>
      <About/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange'
  }
})
