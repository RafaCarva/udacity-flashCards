import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {TabNavigator} from 'react-navigation'
import Decks from './components/Decks'
import NewDeck from './components/NewDeck'
import Api from './utils/api'

 //mapeamento das views
  const Tabs = TabNavigator({
    Decks:{
      screen: Decks,
    },
    NewDeck:{
      screen:NewDeck,
    },
  },
);
//let teste = 'valor inicial';

export default class App extends React.Component {


componentDidMount(){
 // console.log('App.js -> componentDidMount()')

// Api.fetchDecks
}

  render() {

    return (

      <Tabs style={styles.container} />

    );
  }
}

const styles = StyleSheet.create({
  container: {
    
    fontSize:20
  },
});
