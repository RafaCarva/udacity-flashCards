import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {TabNavigator} from 'react-navigation'
import Decks from './components/Decks'
import NewDeck from './components/NewDeck'
import {FontAwesome} from '@expo/vector-icons'


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


export default class App extends React.Component {

  //componentDidMount

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
