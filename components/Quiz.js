import React from 'react'
import {Text,View,StyleSheet,TouchableOpacity} from 'react-native'
import {getDeck} from '../utils/helpers'

class Quiz extends React.Component{


    static navigationOptions=({navigation})=>({
        title:`Attempt ${navigation.state.params.card} Quiz`
    })



    constructor(props){
        super(props)
        this.state={
            details:[{questions:[]}],
            currentQuestion:1,
            showAnswer:false,
            correct:0,
            showFinish:false
        }
    }


    componentDidMount(){
        console.log('Quiz.js > componentDidMount() ',this.props)

        //chamar getDeck passando o nome do card, o getDeck em helpers.js
        // vai filtrar o resultadousando esse nome.
        this.setState({
            details:getDeck(this.props.navigation.state.params.card)
        })
    }



    render(){
        const {currentQuestion,details} = this.state
        console.log('Quiz.js > render() > questão: ',details[0].questions)

        return(
            <View style={styles.container}>
                <Text>
                    {currentQuestion + '/' + details[0].questions.length}
                </Text>
                <Text style={styles.question}>
                    {(details[0].questions.length>0)&&
                        details[0].questions[currentQuestion-1].question
                    }
                </Text>

                {(this.state.showAnswer)
                ?
                    <TouchableOpacity
                        onPress={()=>{this.setState({showAnswer:false})}}
                    >
                        <Text>Questão</Text>
                    </TouchableOpacity>
                :
                    <TouchableOpacity
                        onPress={()=>{this.setState({showAnswer:true})}}
                    >
                        <Text>Resposta</Text>
                    </TouchableOpacity>
                }
                <Text style={{padding:20}}>
                    {this.state.showAnswer&&
                        details[0].questions[currentQuestion-1].answer
                    }
                </Text>
                <TouchableOpacity
                    style={[styles.button,{backgroundColor:'green'}]}
                    onPress={()=>{
                        if(details[0].questions.length>currentQuestion){
                            this.setState({
                                correct:this.state.correct+1,
                                currentQuestion:this.state.currentQuestion+1
                            })
                        }
                        else{
                            this.setState({
                                correct:this.state.correct+1,
                                showFinish:true
                            })
                        }
                    }}
                >
                    <Text style={styles.buttonText}>Correto!</Text>



                </TouchableOpacity>


                <TouchableOpacity
                    style={[styles.button,{backgroundColor:'red'}]}
                    onPress={()=>{
                        if(details[0].questions.length>currentQuestion){
                            this.setState({
                                currentQuestion:this.state.currentQuestion+1
                            })
                        }
                        else{
                            this.setState({
                                showFinish:true
                            })
                        }
                    }}
                >
                    <Text style={styles.buttonText}>
                        incorreto
                    </Text>

                    
                </TouchableOpacity>
                {(details[0].questions.length>currentQuestion)&&
                    <TouchableOpacity
                        onPress={()=>{this.setState({currentQuestion:this.state.currentQuestion+1})}}
                    >
                        <Text>Próximo</Text>
                    </TouchableOpacity>
                }

                {(this.state.showFinish)&&
                    <TouchableOpacity
                        onPress={()=>{
                            this.props.navigation.navigate('Finish',{score:this.state.correct,maximum:this.state.details[0].questions.length})
                        }}
                    >
                        <Text>Finish</Text>
                   </TouchableOpacity>
                }
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        alignItems:'center'
    },
    question:{
        fontSize:24,
        padding:20,
        textAlign:'center'
    },
    button:{
        padding: 15,
        paddingLeft: 35,
        paddingRight: 35,
        height: 45,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        margin:15
    },
    buttonText:{
        color:'white'
    }
})

export default Quiz