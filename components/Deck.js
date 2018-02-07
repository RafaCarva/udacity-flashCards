import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import {getDeck} from '../utils/helpers'

class Deck extends React.Component{

    static navigationOptions=({navigation})=>({
        title:`${navigation.state.params.card}`
    })

    render(){

        return(
                <View style={styles.page}>

                    <Text style={styles.title}>
                        {this.props.navigation.state.params.card}
                    </Text>

                    <TouchableOpacity style={styles.button}>
                        <Text style={{color:'white'}}>Add Cardddddd</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} 
                    onPress={()=>this.props.navigation.navigate('Quiz',{card:this.props.navigation.state.params.card})}>
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
        backgroundColor:'blue',
        padding:20,
        margin:10
    }
})

export default Deck