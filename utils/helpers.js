import {AsyncStorage} from 'react-native'


const decks={
    React:{
        title:'React',
        questions:[
            {
                question:'What is React?',
                answer:'A library for managing user interfaces'
            },
            {
                question:'Where do you make AJAX requests in React?',
                answer:'The componentDidMount lifecycle event'
            }
        ]
    },
    Javascript:{
        title:'Javascript',
        questions:[
            {
                question:'What is a closure?',
                answer:'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    },
    Movies:{
        title:'Movies',
        questions:[
            {
                question:'Must you talk about Fight Club?',
                answer:'You mustn\'t'
            }
        ]
    }
}


/**
 * retorna o deck inicial da const decks
 */
export function getDecks() {
    return decks
}

/**
 * retorna todos os decks em seguida filtra pelo nome do deck
 * recebido como parâmetro
 */
export function getDeck(title){
   console.log('-->helpers.js ',title)

   //gera um array com os nós 'pais'
   const newArray=Object.keys(decks).map((deck)=>(decks[deck]))

   return newArray.filter((result)=>result.title===title)
}

const flashkey='@flashCard:key'

export function saveDeckTitle(title){
    // Adds a new deck.
    AsyncStorage.mergeItem(flashkey,[getDecks(),AsyncStorage.getItem(flashkey),{title:title,questions:[]}])
}

export function addCardToDeck(title, card){
    // Adds a question to the title.
    const newTitle=getDeck(title)
    const relevant=newTitle[0]
    relevant.questions.push(card)
    AsyncStorage.mergeItem(flashkey,[getDecks(),AsyncStorage.getItem(flashkey),relevant])
}