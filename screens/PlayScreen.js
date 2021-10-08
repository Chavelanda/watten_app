import React, {useEffect} from 'react';
import {View, StyleSheet, ImageBackground, Alert} from 'react-native';
import Game from "../components/Game";

export default function PlayScreen({navigation, route}) {

  useEffect(
      () =>
          navigation.addListener('beforeRemove', (e) => {
            // Prevent default behavior of leaving the screen
            e.preventDefault();

            // Prompt the user before leaving the screen
            Alert.alert(
                'Hold on! Do you really want to exit the game?',
                'Leaving the game you will not be able to continue it!',
                [
                  { text: "Don't leave", style: 'cancel', onPress: () => {} },
                  {
                    text: 'Yes, please exit',
                    style: 'destructive',
                    // If the user confirmed, then we dispatch the action we blocked earlier
                    // This will continue the action that had triggered the removal of the screen
                    onPress: () => navigation.dispatch(e.data.action),
                  },
                ]
            );
          }),
      [navigation]
  );

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
