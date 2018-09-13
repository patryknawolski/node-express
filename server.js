const fs = require('fs');
const express = require('express');
const hbs = require('hbs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear())

app.use((request, response, next) => {
  const now = new Date().toString();
  const log = `${now}: ${request.method} ${request.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', err => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });

  next();
})

app.use((request, response, next) => {
  response.render('maintenance.hbs', {
    title: 'Maintenance'
  });
  // next();
})

app.get('/', (request, response) => {
  response.send('Hello Express!');
});

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    title: 'About'
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000...');
});