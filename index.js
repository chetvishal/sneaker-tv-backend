const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8000;
const videos = require('./routes/express.videos');
const Video = require('./models/videos-model');
const videoData = require('./Data');


app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({ success: true, message: 'sneaker.tv API' });
})

app.use('/videos', videos);
app.get('/upload-videos', async (req, res) => {
    try {
        Video.insertMany(videoData)
            .then(() => res.json({ success: true, message: "successfully updated" }))
            .catch(err => res.json({ success: false, message: "failed", err: err }))
    } catch (err) {
        res.status(404).json({ success: false, message: "failed to upload videos on mongoDB" })
    }
})
app.use((req, res) => {
    res.status(404).json({ success: false, message: "No such route defined." })
})
app.use(((err, req, res, next) => {
    res.status(500).json({ success: false, message: err })
}))

app.listen(PORT, () => {
    console.log('SERVER STARTED');
})