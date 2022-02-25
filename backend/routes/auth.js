const { Router } = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs')
const axios = require('axios')

const User = require('../models/User');

const router = Router();

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).send('Please provide username and password')
    } else {
        User.findOne({ username: username, strategy: 'local' }, async (err, user) => {
            if (user) {
                res.status(400).send('User already exists')
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = new User({
                    strategy: 'local',
                    username: username,
                    password: hashedPassword,
                    services: []
                });
                user.save()
                res.send(user)
            }
        })

    }
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            res.status(400).send(err);
        }
        if (user) {
            req.logIn(user, err => {
                res.send({
                    message: `${user.username} connected`,
                    data: user
                });
            })
        } else {
            res.status(400).send(info);
        }
    })(req, res, next);
})

router.get('/github/callback', (req, res) => {
    const uri = 'https://github.com/login/oauth/access_token'
    const client_id = process.env.GITHUB_APP_ID
    const client_secret = process.env.GITHUB_APP_SECRET
    const client_code = req.query.code

    axios({
        method: 'POST',
        url: `${uri}?client_id=${client_id}&client_secret=${client_secret}&code=${client_code}`,
        headers: {
            Accept: 'application/json'
        }
    })
        .then(response => {
            axios({
                method: 'GET',
                url: 'https://api.github.com/user',
                headers: {
                    Authorization: "token " + response.data.access_token
                }
            })
                .then(response => {
                    const user = response.data
                    User.findOne({ username: user.login, strategy: 'github' })
                        .then((newUser, err) => {
                            console.log(err)
                            if (!newUser) {
                                const newUser = new User({
                                    strategy: 'github',
                                    username: user.login,
                                    services: []
                                });
                                newUser.save()
                                    .then(() => {
                                        req.logIn(newUser, err => {
                                            res.redirect('http://localhost:8080?logged=true')
                                        })
                                    })
                            } else {
                                req.logIn(newUser, err => {
                                    res.redirect('http://localhost:8080?logged=true')

                                })
                            }
                        })
                })
        }).catch(e => { })
})

router.get('/user', (req, res) => {
    res.send(req.user);
})

module.exports = router;