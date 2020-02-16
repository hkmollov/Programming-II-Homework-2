const express = require('express');
const handlebars = require('express-handlebars');
const fs = require('fs');

const app = express();

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

app.use(express.urlencoded({extended: true}));

const messages = [];

app.get('/', (request, response) => {
    response.render('home', {messages: messages});
});

app.post('/next', (request, response) => {

    messages.push({
        author: request.body.author,
        text: request.body.text,
        date: new Date()  //
    });

    console.log('Array data:\n', messages);

    fs.writeFileSync('store/messages.json', JSON.stringify(messages), {encoding: 'utf8'});
    let getData = fs.readFileSync('store/messages.json', {encoding: 'utf8'});
    let parsedData = JSON.parse(getData);
    console.log('JSON file data:\n', parsedData);

    response.redirect('/');
});


app.use(express.static('public'));

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});
