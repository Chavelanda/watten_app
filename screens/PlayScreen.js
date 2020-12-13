import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import Game from "../components/Game";

export default function PlayScreen({navigation, route}) {

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={require('../assets/sfondi/playBackground2.jpg')}>
        <Game gen={route.params.gen} goBack={navigation.goBack}/>
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
