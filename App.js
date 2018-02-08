import React from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import {TabNavigator,StackNavigator} from 'react-navigation'
import DeckList from './components/Decklist'
import NewDeck from './components/NewDeck'
import Deck from './components/Deck'
import Quiz from './components/Quiz'
import {Constants} from 'expo'
import Finish from './components/Finish'
import NewQuestion from './components/NewQuestion'

const Tabs=TabNavigator({
    DeckList:{
        screen:DeckList,
        navigationOptions:{
            tabBarLabel:'Decks'
        }
    },
    NewDeck:{
        screen:NewDeck,
        navigationOptions:{
            tabBarLabel:'New Deck'
        }
    }
},{
    tabBarOptions:{
        activeTintColor:'#fff',
        style:{
            backgroundColor:'#b71845'
        }
    }
})

const MainNavigator=StackNavigator({
    Home:{
        screen:Tabs,
        navigationOptions:{
            headerTintColor:'#fff',
            headerStyle:{
                backgroundColor:'#b71845'
            },
            title:'FlashCards'
        }
    },
    Deck:{
        screen:Deck,
        navigationOptions:{
            headerTintColor:'#fff',
            headerStyle:{
                backgroundColor:'#b71845'
            }
        }
    },
    Quiz:{
        screen:Quiz,
        navigationOptions:{
            headerTintColor:'#fff',
            headerStyle:{
                backgroundColor:'#b71845'
            }
        }
    },
    Finish:{
        screen:Finish,
        navigationOptions:{
            headerTintColor:'#fff',
            headerStyle:{
                backgroundColor:'#b71845'
            }
        }
    },
    NewQuestion:{
        screen:NewQuestion,
        navigationOptions:{
            headerTintColor:'#fff',
            headerStyle:{
                backgroundColor:'#b71845'
            }
        }
    }
})

function UdaciStatusBar({backgroundColor,...props}) {
    return(
        <View style={{backgroundColor:backgroundColor,height:Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
        </View>
    )
}

export default class App extends React.Component {
  render() {
    return (
        <View style={{flex:1}}>
            <UdaciStatusBar backgroundColor="#b71845"/>
            <MainNavigator/>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})