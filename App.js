import React from 'react';
import { StyleSheet, StatusBar, View, Image } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Constants, AppLoading, Asset } from 'expo'
//componentes
import DeckList from './components/Decklist'
import NewDeck from './components/NewDeck'
import Deck from './components/Deck'
import Quiz from './components/Quiz'
import Finish from './components/Finish'
import NewQuestion from './components/NewQuestion'

import { setLocalNotification } from './utils/helpers'



/**
 * TabNavigatoe é apenas a estrutura de abas, no caso de Tabs ela vai estar dentro
 * da screen Home que será setada em StackNavigator.
 */
const Tabs = TabNavigator({
    DeckList: {
        screen: DeckList,
        navigationOptions: {
            tabBarLabel: 'Decks'
        }
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'Novo Deck'
        }
    }
}, {
        tabBarOptions: {
            activeTintColor: '#fff',
            style: {
                backgroundColor: '#2D93FF'
            }
        }
    })

/**
 * mapeamento das telas
 */
const MainNavigator = StackNavigator({
    Home: {
        screen: Tabs,
        navigationOptions: {
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#0078FD'
            },
            title: 'Flash Cards'
        },
        animationEnabled: true
    },
    Deck: {
        screen: Deck,
        navigationOptions: {
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#0078FD'
            }
        }
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#0078FD'
            }
        }
    },
    Finish: {
        screen: Finish,
        navigationOptions: {
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#0078FD'
            }
        }
    },
    NewQuestion: {
        screen: NewQuestion,
        navigationOptions: {
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#0078FD'
            }
        }
    }
})

/**
 * 
 * Esse é o componente que será o topo do app
 * (na camada de baixo onde aparece a hora/bateria etc)
 */
function UdaciStatusBar({ backgroundColor, ...props }) {
    //console.log('------------>',Constants.statusBarHeight)
    return (
        <View style={{
            backgroundColor: backgroundColor,
            height: Constants.statusBarHeight
        }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}


export default class App extends React.Component {

    state = {
        isReady: false,
    };

    componentDidMount() {
        //console.log('App.js > componentDidMount')
        this.setState({ isReady: false })
        setLocalNotification()
    }

    render() {

        //retorno enquanto carrega
        if (!this.state.isReady) {

            return (

                <AppLoading
                    startAsync={this._cacheResourcesAsync}
                    onFinish={() => this.setState({ isReady: true })}
                    onError={console.warn}
                />
            );
        }
        //retorno depois que carregou
        return (

            <View style={{ flex: 1 }}>
                <UdaciStatusBar backgroundColor="#0078FD" />
                <MainNavigator />
            </View>
        )

    }//render
    async _cacheResourcesAsync() {
        const images = [
            require('./assets/images/expo-icon.png'),

        ];

        const cacheImages = images.map((image) => {
            return Asset.fromModule(image).downloadAsync();
        });
        return Promise.all(cacheImages)

    }

}//class

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})