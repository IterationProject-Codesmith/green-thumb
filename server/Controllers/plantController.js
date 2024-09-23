const plantController = {}

const apiKey = 'sk-co6c66ee1213c52f86927'

plantController.fetchSpecies = async (req, res, next) => {
    const { search } = req.query;
    const uriQuerry = `https://perenual.com/api/species-list?key=${apiKey}&q=${search}`
    try {
        const results = await fetch(uriQuerry);
        res.locals.plants = results.data;
        return next();
    }catch (error) {
        return next(error);
    }

};

module.exports = plantController;