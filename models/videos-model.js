const mongoose = require('mongoose');

mongoose.connect(
    'mongodb+srv://admin:babubhai123@neog-cluster.yuntr.mongodb.net/sneakerTV',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
    .then(() => console.log('Successfully connected to mongoDB'))
    .catch(err => console.log("Error connecting to mongoDB: ", err))

const VideoSchema = new mongoose.Schema({

    vidId: { type: String, required: true },
    title: { type: String, required: true },
    duration: { type: String, required: true },
    youtuber: { type: String, required: true },
    description: { type: String, required: false },
    likes: {type: Number, required: false}

});

module.exports = mongoose.model('Video', VideoSchema);
