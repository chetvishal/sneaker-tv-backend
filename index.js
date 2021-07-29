const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const PORT = process.env.PORT || 8000;
const videos = require('./routes/express.videos');
const signup = require('./routes/express.signup')
const login = require('./routes/express.login');
const playlist = require('./routes/express.playlist');
const {dbConnect} = require('./db/db');


app.use(express.json());
app.use(cors());
dbConnect();

app.get('/', (req, res) => {
    res.json({ success: true, message: 'sneaker.tv API' });
})

app.use('/videos', videos);
app.use('/signup', signup)
app.use('/login', login);
app.use('/playlist', playlist);
app.use((req, res) => {
    res.status(404).json({ success: false, message: "No such route defined." })
})
app.use(((err, req, res, next) => {
    res.status(500).json({ success: false, message: err })
}))

app.listen(PORT, () => {
    console.log('SERVER STARTED');
})