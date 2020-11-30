import React from 'react';
import { View, StyleSheet, ImageBackground} from 'react-native';

import Home from '../components/Home'

export default function HomeScreen({navigation}) {

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/sfondo3.jpg')} style={styles.image}>
        <Home navigation={navigation}/>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
})
