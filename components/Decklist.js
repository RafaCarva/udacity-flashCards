import React from 'react'
import {Text,StyleSheet,TouchableOpacity,ScrollView,RefreshControl,View} from 'react-native'
import {getDecks} from '../utils/helpers'
import {AppLoading} from 'expo'

class Decklist extends React.Component{
    constructor(props){
        super(props)
        this.state={
            cards:[{title:'',questions:[]}],
            refreshing:false,
            loading:true
        }
    }
    fetchDecks=()=>{
        getDecks().then(data=>{

            this.setState({
                cards:Object.keys(data).map((key)=>(data[key])),
                refreshing:false,
                loading:false
            })
        }).catch(err=>console.error(err))
    }
    _onRefresh() {
        this.setState({refreshing: true});
        this.fetchDecks()
    }
    componentWillMount(){
        this.setState({
            loading:true
        })
        this.fetchDecks()
    }
    componentDidUpdate(){
        this.fetchDecks()
    }
    render(){
        const {cards,loading}=this.state

        if(loading){
            return(
                <View>
                    <Text>Loading...</Text>
                    <AppLoading/>
                </View>
            )
        }
        else{
            return(
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                >
                    {cards.map(card=>(
                        <TouchableOpacity
                            style={styles.card}
                            onPress={()=>this.props.navigation.navigate('Deck',{card:card.title,count:card.questions.length})}
                            key={card.title}
                        >
                            <Text style={styles.title}>{card.title}</Text>
                            <Text>{card.questions.length} {(card.questions.length>1)?'cards':'card'}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )
        }

    }
}

const styles=StyleSheet.create({
    card:{
        borderBottomWidth:2,
        borderBottomColor:'grey',
        alignItems:'center',
        padding:15,
        margin:5
    },
    title:{
        fontWeight:'bold'
    }
})

export default Decklist