import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import {saveDeck} from '../utils/api'

class NewDeck extends Component {

state={
deckTitle:'',
buttonDisabled:true
}

onChangeTitle = (data) =>{
  this.setState({deckTitle: data})

  this.state.deckTitle.length 
  ? this.setState({buttonDisabled:false})
  : this.setState({buttonDisabled:true})
}

submitNewDeck=()=>{
  //console.log('aeprtou submit')
  saveDeck(this.state.deckTitle)
  this.setState({deckTitle:'',buttonDisabled:true})

}


  render() {
    return (
      <View>
        <Text>What is the title of your new deck? </Text>
        <TextInput
          placeholder="Title"
          value={this.state.deckTitle}
          onChangeText={this.onChangeTitle}
        />
        <Button
          title='Submit new deck'
          disabled={this.state.buttonDisabled}
          onPress={()=>this.submitNewDeck()}
        />
      </View>
    );
  }
}

export default NewDeck;