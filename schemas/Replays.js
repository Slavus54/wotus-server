const {Schema, model} = require('mongoose') 

const Replays = new Schema({
    shortid: String,
    nickname: String,
    title: String,
    category: String,
    server: String,
    nation: String,
    nominations: [{
        id: String,
        label: String,
        golda: Number,
        level: Number
    }],
    records: [{
        shortid: String,
        name: String,
        title: String,
        label: String,
        url: String,
        image: String,
        likes: Number
    }],
    situations: [{
        shortid: String,
        name: String,
        text: String,
        category: String,
        ratio: Number,
        time: String,
        exodus: String
    }]
})

module.exports = model('Replays', Replays)