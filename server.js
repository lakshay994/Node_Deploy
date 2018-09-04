console.log('Starting server.js....');

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

const app = express();
app.set('view engine', hbs);

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentyear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// custom express middleware
app.use((req, res, next) => {

    let requestInfo = new Date().toString();

    fs.appendFile('server.log', requestInfo + '\n', (err) => {
        if(err){
            console.log('Could not write to file');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintainence.hbs');
// });

app.use(express.static(__dirname + '/public'));  // middleware to serve the public directory

app.get('/', (req, res) => {
    res.render('index.hbs', {
        heading: 'Hello Express!',
        year: new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        heading: 'Hello Express! About:',
        year: new Date().getFullYear()
    });
});

app.get('/profile', (req, res) => {
    res.render('profile.hbs');
})

app.listen(port, () => {
    console.log('Server listening at port 3000');
});