const express = require('express');
const app = express();
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const homeRoute = require('./routes/home');
const logoutRoute = require('./routes/logout');
const path = require('path');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/login',loginRoute);
app.use('/register',registerRoute);
app.use('/home',homeRoute);
app.use('/logout',logoutRoute);

app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`);
});