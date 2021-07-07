//arrayFromDB = [{event1} , {event2}, etc]
//searchParams = keyword, city, date

const mongoose = require("mongoose");
const Event = require("../models/Event.model");




function findByValue (value) {
    console.log("Search is: ", value)

    let keywordsArr = value.split(" ");
    let results = [];


    keywordsArr.forEach(keyword => {
        Event.find()
        .or([
        { name: new RegExp(keyword, "i")}, 
        { description: new RegExp(keyword, "i")}
        ])
        .then(events => {
            results.push(...events)
        })
        .catch(err => console.log("error" , err))
    })

/*     if (keywordArr.length > 1 && object is there only once) {
        remove that object from the array
    } */
    
    //then take duplicates out
    return new Set(results)


} 









/* 
 
function findByValue (value) {
    console.log("Search is: ", value)

    let arr = value.split(" ");
    let arrKey = [];


    arr.forEach(value => {
        Event.find()
        .or([
        { name: new RegExp(value, "i")}, 
        { description: new RegExp(value, "i")}
        ])
        .then(events => {
        console.log("regexp result",events)
        events.forEach(element => arrKey.push(element))
        console.log(arrKey);
        })
    
        .catch(err => console.log("error" , err))
    })

} 

 */


/*
.then(arrkey => {
    arrkey.filter((val,index,arr) => arr.findIndex(t => (t._id === val._id))===index)
    console.log("filter result",arrkey)
    return arrKey;
})

    .then(arrkey => {
        arrkey.filter((val,index,arr) => arr.findIndex(t => (t._id === val._id))===index)
        console.log("filter result",arrkey)
        return arrKey;
    })





function findByValue (val) {
    let arr = val.split(" ");
    let arrKey = [];
    console.log(arr)
    arr.forEach(value => {

        arrKey.push( new RegExp(value, "i") )
        console.log("arrKey", arrKey)

    })
    
    if (arr.length < 2) {
        findAnEvent(val)
    //const keyword = searchParams
    } else {
        arr.forEach(value => {

            arrKey.push( new RegExp(value, "i") )
            console.log("arrKey", arrKey)

        })
        
        console.log("next") 
    }


  query.$or = arrKey
}*/

module.exports = findByValue;

//new RegExp(val) 

/* 
let arr = []
let arrKey = []
// key contains spaces to split keywords for search
if (params.key.indexOf(' ') !== -1) {
  arr = params.key.split(' ')
  arr.forEach(akey => {
    arrKey.push({
      keys: {
        $regex: akey,
        $options: 'gi'
      }
    })
  })
} else {
  arrKey = [{
    keys: {
      $regex: params.key,
      $options: 'gi'
    }
  }]
}
 */