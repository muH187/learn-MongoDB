const express = require('express')
const app = express()
const userModel = require('./models/user')
const postModel = require('./models/post')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.render("index")
})
app.get('/login', (req, res) => {
    res.render("login")
})

app.post('/register', async (req, res) => {
    const { email, password, username, name, age } = req.body
    let userFind = await userModel.findOne({ email })
    if (userFind) return res.status(500).send("User is already registered")

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let user = await userModel.create({
                username,
                email,
                age,
                name,
                password: hash
            })
            let token = jwt.sign({ email: email, userid: user._id }, 'shhh')
            res.cookie('token', token)
            res.send("registered!")
        })
    })
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body
    let userFind = await userModel.findOne({ email })
    if (!userFind) return res.status(500).send("Something went wrong!")

    bcrypt.compare(password, user.password, function(err, result) {
        if(result) res.status(200).send("You can login.")
        else res.redirect("/login")
    })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})
