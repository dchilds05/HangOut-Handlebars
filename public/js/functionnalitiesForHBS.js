

function favEvent (eventId) {
return function(event){
    axios.post(`/event/${eventId}/fav`)
    console.log("returns: ")
    console.log("save button clicked!!")
}
}

 

