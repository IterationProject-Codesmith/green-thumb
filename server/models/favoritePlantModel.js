const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const PlantSchema = new Schema({
  // username: { type: String },
  favPlantArray: { type: Array },
  plantId: { type: Number, required: true, unique: true},
  commonName: { type: String},
  watering: { type: String },
  // frontend should be aware that this is an object and will have to create a deep clone
  // wateringGeneralBenchMark: { type: Object},
  sunlight: { type: Array },
  // careGuide: { type: String},
  careLevel: { type: String },
  // poisonousToPet: { type: Boolean},
  // poisonousToHuman: { type: Boolean},
  imageUrl: { type: String },
  // description: { type: String},
  // indoor: { type: Boolean}
  comments: { type: String },
});


// const plantSchema = new Schema({
//   plantId: { type: Number, required: true, unique: true },
//   commonName: { type: String, required: true },
//   watering: { type: String },
//   sunlight: { type: [String] }, // array of strings for sunlight conditions
//   careLevel: { type: String },
//   imageUrl: { type: String },
//   comments: { type: String },
// });

const favPlantSchema = new Schema({
  username: { type: String, required: true, unique: true },
  favPlantArray: { type: [PlantSchema] }, // embedding the plant schema in an array
});



const favPlants = mongoose.model("favPlants", favPlantSchema)

// module.exports = Student;

module.exports = favPlants

// module.exports = mongoose.model("favPlant", favPlant);




