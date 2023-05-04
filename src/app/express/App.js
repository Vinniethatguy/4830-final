const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserModel = require("./model/user");
const ContactModel = require("./model/contact");
const Login_UserModel = require("./model/login_user");

//mongoose.connect('mongodb+srv://admin:admin@mean.uibpxfz.mongodb.net/bakery_users?retryWrites=true&w=majority')
// "mongodb+srv://admin:admin@bakery.gqzrwuq.mongodb.net/user_posts?retryWrites=true&w=majority"
mongoose.connect(
    "mongodb+srv://admin:admin@mean.uibpxfz.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("connection error");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  console.log("Middleware");
  next();
});

app.use((req, res, next) => {
  next();
});

app.post("/api/user_login", async (req, res, next) => {
  const query = UserModel.findOne({ email: req.body.email });

  var pass = req.body.password;

  query.select("password");

  query.then(async function (person) {
    if (person != null) {
      user_password = person.password;
    }
    const result = await cmpPassword(pass, user_password);
    // console.log("sign in GET: ", String(result).localeCompare('true'));
    // console.log("Result", result);
    if (result >= 0) {
      username_signed_in = person.firstname + "_" + person.lastname;
      // success login
      console.log("Successful");
      res.status(201).json({
        message: "User successfully signed in",
      });
    } else {
      // fail login
      console.log("Login failure");
      res.status(201).json({
        message: "Incorrect information please try again",
      });
    }
  });
});

async function cmpPassword(plainPassword, hash) {
  const pswCmpResult = await new Promise((resolve, reject) => {
    bcrypt.compare(plainPassword, hash, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });
  return String(pswCmpResult).localeCompare("true");
}

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
    message: "User added successfully",
  });
});

async function hashPassword(plainPassword) {
  const saltRounds = 10;

  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds).then((salt) => {
      bcrypt.hash(plainPassword, salt, function (err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
    });
  });

  return hashedPassword;
}

app.post("/api/sms", (req, res, next) => {
  console.log("In api/sms = >", req.body);
  const new_contact = new ContactModel({
    customername: req.body.customerName,
    email: req.body.email,
    message: req.body.message,
  });

  new_contact.save();

  res.status(201).json({
    message: "Message added successful",
  });
});

module.exports = app;
