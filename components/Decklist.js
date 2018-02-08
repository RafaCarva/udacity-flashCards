import React from 'react'
import {Text,StyleSheet,TouchableOpacity,ScrollView,RefreshControl} from 'react-native'
import {getDecks} from '../utils/helpers'

class Decklist extends React.Component{
    constructor(props){
        super(props)
        this.state={
            cards:[{title:'',questions:[]}],
            refreshing:false
        }
    }
    componentDidMount(){
        getDecks().then(data=>{
            console.log(data)
            this.setState({
                cards:Object.keys(data).map((key)=>(data[key]))
            })
        })
    }
    _onRefresh() {
        this.setState({refreshing: true});
        getDecks().then(data=>{
            console.log(data)
            this.setState({
                cards:Object.keys(data).map((key)=>(data[key])),
                refreshing:false
            })
        })
    }

    render(){
        const {cards}=this.state
        return(
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }
            >
                {this.state.cards.map(card=>(
                    <TouchableOpacity
                        style={styles.card}
                        onPress={()=>this.props.navigation.navigate('Deck',{card:card.title})}
                        key={card.title}
                    >
                        {console.log(card)}
                        <Text>{card.title}</Text>
                        <Text>{card.questions.length} {(card.questions.length>1)?'cards':'card'}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
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