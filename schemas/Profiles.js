const {Schema, model} = require('mongoose') 

const Profiles = new Schema({
    account_id: String,
    nickname: String,
    password: String,
    telegram: String,
    server: String,
    nation: String,
    region: String,
    cords: {
        lat: Number,
        long: Number
    },
    main_photo: String,
    missions: [{
        shortid: String,
        title: String,
        category: String,
        volume: Number,
        status: String,
        image: String,
        dateUp: String,
        supports: Number
    }],
    account_components: [{
        shortid: String,
        title: String,
        path: String
    }]
})

module.exports = model('Profiles', Profiles)