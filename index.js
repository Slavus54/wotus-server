require('dotenv').config()
const app = require('express')()
const {gql} = require('apollo-server-express')

const PORT = process.env.PORT
const url = process.env.MONGO_URL

// schemas

const Profiles = require('./schemas/Profiles')  
const Tanks = require('./schemas/Tanks')  
const Sessions = require('./schemas/Sessions')  
const Heroes = require('./schemas/Heroes')  
const Areas = require('./schemas/Areas')  

// microservices

const {middleware, mongo_connect, apollo_start, feedbackEmail, slicer, create_password, compare_password, get_id, limit} = require('./microservices/microservices')

// middlewares

middleware(app)

// connect to MongoDB

mongo_connect(url, 'MongoDB is connected...')

const typeDefs = gql`
    type Cord {
        lat: Float!,
        long: Float!
    }
    input ICord {
        lat: Float!,
        long: Float!
    }
    type UserCookie {
        account_id: String!,
        nickname: String!,
        server: String!,
        nation: String!
    }
    type AccountComponent {
        shortid: String!,
        title: String!,
        path: String!
    }
    type Mission {
        shortid: String!,
        title: String!,
        category: String!,
        volume: Float!,
        status: String!,
        image: String!,
        dateUp: String!,
        supports: Float!
    }
    type Characteristic {
        shortid: String!,
        name: String!,
        text: String!,
        category: String!,
        volume: Float!
    }
    type Detail {
        shortid: String!,
        name: String!,
        title: String!,
        format: String!,
        image: String!,
        likes: Float!
    }
    type Member {
        account_id: String!,
        nickname: String!,
        technic: String!
    }
    type Platoon {
        shortid: String!,
        name: String!,
        text: String!,
        format: String!,
        level: String!,
        duration: Float!,
        status: String!,
        players: [String]!
    }
    type Award {
        shortid: String!,
        name: String!,
        title: String!,
        category: String!,
        image: String!,
        timestamp: String!,
        likes: Float!
    }
    type Vehicle {
        id: String!,
        title: String!,
        format: String!,
        image: String!,
        experience: Float!
    }
    input IVehicle {
        id: String!,
        title: String!,
        format: String!,
        image: String!,
        experience: Float!
    }
    type Artifact {
        shortid: String!,
        title: String!,
        category: String!,
        prevalence: Float!,
        image: String!,
        likes: Float!
    }
    type Question {
        shortid: String!,
        name: String!,
        text: String!,
        theme: String!,
        reply: String!,
        answered: Boolean!
    }
    type Location {
        shortid: String!,
        name: String!,
        title: String!,
        category: String!,
        position: String!,
        cords: Cord!,
        image: String!,
        likes: Float!
    }
    type Fact {
        shortid: String!,
        name: String!,
        text: String!,
        level: String!,
        isTrue: Boolean!
    }
    type Area {
        id: ID!,
        shortid: String!,
        nickname: String!,
        title: String!,
        category: String!,
        mode: String!,
        size: Float!,
        region: String!,
        cords: Cord!,
        tier: Float!,
        duration: Float!,
        locations: [Location]!,
        facts: [Fact]!
    }
    type Hero {
        id: ID!,
        shortid: String!,
        nickname: String!,
        fullname: String!,
        category: String!,
        rank: String!,
        vehicles: [Vehicle]!,
        region: String!,
        cords: Cord!,
        artifacts: [Artifact]!,
        questions: [Question]!
    }
    type Session {
        id: ID!,
        shortid: String!,
        nickname: String!,
        title: String!,
        category: String!,
        server: String!,
        nation: String!,
        levels: [Float]!,
        discord: String!,
        dateUp: String!,
        time: String!,
        members: [Member]!,
        platoons: [Platoon]!,
        awards: [Award]!
    }
    type Tank {
        id: ID!,
        shortid: String!,
        nickname: String!,
        title: String!,
        category: String!,
        nation: String!,
        role: String!,
        level: Float!,
        experience: Float!,
        dateUp: String!,
        characteristics: [Characteristic]!,
        details: [Detail]!
    }
    type Profile {
        account_id: String!,
        nickname: String!,
        password: String!,
        telegram: String!,
        server: String!,
        nation: String!,
        region: String!,
        cords: Cord!,
        main_photo: String!,
        missions: [Mission]!,
        account_components: [AccountComponent]!
    }
    type Query {
        getProfiles: [Profile]!
        getTanks: [Tank]!
        getSessions: [Session]!
        getHeroes: [Hero]!
        getAreas: [Area]!
    }
    type Mutation {
        createProfile(nickname: String!, password: String!, telegram: String!, server: String!, nation: String!, region: String!, cords: ICord!, main_photo: String!) : UserCookie!
        loginProfile(nickname: String!, password: String!) : UserCookie!
        getProfile(account_id: String!) : Profile
        updateProfilePersonalInfo(account_id: String!, main_photo: String!) : String!
        updateProfileGeoInfo(account_id: String!, region: String!, cords: ICord!) : String!
        updateProfileCommonInfo(account_id: String!, server: String!, nation: String!) : String!
        updateProfilePassword(account_id: String!, current_password: String!, new_password: String!) : String!
        manageProfileMission(account_id: String!, option: String!, title: String!, category: String!, volume: Float!, status: String!, image: String!, dateUp: String!, coll_id: String!) : String!
        createTank(nickname: String!, id: String!, title: String!, category: String!, nation: String!, role: String!, level: Float!, experience: Float!, dateUp: String!) : String!
        getTank(shortid: String!) : Tank!
        makeTankCharacteristic(nickname: String!, id: String!, text: String!, category: String!, volume: Float!) : String!
        updateTankInfo(nickname: String!, id: String!, experience: Float!, dateUp: String!) : String!
        manageTankDetail(nickname: String!, id: String!, option: String!, title: String!, format: String!, image: String!, coll_id: String!) : String!
        createSession(nickname: String!, id: String!, title: String!, category: String!, server: String!, nation: String!, levels: [Float]!, discord: String!, dateUp: String!, time: String!, technic: String!) : String!
        getSession(shortid: String!) : Session!
        manageSessionStatus(nickname: String!, id: String!, option: String!, technic: String!) : String!
        manageSessionPlatoon(nickname: String!, id: String!, option: String!, text: String!, format: String!, level: String!, duration: Float!, status: String!, coll_id: String!) : String!
        manageSessionAward(nickname: String!, id: String!, option: String!, title: String!, category: String!, image: String!, timestamp: String!, coll_id: String!) : String!
        createHero(nickname: String!, id: String!, fullname: String!, category: String!, rank: String!, vehicles: [IVehicle]!, region: String!, cords: ICord!) : String!
        getHero(shortid: String!) : Hero!
        manageHeroArtifact(nickname: String!, id: String!, option: String!, title: String!, category: String!, prevalence: Float!, image: String!, coll_id: String!) : String!
        updateHeroVehicle(nickname: String!, id: String!, coll_id: String!, experience: Float!) : String!
        manageHeroQuestion(nickname: String!, id: String!, option: String!, text: String!, theme: String!, reply: String!, coll_id: String!) : String!
        createArea(nickname: String!, id: String!, title: String!, category: String!, mode: String!, size: Float!, region: String!, cords: ICord!, tier: Float!, duration: Float!) : String!
        getArea(shortid: String!) : Area!
        manageAreaLocation(nickname: String!, id: String!, option: String!, title: String!, category: String!, position: String!, cords: ICord!, image: String!, coll_id: String!) : String!
        updateAreaSettings(nickname: String!, id: String!, tier: Float!, duration: Float!) : String!
        makeAreaFact(nickname: String!, id: String!, text: String!, level: String!, isTrue: Boolean!) : String!
        sendFeedback(nickname: String!, category: String!, msg: String!) : String!
    }
`

const resolvers = {
    Query: {
        getProfiles: async () => {
            const profiles = await Profiles.find() 

            return profiles
        },
        getTanks: async () => {
            const tanks = await Tanks.find()

            return tanks
        },
        getSessions: async () => {
            const sessions = await Sessions.find()

            return sessions
        },
        getHeroes: async () => {
            const heroes = await Heroes.find()

            return heroes
        },
        getAreas: async () => {
            const areas = await Areas.find()

            return areas
        }
    },
    Mutation: {
        createProfile: async (_, {nickname, password, telegram, server, nation, region, cords, main_photo}) => {
            const profile = await Profiles.findOne({nickname}) 
            let drop_object = {account_id: '', nickname, server, nation}

            if (profile === null) {

                let account_id = get_id()

                const newProfile = new Profiles({
                    account_id,
                    nickname,
                    password: await create_password(password),
                    telegram,
                    server,
                    nation,
                    region,
                    cords,
                    main_photo,
                    missions: [],
                    account_components: []
                })

                drop_object = {account_id, nickname, server, nation}
                
                await newProfile.save()
            } 
        
            return drop_object
        },
        loginProfile: async (_, {nickname, password}) => {
            const profile = await Profiles.findOne({nickname}) 
            let drop_object = {account_id: '', nickname: '', server: '', nation: ''}
           
            if (profile) {  

                const check = await compare_password(password, profile.password)

                if (check) {
                    drop_object = {account_id: profile.account_id, nickname: profile.nickname, server: profile.server, nation: profile.nation}
                }                               
            }

            return drop_object
        },
        getProfile: async (_, {account_id}) => {
            const profile = await Profiles.findOne({account_id}) 
            
            return profile
        },
        updateProfilePersonalInfo: async (_, {account_id, main_photo}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {
        
                profile.main_photo = main_photo

                await Profiles.updateOne({account_id}, {$set: profile})

                return PERSONAL_INFO_SUCCESS
            }

            return PERSONAL_INFO_FALL
        },
        updateProfileGeoInfo: async (_, {account_id, region, cords}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {

                profile.region = region
                profile.cords = cords
             
                await Profiles.updateOne({account_id}, {$set: profile})

                return GEO_INFO_SUCCESS
            }

            return GEO_INFO_FALL
        },
        updateProfileCommonInfo: async (_, {account_id, server, nation}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {

                profile.server = server
                profile.nation = nation
              
                await Profiles.updateOne({account_id}, {$set: profile})

                return COMMON_INFO_SUCCESS
            }

            return COMMON_INFO_FALL
        },
        updateProfilePassword: async (_, {account_id, current_password, new_password}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {

                const check = await compare_password(current_password, profile.password)

                if (check) {
                    profile.password = await create_password(new_password)
                }

                await Profiles.updateOne({account_id}, {$set: profile})

                return PASSWORD_SUCCESS
            }

            return PASSWORD_FALL
        },
        manageProfileMission: async (_, {account_id, option, title, category, volume, status, image, dateUp, coll_id}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {

                let feedback = ''

                if (option === 'create') {

                    let shortid = get_id()

                    profile.missions = [...profile.missions, {
                        shortid,
                        title,
                        category,
                        volume,
                        status,
                        image,
                        dateUp,
                        supports: 0
                    }]

                    profile.missions = slicer(profile.missions, limit)

                    feedback = MISSION_CREATED

                } else if (option === 'delete') {

                    profile.missions = profile.missions.filter(el => el.shortid !== coll_id)

                    feedback = MISSION_DELETED

                } else {

                    profile.missions.map(el => {
                        if (el.shortid === coll_id) {
                            if (option === 'support') {
                                el.supports += 1

                                feedback = MISSION_SUPPORTED

                            } else if (option === 'update') {
                                el.status = status
                                el.image = image

                                feedback = MISSION_UPDATED
                            } 
                        }
                    })
                }

                await Profiles.updateOne({account_id}, {$set: profile})

                return feedback
            }

            return MISSION_FALL
        },
        createTank: async (_, {nickname, id, title, category, nation, role, level, experience, dateUp}) => {
            const profile = await Profiles.findOne({nickname, account_id: id})
            const tank = await Tanks.findOne({title, level})
            
            if (profile && !tank) {
                if (profile.account_components.filter(el => el.path === TANK_PATHNAME).find(el => el.title === title) === undefined) {

                    let shortid = get_id()

                    profile.account_components = [...profile.account_components, {
                        shortid,
                        title,
                        path: TANK_PATHNAME
                    }]

                    const newTank = new Tanks({
                        shortid,
                        nickname: profile.nickname,
                        title,
                        category,
                        nation,
                        role,
                        level,
                        experience,
                        dateUp,
                        characteristics: [],
                        details: []
                    })
                
                    await Profiles.updateOne({nickname, account_id: id}, {$set: profile})
                    await newTank.save()

                    return TANK_CREATED
                }
            }

            return TANK_FALL
        },
        getTank: async (_, {shortid}) => {
            const tank = await Tanks.findOne({shortid})

            return tank
        },
        makeTankCharacteristic: async (_, {nickname, id, text, category, volume}) => {
            const profile = await Profiles.findOne({nickname})
            const tank = await Tanks.findOne({shortid: id})

            if (profile && tank) {
                
                let shortid = get_id()

                tank.characteristics = [...tank.characteristics, {
                    shortid,
                    name: profile.nickname,
                    text,
                    category,
                    volume
                }]

                tank.characteristics = slicer(tank.characteristics, limit)
            
                await Tanks.updateOne({shortid: id}, {$set: tank})

                return TANK_CHARACTERISTIC_CREATED
            }

            return TANK_CHARACTERISTIC_FALL
        },
        updateTankInfo: async (_, {nickname, id, experience, dateUp}) => {
            const profile = await Profiles.findOne({nickname})
            const tank = await Tanks.findOne({shortid: id})

            if (profile && tank) {

                tank.experience = experience
                tank.dateUp = dateUp

                await Tanks.updateOne({shortid: id}, {$set: tank})

                return TANK_INFO_UPDATED
            }

            return TANK_INFO_FALL
        },
        manageTankDetail: async (_, {nickname, id, option, title, format, image, coll_id}) => {
            const profile = await Profiles.findOne({nickname})
            const tank = await Tanks.findOne({shortid: id})

            if (profile && tank) {
                
                let feedback = ''

                if (option === 'create') {

                    let shortid = get_id()

                    tank.details = [...tank.details, {
                        shortid,
                        name: profile.nickname,
                        title,
                        format,
                        image,
                        likes: 0
                    }]

                    tank.details = slicer(tank.details, limit)

                    feedback = TANK_DETAIL_CREATED

                } else if (option === 'like') {

                    tank.details.map(el => {
                        if (el.shortid === coll_id) {
                            el.likes += 1
                        }
                    })

                    feedback = TANK_DETAIL_LIKED

                } else {

                    tank.details = tank.details.filter(el => el.shortid !== coll_id)

                    feedback = TANK_DETAIL_DELETED
                }

                await Tanks.updateOne({shortid: id}, {$set: tank})

                return feedback
            }

            return TANK_DETAIL_FALL
        },
        createSession: async (_, {nickname, id, title, category, server, nation, levels, discord, dateUp, time, technic}) => {
            const profile = await Profiles.findOne({nickname, account_id: id})
            const session = await Sessions.findOne({title, category, server})

            if (profile && !session) {
                if (profile.account_components.filter(el => el.path === SESSION_PATHNAME).find(el => el.title === title) === undefined) {

                    let shortid = get_id()

                    profile.account_components = [...profile.account_components, {
                        shortid,
                        title,
                        path: SESSION_PATHNAME
                    }]

                    const newSession = new Sessions({
                        shortid,
                        nickname: profile.nickname,
                        title,
                        category,
                        server,
                        nation,
                        levels,
                        discord,
                        dateUp,
                        time,
                        members: [{
                            account_id: profile.account_id,
                            nickname: profile.nickname,
                            technic
                        }],
                        platoons: [],
                        awards: []
                    })

                    await Profiles.updateOne({nickname, account_id: id}, {$set: profile})
                    await newSession.save()

                    return SESSION_CREATED
                }
            }

            return SESSION_FALL
        },
        getSession: async (_, {shortid}) => {
            const session = await Sessions.findOne({shortid})

            return session
        },
        manageSessionStatus: async (_, {nickname, id, option, technic}) => {
            const profile = await Profiles.findOne({nickname})
            const session = await Sessions.findOne({shortid: id})
        
            if (profile && session) {
                
                let feedback = ''

                if (option === 'join') {

                    profile.account_components = [...profile.account_components, {
                        shortid: session.shortid,
                        title: session.title,
                        path: SESSION_PATHNAME
                    }]

                    session.members = [...session.members, {
                        account_id: profile.account_id,
                        nickname: profile.nickname,
                        technic
                    }]

                    feedback = SESSION_STATUS_JOINED

                } else if (option === 'update') {

                    session.members.map(el => {
                        if (el.account_id === profile.account_id) {
                            el.technic = technic
                        }
                    })

                    feedback = SESSION_STATUS_UPDATED

                } else {

                    profile.account_components = profile.account_components.filter(el => el.shortid !== session.shortid)

                    session.members = session.members.filter(el => el.account_id !== profile.account_id)

                    feedback = SESSION_STATUS_EXIT
                }

                await Profiles.updateOne({nickname}, {$set: profile})
                await Sessions.updateOne({shortid: id}, {$set: session})

                return feedback
            }

            return SESSION_STATUS_FALL
        },
        manageSessionPlatoon: async (_, {nickname, id, option, text, format, level, duration, status, coll_id}) => {
            const profile = await Profiles.findOne({nickname})
            const session = await Sessions.findOne({shortid: id})
        
            if (profile && session) {
                
                let feedback = ''
            
                if (option === 'create') {

                    let shortid = get_id()

                    session.platoons = [...session.platoons, {
                        shortid,
                        name: profile.nickname,
                        text,
                        format,
                        level,
                        duration,
                        status,
                        players: []
                    }]

                    session.platoons = slicer(session.platoons, limit)
                    
                    feedback = SESSION_PLATOON_CREATED

                } else if (option === 'delete') {

                    session.platoons = session.platoons.filter(el => el.shortid !== coll_id)

                    feedback = SESSION_PLATOON_DELETED

                } else {

                    session.platoons.map(el => {
                        if (el.shortid === coll_id) {
                            if (option === 'update') {

                                el.status = status

                                feedback = SESSION_PLATOON_UPDATED

                            } else if (option === 'join') {

                                el.players = [...el.players, profile.nickname]

                                feedback = SESSION_PLATOON_JOINED
                            }
                        }
                    })
                }

                await Sessions.updateOne({shortid: id}, {$set: session})

                return feedback
            }

            return SESSION_PLATOON_FALL
        },
        manageSessionAward: async (_, {nickname, id, option, title, category, image, timestamp, coll_id}) => {
            const profile = await Profiles.findOne({nickname})
            const session = await Sessions.findOne({shortid: id})
        
            if (profile && session) {
                
                let feedback = ''
                
                if (option === 'create') {

                    let shortid = get_id()

                    session.awards = [...session.awards, {
                        shortid,
                        name: profile.nickname,
                        title,
                        category,
                        image,
                        timestamp,
                        likes: 0
                    }]

                    session.awards = slicer(session.awards, limit)

                    feedback = SESSION_AWARD_CREATED

                } else if (option === 'like') {

                    session.awards.map(el => {
                        if (el.shortid === coll_id) {
                            el.likes += 1
                        }
                    })

                    feedback = SESSION_AWARD_LIKED

                } else {

                    session.awards = session.awards.filter(el => el.shortid !== coll_id)

                    feedback = SESSION_AWARD_DELETED
                }

                await Sessions.updateOne({shortid: id}, {$set: session})

                return feedback
            }

            return SESSION_AWARD_FALL
        },
        createHero: async (_, {nickname, id, fullname, category, rank, vehicles, region, cords}) => {
            const profile = await Profiles.findOne({nickname, account_id: id})
            const hero = await Heroes.findOne({fullname, cords})

            if (profile && !hero) {
                if (profile.account_components.filter(el => el.path === HERO_PATHNAME).find(el => el.title === fullname) === undefined) {
                 
                    let shortid = get_id()

                    profile.account_components = [...profile.account_components, {
                        shortid,
                        title: fullname,
                        path: HERO_PATHNAME
                    }]

                    const newHero = new Heroes({
                        shortid,
                        nickname: profile.nickname,
                        fullname,
                        category,
                        rank,
                        vehicles,
                        region,
                        cords,
                        artifacts: [],
                        questions: []
                    })

                    await Profiles.updateOne({nickname, account_id: id}, {$set: profile})
                    await newHero.save()

                    return HERO_CREATED
                }
            }

            return HERO_FALL
        },
        getHero: async (_, {shortid}) => {
            const hero = await Heroes.findOne({shortid})

            return hero
        },
        manageHeroArtifact: async (_, {nickname, id, option, title, category, prevalence, image, coll_id}) => {
            const profile = await Profiles.findOne({nickname})
            const hero = await Heroes.findOne({shortid: id})

            if (profile && hero) {

                let feedback = ''

                if (option === 'create') {

                    let shortid = get_id()

                    hero.artifacts = [...hero.artifacts, {
                        shortid,
                        title,
                        category,
                        prevalence,
                        image,
                        likes: 0
                    }]

                    hero.artifacts = slicer(hero.artifacts, limit)

                    feedback = HERO_ARTIFACT_CREATED

                } else if (option === 'like') {

                    hero.artifacts.map(el => {
                        if (el.shortid === coll_id) {
                            el.likes += 1
                        }
                    })

                    feedback = HERO_ARTIFACT_LIKED

                } else {
                    
                    hero.artifacts = hero.artifacts.filter(el => el.shortid !== coll_id)

                    feedback = HERO_ARTIFACT_DELETED
                }

                await Heroes.updateOne({shortid: id}, {$set: hero})

                return feedback
            }

            return HERO_ARTIFACT_FALL
        },
        updateHeroVehicle: async (_, {nickname, id, coll_id, experience}) => {
            const profile = await Profiles.findOne({nickname})
            const hero = await Heroes.findOne({shortid: id})

            if (profile && hero) {

                hero.vehicles.map(el => {
                    if (el.id === coll_id) {
                        el.experience += experience
                    }
                })

                await Heroes.updateOne({shortid: id}, {$set: hero})

                return HERO_VEHICLE_UPDATED
            }

            return HERO_VEHICLE_FALL
        },
        manageHeroQuestion: async (_, {nickname, id, option, text, theme, reply, coll_id}) => {
            const profile = await Profiles.findOne({nickname})
            const hero = await Heroes.findOne({shortid: id})

            if (profile && hero) {
                
                let feedback = ''
                
                if (option === 'create') {

                    let shortid = get_id()

                    hero.questions = [...hero.questions, {
                        shortid,
                        name: profile.nickname,
                        text,
                        theme,
                        reply: '',
                        answered: false
                    }]

                    hero.questions = slicer(hero.questions, slicer)

                    feedback = HERO_QUESTION_CREATED

                } else if (option === 'reply') {

                    hero.questions.map(el => {
                        if (el.shortid === coll_id) {
                            el.reply = reply
                            el.answered = true
                        }
                    })

                    feedback = HERO_QUESTION_ANSWERED
                
                } else {

                    hero.questions = hero.questions.filter(el => el.shortid !== coll_id)

                    feedback = HERO_QUESTION_DELETED
                }

                return feedback
            }

            return HERO_QUESTION_FALL
        },
        createArea: async (_, {nickname, id, title, category, mode, size, region, cords, tier, duration}) => {
            const profile = await Profiles.findOne({nickname, account_id: id})
            const area = await Areas.findOne({title, cords})

            if (profile && !area) {
                if (profile.account_components.filter(el => el.path === AREA_PATHNAME).find(el => el.title === title) === undefined) {

                    let shortid = get_id()

                    profile.account_components = [...profile.account_components, {
                        shortid,
                        title,
                        path: AREA_PATHNAME
                    }]

                    const newArea = new Areas({
                        shortid,
                        nickname: profile.nickname,
                        title,
                        category,
                        mode,
                        size,
                        region,
                        cords,
                        tier,
                        duration,
                        locations: [],
                        facts: []
                    })

                    await Profiles.updateOne({nickname, account_id: id}, {$set: profile})
                    await newArea.save()

                    return AREA_CREATED
                }
            }

            return AREA_FALL
        },
        getArea: async (_, {shortid}) => {
            const area = await Areas.findOne({shortid})

            return area
        },
        manageAreaLocation: async (_, {nickname, id, option, title, category, position, cords, image, coll_id}) => {
            const profile = await Profiles.findOne({nickname})
            const area = await Areas.findOne({shortid: id})

            if (profile && area) {

                let feedback = ''

                if (option === 'create') {

                    let shortid = get_id()

                    area.locations = [...area.locations, {
                        shortid,
                        name: profile.nickname,
                        title,
                        category,
                        position,
                        cords,
                        image,
                        likes: 0
                    }]

                    area.locations = slicer(area.locations, limit)

                    feedback = AREA_LOCATION_CREATED

                } else if (option === 'like') {

                    area.locations.map(el => {
                        if (el.shortid === coll_id) {
                            el.likes += 1
                        }
                    })

                    feedback = AREA_LOCATION_LIKED

                } else {

                    area.locations = area.locations.filter(el => el.shortid !== coll_id)

                    feedback = AREA_LOCATION_DELETED
                }

                await Areas.updateOne({shortid: id}, {$set: area})

                return feedback
            }

            return AREA_LOCATION_FALL
        },
        updateAreaSettings: async (_, {nickname, id, tier, duration}) => {
            const profile = await Profiles.findOne({nickname})
            const area = await Areas.findOne({shortid: id})

            if (profile && area) {

                area.tier = tier
                area.duration = duration

                await Areas.updateOne({shortid: id}, {$set: area})

                return AREA_SETTINGS_UPDATED
            }

            return AREA_SETTINGS_FALL
        },
        makeAreaFact: async (_, {nickname, id, text, level, isTrue}) => {
            const profile = await Profiles.findOne({nickname})
            const area = await Areas.findOne({shortid: id})

            if (profile && area) {
            
                let shortid = get_id()

                area.facts = [...area.facts, {
                    shortid,
                    name: profile.nickname,
                    text,
                    level,
                    isTrue
                }]

                area.facts = slicer(area.facts, limit)
            
                await Areas.updateOne({shortid: id}, {$set: area})

                return AREA_FACT_CREATED
            }

            return AREA_FACT_FALL
        },
        sendFeedback: async (_, {nickname, category, msg}) => {
            await feedbackEmail(nickname, category, msg)

            return 'Success'
        }
      




    }
}

apollo_start(typeDefs, resolvers, app)

app.listen(PORT, () => console.log(`Server started on ${PORT} port`))

// gql statuses

const {  
    PERSONAL_INFO_SUCCESS, PERSONAL_INFO_FALL,
    GEO_INFO_SUCCESS, GEO_INFO_FALL, 
    COMMON_INFO_SUCCESS, COMMON_INFO_FALL, 
    PASSWORD_SUCCESS, PASSWORD_FALL,
    MISSION_CREATED, MISSION_SUPPORTED, MISSION_UPDATED, MISSION_DELETED, MISSION_FALL
} = require('./gql-statuses/profile')

const {
    TANK_CREATED, TANK_FALL,
    TANK_CHARACTERISTIC_CREATED, TANK_CHARACTERISTIC_FALL,
    TANK_INFO_UPDATED, TANK_INFO_FALL,
    TANK_DETAIL_CREATED, TANK_DETAIL_LIKED, TANK_DETAIL_DELETED, TANK_DETAIL_FALL,
    TANK_PATHNAME
} = require('./gql-statuses/tank')

const {
    SESSION_CREATED, SESSION_FALL,
    SESSION_STATUS_JOINED, SESSION_STATUS_UPDATED, SESSION_STATUS_EXIT, SESSION_STATUS_FALL,
    SESSION_PLATOON_CREATED, SESSION_PLATOON_UPDATED, SESSION_PLATOON_JOINED, SESSION_PLATOON_DELETED, SESSION_PLATOON_FALL,
    SESSION_AWARD_CREATED, SESSION_AWARD_LIKED, SESSION_AWARD_DELETED, SESSION_AWARD_FALL,
    SESSION_PATHNAME
} = require('./gql-statuses/session')

const {
    HERO_CREATED, HERO_FALL,
    HERO_VEHICLE_UPDATED, HERO_VEHICLE_FALL,
    HERO_ARTIFACT_CREATED, HERO_ARTIFACT_LIKED, HERO_ARTIFACT_DELETED, HERO_ARTIFACT_FALL,
    HERO_QUESTION_CREATED, HERO_QUESTION_ANSWERED, HERO_QUESTION_DELETED, HERO_QUESTION_FALL,
    HERO_PATHNAME
} = require('./gql-statuses/hero')

const {
    AREA_CREATED, AREA_FALL,
    AREA_LOCATION_CREATED, AREA_LOCATION_LIKED, AREA_LOCATION_DELETED, AREA_LOCATION_FALL,
    AREA_SETTINGS_UPDATED, AREA_SETTINGS_FALL,
    AREA_FACT_CREATED, AREA_FACT_FALL,
    AREA_PATHNAME
} = require('./gql-statuses/area')