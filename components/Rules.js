import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import {ListItem, Icon, Button} from 'react-native-elements'

const list = [
    {title: 'DECK', icon: 'ios-wallet', navigationScreen: 'Deck'},
    {title: 'GAME', icon: 'ios-rocket', navigationScreen: 'GameDes'},
    {title: 'HISTORY', icon: 'ios-book', navigationScreen: 'History'}]

export default function Rules ({navigation}) {

    const mapList = (item, index) => (
        <ListItem key={index} onPress={() => navigation.navigate(item.navigationScreen)} bottomDivider>
            <Icon name={item.icon} type='ionicon'/>
            <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    )

    return (
        <View style={styles.container}>
            {/*list.map(mapList)*/}
            <Button
                type={'outline'}
                containerStyle={styles.containerStyle}
                buttonStyle={styles.buttonStyle}
                title='DECK'
                titleStyle={styles.text}
                icon={{name: 'ios-wallet', type: 'ionicon'}}
                onPress={() => navigation.navigate('Deck')}
            />
            <Button
                type={'outline'}
                containerStyle={styles.containerStyle}
                buttonStyle={styles.buttonStyle}
                title='GAME'
                titleStyle={styles.text}
                icon={{name: 'ios-rocket', type: 'ionicon'}}
                onPress={() => navigation.navigate('GameDes')}
            />
            <Button
                type={'outline'}
                containerStyle={styles.containerStyle}
                buttonStyle={styles.buttonStyle}
                title='HISTORY'
                titleStyle={styles.text}
                icon={{name: 'ios-book', type: 'ionicon'}}
                onPress={() => navigation.navigate('History')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonStyle: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
        borderColor: 'black',
        justifyContent: 'space-around',
        backgroundColor: 'white'
    },
    containerStyle: {
        flex: 3,
        margin: 20,
        borderRadius: 20,
        backgroundColor: 'white'
    },
    smallPress: {
        flex: 1
    },
    text: {
        fontSize: 40,
        color: 'black'
    }
})
