const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    translationCount: {
        type: Number,
        default: 0
    },
    joined: Date
})

module.exports = mongoose.model('user', UserSchema);