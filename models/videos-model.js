const mongoose = require('mongoose')

const VideoSchema = new mongoose.Schema({

    vidId: { type: String, required: true },
    title: { type: String, required: true },
    duration: { type: String, required: true },
    youtuber: { type: String, required: true },
    description: { type: String, required: false },
    likes: {type: Number, required: false}

});

module.exports = mongoose.model('Video', VideoSchema);
