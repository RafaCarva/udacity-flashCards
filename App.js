import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {TabNavigator,StackNavigator} from 'react-navigation'
import DeckList from './components/Decklist'
import NewDeck from './components/NewDeck'
import Deck from './components/Deck'

const Tabs=TabNavigator({
    DeckList:{
        screen:DeckList,
        navigationOptions:{
            tabBarLabel:'Decks'
        }
    },
    NewDeck:{
        screen:NewDeck,
        navigationOptions:{
            tabBarLabel:'New Deck'
        }
    }
},{
    tabBarOptions:{
        activeTintColor:'yellow',
        style:{
            backgroundColor:'blue'
        }
    }
})

//aqui eu seto o mapeamento para as paginas
const MainNavigator=StackNavigator({
    Home:{
        screen:Tabs
    },
    Deck:{
        screen:Deck
    }
})


export default class App extends React.Component {
  render() {
    return (
          <MainNavigator/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});