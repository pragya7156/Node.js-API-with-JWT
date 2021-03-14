const router = require('express').Router();
const users = require('../modules/user');
require('dotenv').config();
const bcrypt = require('bcrypt');
  
  if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }
  
  //middleware for checking if email exist or not 
  function checkEmail(req,res,next) {
    var email = req.body.email;
    var checkexistemail = users.findOne({email: email});
    checkexistemail.exec((err,data)=> {
      if(err)
      return res.status(400).json({
        error : err.message
      })
      if(data) {
        return res.status(400).json({
          msg : "User Already Exist"
        })
      }
      next();
    });
  }

  //route for register
router.post('/', checkEmail, async (req,res,next)=>{
    const { name, email, password, phone } = req.body;
    const hashed_password = await bcrypt.hash(password, 10);
    user = new users({
      name,
      email,
      password: hashed_password,
      phone,
    });
    user.save((err,doc)=>{
        if(err) return res.status(400).json({
          error : err.message
        })
        res.status(200).json({
          success : "User registered successfully"
        })
    });
})

module.exports = router;