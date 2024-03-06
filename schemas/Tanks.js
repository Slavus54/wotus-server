const {Schema, model} = require('mongoose') 

const Tanks = new Schema({
    shortid: String,
    nickname: String,
    title: String,
    category: String,
    nation: String,
    role: String,
    level: Number,
    experience: Number,
    dateUp: String,
    characteristics: [{
        shortid: String,
        name: String,
        text: String,
        category: String,
        volume: Number
    }],
    details: [{
        shortid: String,
        name: String,
        title: String,
        format: String,
        image: String,
        likes: Number
    }]
})

module.exports = model('Tanks', Tanks)