require('dotenv').config()
const mongoose = require('mongoose')
const body_parser = require('body-parser')
const uniqid = require('uniqid')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const {ApolloServer} = require('apollo-server-express')

const common_middleware = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT")
    res.header("Access-Control-Allow-Headers", "Content-Type")
    
    next()
}

const middleware = (app, limit = '10mb') => {
    app.use(common_middleware)
    app.use(body_parser.urlencoded({extended: true}))
    app.use(body_parser.json({limit}))
}

const mongo_connect = async (url, label = 'MongoDB connected') => {
    await mongoose.connect(url).then(() => console.log(label))
}

const apollo_start = async (typeDefs, resolvers, app) => {
    let server = new ApolloServer({typeDefs, resolvers})

    await server.start()
    await server.applyMiddleware({app})
}

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, 
    auth: {
        user: process.env.EMAIL_AUTH_LOGIN,
        pass: process.env.EMAIL_AUTH_PASSWORD
    }
})

const feedbackEmail = async (nickname, category, msg) => {
    try {
        await transporter.sendMail({
            from: {
                name: 'Wotus.com',
                address: process.env.EMAIL_AUTH_LOGIN
            },
            to: process.env.EMAIL_RECEIVER,
            subject: 'Wotus.com feedback',
            html: `
                <div>
                    <h4>Feedback's type: ${category}</h4>
                    <p>${nickname}: ${msg}</p>
                </div>
            `
        })
    } catch (err) {
        console.log(err)
    }
}

const slicer = (arr, length = 40, type = 'new') => {
    let diff = type === 'new' ? arr.length - length : 0

    return arr.slice(diff, type === 'new' ? arr.length : length) || []
}

const create_password = async (password = '', salt = 5) => {  
    let bSalt = await bcrypt.genSalt(salt)
    let result = await bcrypt.hash(password, bSalt)
    
    return result
}

const compare_password = async (plain = '', hashed = '') => {
    let check = await bcrypt.compare(plain, hashed)

    return check
}

const get_id = (content = '') => {
    let result = uniqid(content)

    return result
}

const limit = 40

module.exports = {
    middleware,
    mongo_connect,
    apollo_start,
    feedbackEmail,
    slicer,
    create_password,
    compare_password,
    get_id,
    limit
}