const express = require('express');

require('dotenv').config();

const port = process.env.port || 3000;

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.get('/home', (req, res) => res.render('home'));
app.get('/', (req, res) => res.render('home'));
app.get('*', (req, res) => res.send('404 Page Not Found'));

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server open on ${port}`);
});