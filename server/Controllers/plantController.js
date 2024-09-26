const Favs = require ('../models/favoritePlantModel')

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
  // console.log('1')
  const {  userId, common_name, cycle, watering, sunlight, image_url, id } = req.body;

  // console.log('reqbody', req.body)
  try {

    //({userId},  )
    const newPlant = {
      commonName: common_name, 
      cycle: cycle, 
      watering: watering, 
      sunlight: sunlight, 
      image_url: image_url, 
      plantId: id
    }
    
    // console.log('2')
      // const newFav = await Favs.create({
      //   userId: userId, commonName: common_name, cycle: cycle, watering: watering, sunlight: sunlight, image_url: image_url, plantId: id
      // });
      // console.log(newFav);
      const newFav = await Favs.findOneAndUpdate(
        { username: userId },
        { $push: { favPlantArray: newPlant } },
        { new: true, upsert: true}
      );

      res.locals.favorites = newFav
      console.log('favorites', res.locals.favorites)
      return next();
  }catch (error){
    return next(error)
  }
};




plantController.seeFavorites = async (req, res, next) => {
  console.log('in seeFavorites controller',req.params)
  const { username } = req.params;
  try{ 
    const user = await Favs.findOne({username})
    if (user !== null) {
      res.locals.favorites = user.favPlantArray
      console.log('user',user.favPlantArray)
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
