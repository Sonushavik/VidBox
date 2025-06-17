const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const cors = require('cors');

app.use(cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

const userRouter = require("./routes/user.routes")

app.use('/api/v1/users', userRouter);


module.exports  = app;