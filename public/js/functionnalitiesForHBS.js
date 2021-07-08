function favEvent (eventId) {
return function(event){
    axios.post(`/event/${eventId}/fav`)
    console.log("returns: ")
    console.log("save button clicked!!")
}
}

 // Your code here.
    //If you don't want the link to actually 
    // redirect the browser to another page,
    // "google.com" in our example here, then
    // return false at the end of this block.
    // Note that this also prevents event bubbling,
    // which is probably what we want here, but won't 
    // always be the case.
    


