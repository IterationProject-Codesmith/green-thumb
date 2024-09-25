const { createNextState } = require('@reduxjs/toolkit');
const User = require('../models/userModel');
const bcrypt = require('bcrypt')

const userController = {};

userController.createUser = async (req, res, next) => {
  const { username, password } = req.body

    if(!username || !password){
        return next(
            {
                message: 'Both username and password fields are required'
            });
    }

  try {
    const findUser = await User.findOne({username})
    if(findUser === null) {
      const salt = await bcrypt.genSalt(10)
      const hashed = await bcrypt.hash(password, salt)
      const newUser = await User.create({username, password: hashed});
      res.locals.user = newUser
      // console.log(hashed)
      return next()
    }
    else {
      return next({message: 'User already exists'})
    }
  }catch (error) {
    console.log(error);
    return next({message: 'error creating account!'});
  }
};

userController.verifyUser = async (req, res, next) => {
const { username, password } = req.body;
// console.log("verifyUser callled")
// console.log(username,"username");
// console.log(password,'password');
if(!username || !password){return  next({message: 'both username and password fields are required'});}

try {
 
  const user = await User.findOne({username: username});
    if (user === null) {
      return next({message: 'User does not exist'})
   }
    console.log('hashed', user.password)
      const compare = await bcrypt.compare(password, user.password)
      if (compare) {
        res.locals.currentUser = user
        return next()
      }
      else return next({message: 'Username or Password was incorrect'})
  
} catch (error) {
  // console.log(error);
  // console.log("falled into catch in user.findone")
    return next({message: 'Error verifying user'});
}

};

module.exports = userController;





