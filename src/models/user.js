const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema =  new Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: [true, "UserName already exists"],
        length: {
            min: 3,
            max: 20,
            message: "UserName must be between 3 and 20 characters"
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    password: {
        type: String,
        required: true,
        length: [6, "Password must be at least 6 characters"],
    },
    mangaList: [{
        type: Schema.Types.ObjectId,
        ref: 'Manga',
        default: [],
    }],
});

module.exports = mongoose.model('User', schema);
