const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const eventSchema = new Schema({
	name: String,
	description: String,
	type: [String],
	tags: [String],
	location: {
        venueName: String,
        city: String,
        country: String
    },
	dateAndTime: {
        date: Date,
        time: String
    },
	urlForTickets: String,
	img: String,
	owner: String,
	artistSiteUrl: String,
	owner: { type: Schema.Types.ObjectId, ref: "User" },
	followers: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

eventSchema.index({
	"name": 1,
	"description": 1,
	"type": 1,
	"tags": 1,
	"location.venueName": 1,
	"location.city": 1,
	"location.country": 1
})

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