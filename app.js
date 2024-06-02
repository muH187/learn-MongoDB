const express = require('express')
const userModel = require("./usermodel")
const app = express()


app.get('/', (req, res) => {
    res.send("Hello World")
})

app.get('/ali', (req, res) => {
    res.send("Your name is Ali.")
})

app.get('/create', async (req, res) => {
    let createdUser = await userModel.create({
        name: "Ali",
        username: "ali.co",
        email: "ali.co@gmail.com"
    })
    res.send(createdUser)
})
app.get('/update', async (req, res) => {
    let updatedUser = await userModel.findOneAndUpdate({username: "ali.co"}, {name: "M. Ali"}, {new: true})
    res.send(updatedUser)
})

app.listen(3000)