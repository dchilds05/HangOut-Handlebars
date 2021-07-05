function convertTmData (TmObject) {
    let newObject = {};

    newObject.name = TmObject.name;
    newObject.description = "";
    newObject.type = [TmObject.type];
    newObject.tags = [
        TmObject.classifications[0].segment.name, 
        TmObject.classifications[0].genre.name, 
        TmObject.classifications[0].subGenre.name
    ];
    newObject.location = {
        venueName: TmObject._embedded.venues[0].name,
        city: TmObject._embedded.venues[0].city.name,
        country: TmObject._embedded.venues[0].country.name
    };
    newObject.date = {
        date: TmObject.dates.start.localDate ? TmObject.dates.start.localDate : "",
        time: TmObject.dates.start.localTime ? TmObject.dates.start.localTime : "" 
    }
    newObject.urlForTickets = TmObject.url;
    newObject.img = TmObject.images[0].url;
    newObject.owner = "Ticketmaster";
    
    if(TmObject._embedded.attractions[0].externalLinks){
        newObject.artistSiteUrl = TmObject._embedded.attractions[0].externalLinks.homepage[0].url
     } else{
        newObject.artistSiteUrl = "";
     }

    return newObject;
}

module.exports = convertTmData;