import React from 'react'
import {Text,View,StyleSheet,TouchableOpacity,TextInput} from 'react-native'
import {addCardToDeck} from '../utils/helpers'

class NewQuestion extends React.Component{
    static navigationOptions=({navigation})=>({
        title:`Add card in ${navigation.state.params.card}`
    })
    state={
        question:'',
        answer:''
    }
    render(){
        return(
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder='Question'
                    value={this.state.question}
                    onChangeText={(text)=>{this.setState({question:text})}}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Answer'
                    value={this.state.answer}
                    onChangeText={(text)=>{this.setState({answer:text})}}
                />
                <TouchableOpacity
                    style={[styles.button,{backgroundColor:'green'}]}
                    onPress={()=>{addCardToDeck(this.props.navigation.state.params.card,this.state.question,this.state.answer)}}
                >
                    <Text style={{color:'white'}}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles=StyleSheet.create({
    container:{
        flex:2,
        flexDirection:'column',
        alignItems:'center',
        padding:20
    },
    input:{
        width:200,
        padding:10
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
    }
})

export default NewQuestion