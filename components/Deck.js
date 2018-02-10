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
               
               {/*'cards' é um dos parâmetros passados quando ocorreu o redirect na tela de criação de um novo card (veja NewDeck.js) --> this.props.navigation.navigate('Deck',{card:this.state.title,count:0}*/}
                <Text style={styles.title}>
                    {this.props.navigation.state.params.card}
                </Text>

                {/*'count=0 foi o outro parâmetro'*/}
                <Text>
                    {this.props.navigation.state.params.count
                    ?
                        (this.props.navigation.state.params.count+(this.props.navigation.state.params.count>1
                            ?' cards no deck'
                            :' card no deck'))
                    :
                            'Seleciona uma ação:'
                    }
                </Text>
                    <TouchableOpacity
                        style={[styles.button,{backgroundColor:'blue'}]}
                        onPress={()=>{this.props.navigation.navigate('NewQuestion',{card: this.props.navigation.state.params.card,count:this.state.details[0].questions.length})}}
                    >
                        <Text style={{color:'white'}}>Adicionar Card</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button,{backgroundColor:'blue'}]}
                        onPress={() => this.props.navigation.navigate('Quiz', {card:this.props.navigation.state.params.card,count:this.state.details[0].questions.length})}
                    >
                        <Text style={{color:'white'}}>Iniciar Quiz</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button,{backgroundColor:'blue'}]}
                        onPress={() => this.props.navigation.navigate('Home')}
                    >
                        <Text style={{color:'white'}}>Voltar</Text>
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