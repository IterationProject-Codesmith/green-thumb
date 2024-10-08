const express = require('express'); //requires in express
const path = require('path'); //requires in path for better path's
//body-parser
const app = express(); //makes a express app
const mongoose = require('mongoose'); //requires in mongoose
require('dotenv').config();
const userController = require(path.join(
  __dirname,
  './Controllers/userController.js'
));
const plantController = require(path.join(
  __dirname,
  './Controllers/plantController.js'
));

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch((err) => console.error('Could not connect to MongoDB...', err));

mongoose
  .connect('mongodb+srv://QianQian97:1c5U7XPUU8Tqamtg@qianqian.aqoqk.mongodb.net/cheng')
  .then((result) => {
    //console.log('Mongoose DB connected', result);
  })
  .catch((err) => {
    console.log('Failed to connect to the Mongoose DB', err);
  });


//have case's to handle json
app.use(express.json());

//router handlers
//create user document in user model
app.post('/api/signup', userController.createUser, (req, res) => {
  res.status(200).json({success: true, message: 'successfully signed up'});
});
//find matching username and verifying password, potentially creating a session
app.post('/api/login', userController.verifyUser, (req, res) => {
  console.log("login in callback")
  res.status(200).json({success: true, message: 'successfully logged in'});
});

//fetch user's saved favorites

app.get('/api/plants/:username', plantController.seeFavorites, (req, res) => {
  res.status(200).json(res.locals.favorites)
})


//saving plant to user's favorite's     plantController.savePlant - make sure the  plant isn't saved userController.addPlant adding the plantid to the user's savedPlants attribute
app.post('/api/plants/', plantController.addFavorites, (req, res) => {
  res.sendStatus(201)
});


app.delete('/api/plants/', plantController.delFavorites, (req, res) => {
  res.status(200).json(res.locals.favorites)
})


//fetching all plants that make search querry
app.get('/api/species', plantController.fetchSpecies, (req, res) => {
    // console.log('res locals plants: ', res.locals.plants)
  res.status(200).json(res.locals.plants);
});

//fetch the details for the species
app.get('/api/species/details', (req, res) => {});

//global error handler
app.use((err, req, res, next) => {
  console.log(err);
  const errObj = Object.assign(
    { message: 'Unknown erro caught by error handler' },
    err
  );
  res.status(500).json(errObj);
});

app.listen(3000); //Set's up our backend server to listen in on port 3000
