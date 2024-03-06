const {Schema, model} = require('mongoose') 

const Heroes = new Schema({
    shortid: String,
    nickname: String,
    fullname: String,
    category: String,
    rank: String,
    vehicles: [{
        id: String,
        title: String,
        format: String,
        image: String,
        experience: Number
    }],
    region: String,
    cords: {
        lat: Number,
        long: Number
    },
    artifacts: [{
        shortid: String,
        title: String,
        category: String,
        prevalence: Number,
        image: String,
        likes: Number
    }],
    questions: [{
        shortid: String,
        name: String,
        text: String,
        theme: String,
        reply: String,
        answered: Boolean
    }]
})

module.exports = model('Heroes', Heroes)