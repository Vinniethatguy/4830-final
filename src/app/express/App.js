const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
const bcrypt = require("bcrypt");
const UserModel = require('./model/user')

//mongoose.connect('mongodb+srv://admin:admin@mean.uibpxfz.mongodb.net/?retryWrites=true&w=majority')

mongoose.connect('mongodb+srv://admin:admin@bakery.gqzrwuq.mongodb.net/user_posts?retryWrites=true&w=majority')
.then(()=>{
  console.log('Connected to database')
})
.catch(()=>{
  console.log('connection error')
})


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST, PATCH, DELETE, OPTIONS");
  console.log('Middleware');
  next();
})

app.use((req, res, next) => {
  next();
})

app.post("/api/users", async (req, res, next) => {
  var user_name = req.body.firstname + "_" + req.body.lastname;
  user_psw = await hashPassword(req.body.password);

  const new_user = new UserModel({
    username: user_name,
    email: req.body.email,
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    password: user_psw,
  });

  new_user.save();

  res.status(201).json({
    message: 'User added successful'
  });
})

async function hashPassword (plainPassword) {

  const saltRounds = 10;

  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds).then(salt => {

      bcrypt.hash(plainPassword, salt, function(err, hash) {
        if (err) reject(err)
        resolve(hash)
      });
    });
  })

  return hashedPassword
}


//app.use('/api/posts',(req, res, next) => {
app.get('/api/users',(req, res, next) => {
  console.log("Users trying to retrieve");
  // PostModel.find().then(documents => {
  //     res.status(200).json({
  //       message: "This is fetched data",
  //       posts: documents
  //     });
  // });

  res.send('Hello from express')
})

module.exports =app
