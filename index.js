const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const authentication = require('./routes/authentication')



mongoose.connect('mongodb://localhost:27017/treefund', {useNewUrlParser: true, useUnifiedTopology : true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to database")
});

app.use(cookieParser());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/', authentication)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})