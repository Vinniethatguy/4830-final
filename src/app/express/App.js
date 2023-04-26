if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const port = 3001

const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const mongoose = require('mongoose')



const usrs = []

//Creates and authenticates password
const createPassport = require('./passport-config')//because it is exported as initalized
createPassport(
  passport,
  email => usrs.find(user => user.email === email),
  id => usrs.find(user => user.id === id)
)


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://<Vinnmongodb+srv://<Vinnieie>:cynvuq-kemvog-7duvfU@capstone.ca0njlu.mongodb.net/login?retryWrites=true&w=majority";
mongoose.connect('mongodb+srv://admin:admin@mean.uibpxfz.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
  console.log('Connected to the database')
}).catch(()=>{
console.log("error no connection")
})

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     // await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);


app.use(flash())

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

//calls the function from the passportConfig.js
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

//used to check the name with is visible to the user
app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.html', { name: req.user.name })
})

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.html')
})

//uses post to login and send to the index.js
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

//renders out the register.ejs if not authenticated
app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.html')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
      const hashedPassword = await bcrypt.hash(req.body.password, 8)
      usrs.push({
          id: Date.now().toString(),
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword
      })
      res.redirect('/login')
  } catch {
      res.redirect('/register')
  }
  console.log(usrs)
})

//log usr out
app.delete('/logout', (req, res) => {
  req.logout(function (err) {
      if (err) {
          return next(err)
      }
  })
  res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
      return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
      return res.redirect('/')
  }

  next()
}
module.exports = app

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))
