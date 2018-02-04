import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'

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
  console.log('aeprtou submit')
}


  render() {
    return (
      <View>
        <Text>What is the title of your new deck? </Text>
        <TextInput
          placeholder="Title"
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