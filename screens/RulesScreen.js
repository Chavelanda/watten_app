import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';

import Rules from '../components/Rules'

export default function RulesScreen({navigation}) {

  return (
    <View style={styles.container}>
        <ImageBackground source={require('../assets/sfondo3.jpg')} style={{flex: 1, resizeMode: "cover", justifyContent: "center"}}>
            <Rules navigation={navigation}/>
        </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
})
