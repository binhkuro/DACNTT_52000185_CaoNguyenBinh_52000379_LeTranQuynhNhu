let mongoose = require("mongoose");

mongoose.Promise = global.Promise;
let Schema = mongoose.Schema;

let petSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    petPicture: String,
    age: Number,
    type: String,
    species: String,
    gender: String,
    color: String,
    special: String,
    username: {
        type: String,
        required: true
    }
});

let Pet = mongoose.model("Pet", petSchema);
module.exports = Pet;