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
        name: "Ali Khan",
        username: "aliKhan",
        email: "aliKhan@gmail.com"
    })
    res.send(createdUser)
})
app.get('/update', async (req, res) => {
    let updatedUser = await userModel.findOneAndUpdate({username: "ali.co"}, {name: "M. Ali"}, {new: true})
    res.send(updatedUser)
})
app.get('/read', async (req, res) => {
    let users = await userModel.find()
    res.send(users)
})
app.get('/delete', async (req, res) => {
    let users = await userModel.findOneAndDelete({username: "alikhan"})
    res.send(users)
})

app.listen(3000)