const {Schema, model} = require('mongoose') 

const Sessions = new Schema({
    shortid: String,
    nickname: String,
    title: String,
    category: String,
    server: String,
    nation: String,
    levels: [Number],
    discord: String,
    dateUp: String,
    time: String,
    members: [{
        account_id: String,
        nickname: String,
        technic: String
    }],
    platoons: [{
        shortid: String,
        name: String,
        text: String,
        format: String,
        level: String,
        duration: Number,
        status: String,
        players: [String]
    }],
    awards: [{
        shortid: String,
        name: String,
        title: String,
        category: String,
        image: String,
        timestamp: String,
        likes: Number
    }]
})

module.exports = model('Sessions', Sessions)