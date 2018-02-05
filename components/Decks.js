import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage,TouchableHighlight  } from 'react-native'
import {fetchDecks} from '../utils/api'

class Decks extends Component {

state = {
  allDecks:{}
}

componentDidMount = () =>{
  console.log('Decks.js -> componentDidMount()')

AsyncStorage.getItem('allDecks').then((data)=>{
  if(data){
    this.setState({allDecks:JSON.parse(data)})
  }
})


  
}

  render() {

console.log('**state.allDecks--->', this.state.allDecks)
    return (
      <View>
        {
        this.state.allDecks.length > 0
        ?
        
          this.state.allDecks.map((item,key)=>(
            <Text key={key}>
            nome do deck: {item.title}
            </Text>

          ))
        
        
      :<Text>1 não tem deck</Text>}
     
      </View>
    );
  }
}

export default Decks;