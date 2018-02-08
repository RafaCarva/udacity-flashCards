import {AsyncStorage} from 'react-native'

let decks={
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

const flashkey='@flashkard:key'

export function getDecks() {
    // List of all decks. Titles, Questions and Answers.
    return AsyncStorage.getItem(flashkey).then((data) => {
        console.log('dados do helper',data)
        if(JSON.parse(data)!==null) {
            return JSON.parse(data)
        }
        else{
            AsyncStorage.setItem(flashkey,JSON.stringify(decks))

            return AsyncStorage.getItem(flashkey).then((data)=>{
                console.log(data)
                return JSON.parse(data)
            })
        }
    })

}

export function getDeck(title){
    console.log(title)
    // Find the deck corresponding to the title from getDecks and return it.
    return getDecks().then((data)=>{
        let newArray=Object.keys(data).map((key)=>(data[key]))
        console.log(newArray)
        console.log(newArray.filter((result)=>result.title===title))
        return newArray.filter((result)=>result.title===title)
    })
}


export function saveDeckTitle(title){
    // Adds a new deck.
    console.log(title)
    return AsyncStorage.mergeItem(
        flashkey,
        JSON.stringify({[title]:{
            title,
            questions:[]
        }})
    )
}



export function addCardToDeck(title, question,answer){
    // Adds a question to the title.
    // Hope and pray this works.
    console.log(title,question,answer)
    getDeck(title).then(data=>{
        const allOtherQuestions=data
        console.log('All other questions',allOtherQuestions[0].questions)
        if(allOtherQuestions[0].questions.length>0){
            AsyncStorage.mergeItem(
                flashkey,
                JSON.stringify({
                    [title]:{
                        title,
                        questions:[...allOtherQuestions[0].questions,{question,answer}]
                    }
                })
            )
        }
        else{
            AsyncStorage.mergeItem(
                flashkey,
                JSON.stringify({
                    [title]:{
                        title,
                        questions:[{question,answer}]
                    }
                })
            )
        }
    })
}