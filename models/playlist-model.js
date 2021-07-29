const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlayListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    list: [{
        type: String,
    }],
    defaultPlayList: {
        type: Boolean,
        default: false,
    },
})

const UserPlayListSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    playList: [PlayListSchema]
});

module.exports = mongoose.model('Playlist', UserPlayListSchema);