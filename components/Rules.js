import React from 'react';
import { View, StyleSheet } from 'react-native';
import {ListItem, Icon} from 'react-native-elements'

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
            {list.map(mapList)}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
