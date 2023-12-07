import express from 'express';
import { config } from 'dotenv';
import expressReactViews from 'express-react-views';

config();

const port = process.env.PORT || 3000;

const app = express();

app.set('views', "./dist/views");
app.set('view engine', 'js');
app.engine('js', expressReactViews.createEngine());

app.get('/home', (req, res) => res.render('home'));
app.get('/', (req, res) => res.render('home'));
app.get('*', (req, res) => res.send('404 Page Not Found'));

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server open on ${port}`);
});
