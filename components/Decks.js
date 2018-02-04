import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import {fetchDecks} from '../utils/api'

class Decks extends Component {

state = {
  allDecks:{}
}

componentDidMount(){
  //console.log('Decks.js -> componentDidMount()')
  this.setState({allDecks: fetchDecks()})
}

  render() {

console.log('--->', this.state.allDecks)
    return (
      <View>
        {this.state.allDecks
        ?
        <Text>3 TddODOS OS DECKS AQUI!</Text>
        :
        <Text>não tem deck</Text>
      }

        
       
      </View>
    );
  }
}

export default Decks;

