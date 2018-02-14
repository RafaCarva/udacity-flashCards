import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  getDeck,
  clearLocalNotification,
  setLocalNotification,
} from '../utils/helpers';

class Quiz extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.card} Quiz`,
  });

  constructor (props) {
    super (props);
    this.state = {
      details: [{questions: []}],
      currentQuestion: 1,
      showAnswer: false,
      correct: 0,
      showFinish: false,
    };
  }
  componentDidMount () {
    //retorna apenas o card recebido como 'card'.
    //então seta as questões no state 'details'.
    getDeck (this.props.navigation.state.params.card).then (data => {
      this.setState ({
        details: data,
      });
    });
  }

  navigateToFinish = () => {
    this.setState (
      {
        showFinish: false,
      },
      () => {
        this.props.navigation.navigate ('Finish', {
          score: this.state.correct,
          maximum: this.state.details[0].questions.length,
          card: this.props.navigation.state.params.card,
          count: this.props.navigation.state.params.count,
        });
      }
    );
  };

  render () {
    const {currentQuestion, details} = this.state;
    return (
      <View style={styles.container}>
        <Text>
          {currentQuestion + '/' + details[0].questions.length}
        </Text>

        <Text style={styles.question}>
          {!this.state.showAnswer
            ? details[0].questions.length > 0 &&
                details[0].questions[currentQuestion - 1].question
            : details[0].questions[currentQuestion - 1].answer}
        </Text>
        {this.state.showAnswer
          ? <TouchableOpacity
              onPress={() => {
                this.setState ({showAnswer: false});
              }}
            >
              <Text>Pergunta</Text>
            </TouchableOpacity>
          : <TouchableOpacity
              onPress={() => {
                this.setState ({showAnswer: true});
              }}
            >
              <Text>Resposta</Text>
            </TouchableOpacity>}

        <TouchableOpacity
          style={[styles.button, {backgroundColor: 'green'}]}
          onPress={() => {
            if (details[0].questions.length > currentQuestion) {
              this.setState ({
                correct: this.state.correct + 1,
                currentQuestion: this.state.currentQuestion + 1,
              });
            } else {
              this.setState ({
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
        <TouchableOpacity
          style={[styles.button, {backgroundColor: 'red'}]}
          onPress={() => {
            if (details[0].questions.length > currentQuestion) {
              this.setState ({
                currentQuestion: this.state.currentQuestion + 1,
              });
            } else {
              this.setState ({
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
              this.setState ({currentQuestion: this.state.currentQuestion + 1});
            }}
          >
            <Text>Próximo</Text>
          </TouchableOpacity>}

       
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  question: {
    fontSize: 24,
    padding: 20,
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
});

export default Quiz;
