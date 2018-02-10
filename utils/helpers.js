import {AsyncStorage} from 'react-native'
import {Notifications,Permissions} from 'expo'

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

const flashkey='@flashCard:key'

export function getDecks() {
    // pega a lista de decks
    return AsyncStorage.getItem(flashkey).then((data) => {
       // console.log('retorno de getItem!',data)

       //se for != de null já existe um obj no storage, então retorna esse obj
        if(JSON.parse(data)!==null) {
            return JSON.parse(data)
        }
        else{
            //se for == a null crie/insira essa lista de deck 'local' no storage, em seguida retorne ele.
            AsyncStorage.setItem(flashkey,JSON.stringify(decks))
            return AsyncStorage.getItem(flashkey).then((data)=>{
                //console.log('lista default: ',data)
                return JSON.parse(data)
            })
        }
    })
}

export function getDeck(title){
    console.log(title)
    // 1º busca todos os deck, depois retorna o resultado de um filter (title) 
    return getDecks().then((data)=>{
        let newArray=Object.keys(data).map((key)=>(data[key]))
        //console.log(newArray)
        //console.log(newArray.filter((result)=>result.title===title))
        return newArray.filter((result)=>result.title===title)
    })
}

/**
 * Essa função será chamada ao setar o título de um novo deck
 */
export function saveDeckTitle(title){
    
    //'mergeItem' vai incrementar o objeto no storage com esse objeto montado no 2ª atributo enviado.
    return AsyncStorage.mergeItem(
        flashkey,
        JSON.stringify({[title]:{
            title,
            questions:[]
        }})
    )
}


/**
*Essa função será chamada em NewQuestions.js quando se clicar no submit da nova pergunta criada.
*/
export function addCardToDeck(title, question,answer){

   // console.log(title,question,answer)
    getDeck(title).then(data=>{
        const allOtherQuestions=data
        //console.log('All other questions',allOtherQuestions[0].questions)
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

const NOTIFICATION_KEY='flashcards:notifications'

export function clearLocalNotification() {
    
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function createNotification() {
    return{
        title:"Que tal fazedr um quiz hoje?",
        body:"Você não fez nenhum quiz hoje!",
        android:{
            sound:true,
            priority:'high',
            sticky:false,
            vibrate:true
        }
    }
}

/**
 * setLocalNotification() será chamado ao iniciar o app (no componentDidMount de app.js)
 */
export function setLocalNotification() {
    console.log('helpers.js > setLocalNotification()')

    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then((data)=>{
            //console.log('-->retorno do getItem :', data)
            return JSON.parse(data)
        })
        .then(data=>{
            if(data===null){
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({status})=>{
                        if(status==='granted'){
                            Notifications.cancelAllScheduledNotificationsAsync()
                            let tomorrow=new Date()
                            tomorrow.setDate(tomorrow.getDate()+1)
                            tomorrow.setHours(20)
                            tomorrow.setMinutes(0)

                            Notifications.scheduleLocalNotificationAsync(
                                
                                //vai retornar os dados da notificação 
                                createNotification(),
                                {
                                    time:tomorrow,
                                    repeat:'day'
                                }
                            )
                            AsyncStorage.setItem(NOTIFICATION_KEY,JSON.stringify(true))
                        }
                    })
            }
        })
}
