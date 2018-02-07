import React from 'react'
import {View,Text} from 'react-native'
import {getDeck} from '../utils/helpers'

class Deck extends React.Component{

    static navigationOptions=({navigation})=>({
        title:`${navigation.state.params.card}`
    })

    constructor(props){
        super(props)
        this.state={
            questions:[]
        }
    }


    componentDidMount(){
        console.log('-->props de Deck.js ',this.props)
        //console.log('-->params.card ',this.props.navigation.state.params.card)
        this.setState({
            questions:getDeck(this.props.navigation.state.params.card)
        })
    }

    render(){
        const {questions}=this.state
        //console.log(questions)
        return(
            <View>
                <Text>Deck</Text>
                <Text>
                    {this.props.card}
                </Text>
                <Text>{JSON.stringify(questions)}</Text>
            </View>
        )
    }
}

export default Deck