const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    admin: {
        type: Boolean,
        default: false
    },
    translationCount: {
        type: Number,
        default: 0
    },
    joined: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('user', UserSchema);