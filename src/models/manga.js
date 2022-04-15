const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: [true, "Title already exists"],
    },
    slug: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    volumes: {
        type: Number,
        required: true,
    },
    chapters: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
        trim: true,
        default: true,
    },
    cover: {
        type: String,
        required: true,
        trim: true,
    },
    genres: [{
        type: String,
        required: true,
    }],
    read_link:{
        type: String,
        required: false,
        trim: false,
    },
    buy_link:{
        type: String,
        required: false,
        trim: false,
    },
    userCreator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

module.exports = mongoose.model('Manga', schema);