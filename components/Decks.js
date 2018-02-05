import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import {fetchDecks} from '../utils/api'

class Decks extends Component {

state = {
  allDecks:{}
}

componentDidMount = async() =>{
  console.log('Decks.js -> componentDidMount()')
  let temp = await fetchDecks()
  console.log('TEMP-->',temp)
  this.setState({allDecks: temp })
}

  render() {

//console.log('--->', this.state.allDecks)
    return (
      <View>
        {this.state.allDecks
        ?
        <Text>3 ODOS OS DECKS AQUI!</Text>
        :
        <Text>não tem deck</Text>
      }

        
       
      </View>
    );
  }
}

export default Decks;

