import { AsyncStorage } from "react-native";

export function fetchDecks(){

  //console.log('api.js -> fetchDecks()')
  let res = AsyncStorage
  .getItem('alldecks')
  .then(JSON.parse)
  .then((data)=>{
    if(data === null){
      console.log('vai terotnr um false')
     return false
    }else{
      return data
    }

  })
  

}

