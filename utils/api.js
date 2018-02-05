import { AsyncStorage } from "react-native";

export function fetchDecks(){

  //console.log('api.js -> fetchDecks()')
  let res = AsyncStorage
  .getItem('allDecks')
  .then(JSON.parse)
  .then((data)=>{
    if(data === null){
      console.log('vai retornar um false')
     return false
    }else{
      console.log('vai retornar o objeto: ',data)
      return data
    }

  })
  

}

export function saveDeck(deckName){
//console.log('entrou em saveDeck ->',title)

AsyncStorage
  .getItem('allDecks')
  .then(JSON.parse)
  .then((data)=>{
    if(data === null){
      //não existe nenhum, deck então vai gravar um do 0
      console.log('-->vai gravar o deck do 0')
      let obj=[
           { 'title':deckName,
            'questions': []}
      ]

console.log('------>',JSON.stringify(obj.allDecks))


AsyncStorage.setItem("allDecks",JSON.stringify({obj}));

    }else{
      //já existe deck então vai só add mais esse 
      console.log('-->vai add o deck no obj que já existe')
      
    }

  })

}


/*
formato do json

allDecks={
  deck1:{
    title:'deck1',
    questions:[
      {question:'pergunta1',answer:'resposta1'},
      {question:'pergunta2',answer:'resposta2'},
      {question:'pergunta3',answer:'resposta3'}
    ]
  }
  deck2:{
    title:'deck2',
    questions:[
      {question:'pergunta1',answer:'resposta1'},
      {question:'pergunta2',answer:'resposta2'},
      {question:'pergunta3',answer:'resposta3'}
    ]
  }

}


*/