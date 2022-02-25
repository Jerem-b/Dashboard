const InitiateMongoServer = require('./mongoInit')
const express = require('express')
const cors = require('cors')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const localStrategy = require('./strategies/local')

const authRoutes = require('./routes/auth')
const serviceRoutes = require('./routes/service')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors({ origin: 'http://localhost:8080', credentials: true }))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))
app.use(cookieParser(process.env.SESSION_SECRET))
app.use(passport.initialize())
app.use(passport.session())

InitiateMongoServer();
localStrategy(passport);

app.use('/auth', authRoutes)
app.use('/service', serviceRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})