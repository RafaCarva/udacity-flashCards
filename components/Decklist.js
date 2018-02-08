import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import {getDecks} from '../utils/helpers'

class Decklist extends React.Component{
    constructor(props){
        super(props)
        this.state={
            cards:[]
        }
    }
    componentDidMount(){
        const cards=getDecks()
        this.setState({
            cards:Object.keys(cards).map((card)=>(cards[card]))
        })
    }

    render(){
        const cards=getDecks()
        console.log('DeckList.js > cards resultado de getDecks:',cards)
        return(
            <View>
                {this.state.cards.map(card=>(
                    <TouchableOpacity
                        style={styles.card}
                        onPress={()=>this.props.navigation.navigate('Deck',{card:card.title})}
                        key={card.title}
                    >
                        <Text>{card.title}</Text>
                        <Text>{card.questions.length} {(card.questions.length>1)?'cards':'card'}</Text>
                    </TouchableOpacity>
                ))}
                <Text>VEJA O CARDS:</Text>
                <Text>{JSON.stringify(cards)}</Text>
                <Text>{JSON.stringify(Object.keys(cards).map((card)=>(cards[card])))}</Text>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    card:{
        borderBottomWidth:2,
        borderBottomColor:'#000',
        alignItems:'center',
        padding:15
    }
})

export default Decklist