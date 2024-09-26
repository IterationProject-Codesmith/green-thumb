const mongoose = require('mongoose');

const user = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favPlants: { type: Array},
  comments: {type: String}
});



// You must export your model through module.exports
// The collection name should be 'student'
module.exports = mongoose.model('user', user);
