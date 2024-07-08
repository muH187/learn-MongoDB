const express = require('express')
const app = express()
const userModel = require('./models/user')
const postModel = require('./models/post')

app.get('/', function(req, res) {
    res.send("Hello Ali")
})

app.get('/create', async function(req, res) {
    let user = await userModel.create({
        username: "Ali",
        email: "alipbfirst@gmail.com",
        age: 20
    })
    res.send(user)
})

app.get('/post/create', async function(req, res) {
    let post = await postModel.create({
        postDate: "Hello Saary Log Kaise Ho?",
        user: '668bc64d5022663227d4244c'
    })

    let user = await  userModel.findOne({_id: "668bc64d5022663227d4244c"})
    user.posts.push(post._id)
    await user.save(post)
    res.send({post, user})
})

app.listen(3000)