import React from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import {TabNavigator,StackNavigator} from 'react-navigation'
import {Constants} from 'expo'
//componentes
import DeckList from './components/Decklist'
import NewDeck from './components/NewDeck'
import Deck from './components/Deck'
import Quiz from './components/Quiz'
import Finish from './components/Finish'
import NewQuestion from './components/NewQuestion'

import {setLocalNotification} from './utils/helpers'



/**
 * TabNavigatoe é apenas a estrutura de abas, no caso de Tabs ela vai estar dentro
 * da screen Home que será setada em StackNavigator.
 */
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
            tabBarLabel:'Novo Deck'
        }
    }
},{
    tabBarOptions:{
        activeTintColor:'#fff',
        style:{
            backgroundColor:'#2D93FF'
        }
    }
})

/**
 * mapeamento das telas
 */
const MainNavigator=StackNavigator({
    Home:{
        screen:Tabs,
        navigationOptions:{
            headerTintColor:'#fff',
            headerStyle:{
                backgroundColor:'#0078FD'
            },
            title:'Flash Cards'
        },
        animationEnabled:true
    },
    Deck:{
        screen:Deck,
        navigationOptions:{
            headerTintColor:'#fff',
            headerStyle:{
                backgroundColor:'#0078FD'
            }
        }
    },
    Quiz:{
        screen:Quiz,
        navigationOptions:{
            headerTintColor:'#fff',
            headerStyle:{
                backgroundColor:'#0078FD'
            }
        }
    },
    Finish:{
        screen:Finish,
        navigationOptions:{
            headerTintColor:'#fff',
            headerStyle:{
                backgroundColor:'#0078FD'
            }
        }
    },
    NewQuestion:{
        screen:NewQuestion,
        navigationOptions:{
            headerTintColor:'#fff',
            headerStyle:{
                backgroundColor:'#0078FD'
            }
        }
    }
})

/**
 * 
 * Esse é o componente que será o topo do app
 * (na camada de baixo onde aparece a hora/bateria etc)
 */
function UdaciStatusBar({backgroundColor,...props}) {
    //console.log('------------>',Constants.statusBarHeight)
    return(
        <View style={{backgroundColor:backgroundColor,
                      height:Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
        </View>
    )
}


export default class App extends React.Component {


componentDidMount(){
    //console.log('App.js > componentDidMount')
    setLocalNotification()
}

  render() {
    return (
        <View style={{flex:1}}>
            <UdaciStatusBar backgroundColor="#0078FD"/>
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