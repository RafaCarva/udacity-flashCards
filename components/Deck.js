
import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import {getDeck} from '../utils/helpers'

class Deck extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: `${navigation.state.params.card}`
    })
    render() {
        return (
            <View style={styles.page}>



                <Text style={styles.title}>
                    {this.props.navigation.state.params.card}
                </Text>

                <Text>
                    {this.props.navigation.state.params.count} {this.props.navigation.state.params.count>1?'cards':'card'} in the deck.
                </Text>

                <TouchableOpacity
                    style={[styles.button,{backgroundColor:'blue'}]}
                    onPress={()=>{this.props.navigation.navigate('NewQuestion',{card: this.props.navigation.state.params.card})}}
                >
                    <Text style={{color:'white'}}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button,{backgroundColor:'blue'}]}
                    onPress={() => this.props.navigation.navigate('Quiz', {card: this.props.navigation.state.params.card,count:this.props.navigation.state.params.count})}
                >
                    <Text style={{color:'white'}}>Start Quiz</Text>
                </TouchableOpacity>
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