import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import {getDecks} from '../utils/helpers'

class Decklist extends React.Component{
    render(){
        const cards=getDecks()
        console.log('props de DeckList, ', this.props)
        return(
            <View>
              {/*o erro do map que exige um key se resolve colocando o key em TouchableOpacity*/}
              {/*oonPress recebe a navegação que veio no this.props */}
                {cards.map(card=>(
                    <TouchableOpacity
                        style={styles.card}
                        onPress={()=>this.props.navigation.navigate('Deck',{card:card.title})}
                        key={card.title}>

                        <Text>{card.title}</Text>
                        <Text>{card.questions.length} {(card.questions.length>1)?'cards':'card'}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        )
    }
}

const styles=StyleSheet.create({
    card:{
        borderBottomWidth:2,
        borderBottomColor:'blue',
        alignItems:'center',
        padding:20
    }
})

export default Decklist