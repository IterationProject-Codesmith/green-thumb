const Favs = require("../models/favoritePlantModel");
const Plant = require ('../models/plantModel')

const plantController = {};

// austin's key: sk-tRSR66f2e488db5c06983
// aaron's key: sk-XZEX66f4aa4c01a1d7006

// const apiKey = "sk-tRSR66f2e488db5c06983";
const apiKey = "sk-XZEX66f4aa4c01a1d7006";


plantController.fetchSpecies = async (req, res, next) => {
  const { search } = req.query;
  const uriQuerry = `https://perenual.com/api/species-list?key=${apiKey}&q=${search}`;
  try {
    const response = await fetch(uriQuerry);
    const results = await response.json();
    res.locals.plants = results.data;
    // console.log(results.data);
    return next();
  } catch (error) {
    return next(error);
  }
};

plantController.addFavorites = async (req, res, next) => {
  // console.log('1')
  const { userId, common_name, cycle, watering, sunlight, image_url, id } =
    req.body;

  console.log('reqbody ', req.body)
  try {
    //({userId},  )
    // const newPlant = {
    //   commonName: common_name,
    //   cycle: cycle,
    //   watering: watering,
    //   sunlight: sunlight,
    //   image_url: image_url,
    //   plantId: id,
    // };
    // console.log("plantcard", newPlant);

    // console.log('2')
    const newFav = await Plant.create({
      username: userId, commonName: common_name, cycle: cycle, watering: watering, sunlight: sunlight, imageUrl: image_url, plantId: id
    });
    console.log(`newFav object: ${newFav}`);
    console.log("plantId", id);
    // const newFav = await Favs.findOneAndUpdate(
    //   { username: userId },
    //   { $push: { favPlantArray: newPlant } },
    //   { new: true, upsert: true }
    // );

    res.locals.favorites = newFav;
    console.log("favorites", res.locals.favorites);
    return next();
  } catch (error) {
    console.log(`error in addFavorites middleware: ${error}`)
    return next(error);
  }
};

plantController.seeFavorites = async (req, res, next) => {
  console.log("in seeFavorites controller", req.params);
  const { username } = req.params;
  try {
    const user = await Plant.find({ username: username });
    console.log("inseefavs", user);
    if (user !== null) {
      res.locals.favorites = user;
      console.log("user", user);
      return next();
    }
  } catch (error) {
    return next(error);
  }
};

plantController.delFavorites = async (req, res, next) => {
  const { userId, id } = req.body;
  //  userId: plantInfo.username,
  //       id: plantInfo.plantId,
  try {
    const user = await Plant.findOneAndDelete({ username: userId, plantId: id });
    if (user) {
      console.log('deleted fav plant')
      res.locals.favorites = user
      return next()
    }
  } catch (error) {
    return next(error)
  }
};

module.exports = plantController;
