const mongoose = require("mongoose");

const favPlant = mongoose.Schema({
  username: { type: String },
  favPlantArray: { type: Array, require: true },
  plantId: { type: Number},
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

// You must export your model through module.exports

module.exports = mongoose.model("favPlant", favPlant);
