const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
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
        required: true,
        trim: false,
    },
    buy_link:{
        type: String,
        required: true,
        trim: false,
    },
});

module.exports = mongoose.model('Manga', schema);