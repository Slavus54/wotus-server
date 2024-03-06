const {Schema, model} = require('mongoose') 

const Areas = new Schema({
    shortid: String,
    nickname: String,
    title: String,
    category: String,
    mode: String,
    size: Number,
    region: String,
    cords: {
        lat: Number,
        long: Number
    },
    tier: Number,
    duration: Number,
    locations: [{
        shortid: String,
        name: String,
        title: String,
        category: String,
        position: String,
        cords: {
            lat: Number,
            long: Number
        },
        image: String,
        likes: Number
    }],
    facts: [{
        shortid: String,
        name: String,
        text: String,
        level: String,
        isTrue: Boolean
    }]
})

module.exports = model('Areas', Areas)