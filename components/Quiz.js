import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  getDeck,
  clearLocalNotification,
  setLocalNotification,
} from '../utils/helpers';
import FlipCard from 'react-native-flip-card';

class Quiz extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.card} Quiz`,
  });

  constructor(props) {
    super(props);
    this.state = {
      details: [{ questions: [] }],
      currentQuestion: 1,
      correct: 0,
      showFinish: false,
    };
  }
  componentDidMount() {
    //retorna apenas o card recebido como 'card'.
    //então seta as questões no state 'details'.
    getDeck(this.props.navigation.state.params.card).then(data => {
      this.setState({
        details: data,
      });
    });
  }

  navigateToFinish = () => {
    this.setState(
      {
        showFinish: false,
      },
      () => {
        this.props.navigation.navigate('Finish', {
          score: this.state.correct,
          maximum: this.state.details[0].questions.length,
          card: this.props.navigation.state.params.card,
          count: this.props.navigation.state.params.count,
        });
      }
    );
  };

  render() {
    const { currentQuestion, details } = this.state;
    return (
      <View style={styles.container}>
        <Text>
          {'Pergunta nº '+ currentQuestion + ' de ' + details[0].questions.length}
        </Text>

        <FlipCard
          style={styles.card}
          friction={12}
          perspective={5}
          flipHorizontal={false}
          flipVertical={true}
          flip={false}
          clickable={true}
          onFlipEnd={(isFlipEnd) => { console.log('isFlipEnd', isFlipEnd) }}
        >

          {/* Frente/Pergunta */}
          <View style={styles.face}>
            <Text>Pergunta:</Text>
            <Text style={styles.question}>
              {details[0].questions.length > 0 &&
                details[0].questions[currentQuestion - 1].question}
            </Text>
          </View>

          {/* Back/Resposta */}
          <View style={styles.back}>
            <Text>Resposta:</Text>
            <Text style={styles.question}>
            {
              details[0].questions.length > 0 &&
              details[0].questions[currentQuestion - 1].answer}
            </Text>
          </View>

        </FlipCard>

        {/*Botão 'certo'*/}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'green' }]}
          onPress={() => {
            if (details[0].questions.length > currentQuestion) {
              this.setState({
                currentQuestion: this.state.currentQuestion + 1,
                correct: this.state.correct + 1,
                
              });
             
            } else {
              this.setState({
                correct: this.state.correct + 1,
                showFinish: true,
              })
              this.navigateToFinish()
            }

          
          }}
        >
          <Text style={styles.buttonText}>
            Certo
          </Text>
        </TouchableOpacity>

        {/*Botão 'certo'*/}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'red' }]}
          onPress={() => {
            if (details[0].questions.length > currentQuestion) {
              this.setState({
                currentQuestion: this.state.currentQuestion + 1,
              });
             
            } else {
              this.setState({
                showFinish: true,
              })
              this.navigateToFinish()
            }

          

          }}
        >
          <Text style={styles.buttonText}>
            Errado
          </Text>

        </TouchableOpacity>
        {details[0].questions.length > currentQuestion &&
          <TouchableOpacity
            onPress={() => {
              this.setState({ currentQuestion: this.state.currentQuestion + 1 });
            }}
          >
            <Text>Próximo</Text>
          </TouchableOpacity>}


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //flexDirection: ,
    //justifyContent: 'center',
    alignItems: 'center',
    //padding:20
  },
  question: {
    fontSize: 20,
    padding: 20,
    margin: 5,
    textAlign: 'center',
  },
  button: {
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: 'white',
  },
  face: {
    //maxHeight:60
    backgroundColor: '#6DA1E8',
  },
  back: {
    //maxHeight:60
    backgroundColor: '#E8E791',
  },
  card: {
    maxHeight: 150

  }
});

export default Quiz;
