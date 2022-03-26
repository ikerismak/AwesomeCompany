var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();




// Create connection to database
var config = {
  server: 'IKERISMAK',
  authentication: {
      type: 'default',
      options: {
          userName: 'iker', // update me
          password: 'molex008' // update me
      }
  },
  options: {
      trustServerCertificate: true,
      database: 'AwesomeCompany'
  }
}
var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected');
  }
});

// css

app.use(express.static(__dirname + '/public'));

// bootstrap

app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

connection.connect();

app.engine('hbs', exphbs.engine({
  defaultLayout: 'main',
  extname: '.hbs'
}));

app.set('view engine', 'hbs');


app.get('/', (req, res) => {
  res.render('home');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.listen(3000, () => {
  console.log('The web server has started on port 3000');
});
