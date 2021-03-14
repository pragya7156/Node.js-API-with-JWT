const router = require('express').Router();
require('dotenv').config();
const users = require('../modules/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

//route for login
router.post('/', (req,res)=>{
    const { email, password } = req.body;

    let user = users.findOne({ email }, (err, user1)=>{
      if(!user1) {
        return res.status(401).send({error:'User does not exist'});
      }
      else {
      user.exec((err,data)=>{
          if(err) return res.status(400).json({
            msg : "Something went wrong",
            error : err.message
          })
          var getUserID = data._id;
      var getPassword = data.password;
      if(bcrypt.compareSync(password,getPassword)) {
        var token = jwt.sign( {userID: getUserID}, process.env.token );
        localStorage.setItem('userToken', token);
        localStorage.setItem('loginUser', data.name);
        return res.status(200).json({
          success : "Login successful",
          name : data.name,
          email : data.email
        })
      }
      else {
        return res.status(400).json({
          error : "Invalid password"
        })
      }
      })
    }
    });
    
})

module.exports = router;
