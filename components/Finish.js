import React from 'react'
import {Text,View,StyleSheet} from 'react-native'

class Finish extends React.Component{
    static navigationOptions=({navigation})=>({
        title:'Quiz Finalizado!'
    })
    render(){
        //console.log(this.props.navigation.state.params)

        return(

            <View style={styles.container}>
                <Text style={{fontSize:24,textAlign:'center'}}>Olá!</Text>
                <Text style={{textAlign:'center'}}> Sua pontuação foi: </Text>

                <View style={styles.score}>
                    <Text style={{textAlign:'center',fontSize:40}}>{this.props.navigation.state.params.score} / {this.props.navigation.state.params.maximum}</Text>
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        padding:20
    },
    score:{
        
    }
})

export default Finish