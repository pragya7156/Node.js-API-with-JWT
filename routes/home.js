const router = require('express').Router();
const users = require('../modules/user');
const jwt = require('jsonwebtoken');

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

//middleware for checking if user is logged in or not
function checkLoginUser(req,res,next) {
  var userToken = localStorage.getItem('userToken');
  try {
    var decoded = jwt.verify(userToken, process.env.token);
  }
  catch(err) {
    return res.status(404).json({
      error : "Not authorised. You need to login"
    })
  }
  next();
}

router.get('/',checkLoginUser, (req,res)=>{
  var loginUser = localStorage.getItem('loginUser');
  res.status(200).json({
    success : "Welcome to the home page"
  })
})

module.exports = router;