import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {TabNavigator,StackNavigator} from 'react-navigation'
//components
import DeckList from './components/Decklist'
import NewDeck from './components/NewDeck'
import Deck from './components/Deck'
//utils
import {Constants} from 'expo'


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
        activeTintColor:'yellow',
        style:{
            backgroundColor:'blue'
        }
    }
})

//aqui eu seto o mapeamento para as paginas
const MainNavigator=StackNavigator({
    Home:{
        screen:Tabs,
        navigationOptions:{
            headerTintColor:'#fff',
            headerStyle:{
                backgroundColor:'#5487FF'
            },
            title:'FlashCards'
        }
    },
    Deck:{
        screen:Deck,
        navigationOptions:{
            headerTintColor:'#fff',
            headerStyle:{
                backgroundColor:'#5487FF'
            }
        }
    }
})

function UdaciStatusBar({backgroundColor,...props}){
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
            <UdaciStatusBar backgroundColor='orange'/>
          <MainNavigator/>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});