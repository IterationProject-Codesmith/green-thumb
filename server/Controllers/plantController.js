const Favs = require('../server/models/favoritePlantModel.js')

const plantController = {};

const apiKey = 'sk-tRSR66f2e488db5c06983';

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
  const {  userId, common_name, cycle, watering, sunlight, image_url } = req.body;
  try {
    const user = await Favs.findOne(userId)
    if (user !== null) {
      const newFav = await Favs.create({userId, common_name: common_name, cycle: cycle, watering: watering, sunlight: sunlight, image_url: image_url});
      res.locals.favorites = newFav
      return next();
    } 
  }catch (error){
    return next(error)
  }
};

plantController.seeFavorites = async (req, res, next) => {
  const {  userId } = req.body;
  try{ 
    const user = await Favs.findOne(userId)
    if (user !== null) {
      res.locals.favorites = user
      return next();
    }
  }
  catch (error){
    return next(error)
  }
};

plantController.delFavorites = async (req, res, next) => {

}
module.exports = plantController;
