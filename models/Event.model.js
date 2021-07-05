const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const eventSchema = new Schema({
	name: String,
	description: String,
	type: Array,
	tags: Array,
	location: {
        venueName: String,
        city: String,
        country: String
    },
	date: {
        date: String,
        time: String
    },
	urlForTickets: String,
	img: String,
	owner: String,
	artistSiteUrl: String
});

const Event = model("Event", eventSchema);

module.exports = Event;




/* event {
	name:""
	description:""
	type: [ ]
	tags: [ ]
	location: { }
	date: { }
	urlfortickets:
	img:
	owner: /default : TM
	extUrl:
	
}
 */