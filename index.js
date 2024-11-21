require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});


const urls = [{original_url: 'http://localhost:3000/', short_url: 1}, {original_url: 'https://www.google.com/', short_url: 2}, {original_url: 'www.yahoo.com', short_url: 3}];


app.post('/api/shorturl', function(req, res) {
  

  //let newURL = bodyParser.raw(req.body)

  console.log('POST')
  console.log('req.body: ' + req.body)
  console.log('JSON.stringify(req.body): ' + JSON.stringify(req.body))
  console.log('POST')
  console.log('req.body.url: ' + req.body.url)
  //console.log('JSON.raw(req.body): ' + JSON.raw(req.body))
  console.log('POST')
  console.log('this is being added to array: ' + '{ original_url: ' + req.body.url + ', short_url: ' + (urls.length + 1) + '}')
  
  urls.push({ original_url: req.body.url, short_url: urls.length + 1 })  

  console.log('POST')
  console.log(urls)

  res.json({ original_url: req.body.url, short_url: urls.length});
});








app.get('/api/shorturl/:url', function(req, res) {
  
  console.log('Request: ' + JSON.stringify(req.params));
  console.log('Requested url: ' + req.params.url);
  console.log('url location: ' + urls.findIndex((test) => {
    console.log('');
    console.log('test #: ' + JSON.stringify(test));
    console.log('test.short_url: ' + test.short_url);
    console.log('req.params.url: ' + req.params.url);
    console.log(test.short_url === req.params.url);
    console.log(Number(test.short_url) === Number(req.params.url));
    Number(test.short_url) === Number(req.params.url);
  }));
  console.log('index of: ' + urls.indexOf(req.params.url));


  let arrayLocation = urls.findIndex((test) => {
    console.log(Number(test.short_url) === Number(req.params.url));
    return Number(test.short_url) === Number(req.params.url);
  })

  console.log('arraylocation: ' + arrayLocation);

  //res.json({result: urls.findIndex((test) => {test == req.params})})
  //res.send('url location: ' + urls.findIndex((test) => {return Number(test.short_url) === Number(req.params.url)}));
  //res.send(urls[arrayLocation].original_url);
  res.redirect(urls[arrayLocation].original_url);
});



app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
