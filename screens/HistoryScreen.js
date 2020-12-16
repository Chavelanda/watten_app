import React from 'react';
import { View, StyleSheet} from 'react-native';
import History from "../components/History";

export default function HistoryScreen() {

  return (
    <View style={styles.container}>
        <History/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  }
})
