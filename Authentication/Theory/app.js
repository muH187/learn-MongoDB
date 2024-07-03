const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const app = express()

app.use(cookieParser())

// 1 Cookie Set:
// app.get('/', function (req, res){
//     res.cookie("name", "Ali")
//     res.send("Done")
// })

// 2 bcrypt encrypt:
// app.get('/', function(req, res){
//     bcrypt.genSalt(10, function(err, salt) {
//         bcrypt.hash("password", salt, function(err, hash) {
//             console.log(hash)
//         });
//     });
// })

// 3 bcrypt decrypt:
// app.get('/', function(req, res){
//     bcrypt.compare("password", "$2b$10$If42L64TCQ.yniuxAxZlb.Rfn2k25ZN1njCNhUqYga7Dp9Ow17PGe", function(err, result) {
//         console.log(result)
//     });
// })

app.get('/', function(req, res){
    let token = jwt.sign({email: "ali@gmail.com"}, "secret")
    res.cookie("token", token)
    res.send("Done")
})

app.get('/read', function(req, res){
    let data = jwt.verify(req.cookies.token, "secret")
    console.log(data)
})

app.listen(3000)