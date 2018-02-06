import React from 'react'
import {View,Text} from 'react-native'

class NewDeck extends React.Component{
    render(){
        return(
            <View>
                <Text>New Deck!</Text>
                <Text>What the name of your new deck?</Text>
            </View>
        )
    }
}

export default NewDeck