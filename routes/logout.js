const router = require('express').Router();
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
    res.status(400).json({
      error : "You already have logged out"
    })
  }
  next();
}

router.get('/',checkLoginUser, (req,res)=>{
    localStorage.removeItem('userToken');
  localStorage.removeItem('loginUser');
  return res.status(200).json({
    success: "Logout successful"
  });
})

module.exports = router;