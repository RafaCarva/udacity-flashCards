import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import {getDeck} from '../utils/helpers'

class Deck extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: `${navigation.state.params.card}`
    })
    state={
        details:[
            {
                questions:[]
            }
        ]
    }
    getDetails=()=>{
        getDeck(this.props.navigation.state.params.card).then((data)=>{
            this.setState({
                details:data
            })
        })
    }
    componentDidMount(){
        this.getDetails()
    }
    onRefresh=()=>{
        this.getDetails()
    }
    render() {
        return (
            <View style={styles.page}>
                <Text style={styles.title}>
                    {this.props.navigation.state.params.card}
                </Text>
                <Text>
                    {this.props.navigation.state.params.count?
                        (this.props.navigation.state.params.count+(this.props.navigation.state.params.count>1?' cards in the deck':' card in the deck'))
                    :
                        //(this.state.details[0].questions.length+(this.state.details[0].questions.length>1?' cards in the deck':' card in the deck'))
                        'Hello!'
                        // {this.state.details[0].questions.length} {this.state.details[0].questions.length>1?'cards':'card'} in the deck.
                    }
                </Text>
                    <TouchableOpacity
                        style={[styles.button,{backgroundColor:'blue'}]}
                        onPress={()=>{this.props.navigation.navigate('NewQuestion',{card: this.props.navigation.state.params.card,count:this.state.details[0].questions.length})}}
                    >
                        <Text style={{color:'white'}}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button,{backgroundColor:'blue'}]}
                        onPress={() => this.props.navigation.navigate('Quiz', {card:this.props.navigation.state.params.card,count:this.state.details[0].questions.length})}
                    >
                        <Text style={{color:'white'}}>Start Quiz</Text>
                    </TouchableOpacity>
                    {/*<TouchableOpacity*/}
                        {/*style={[styles.button,{backgroundColor:'green'}]}*/}
                        {/*onPress={this.onRefresh}*/}
                    {/*>*/}
                        {/*<Text style={styles.buttonText}>Refresh</Text>*/}
                    {/*</TouchableOpacity>*/}
            </View>
        )
    }
}

const styles=StyleSheet.create({
    page:{
        flex:1,
        alignItems:'center',
        flexDirection:'column'
    },
    title:{
        fontSize:24,
        textAlign:'center',
        marginTop:30
    },
    button:{
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        margin:10
    },
    buttonText:{
        color:'white'
    }
})

export default Deck