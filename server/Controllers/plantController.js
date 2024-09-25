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

module.exports = plantController;
