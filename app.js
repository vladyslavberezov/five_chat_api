const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const chatRouter = require('./routes/chat')

const app = express()

app.use(logger('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/v1/users', usersRouter)
app.use('/v1/auth', authRouter)
app.use('/v1/chat', chatRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404)
  res.send({
    message: 'Not found :(',
  })
})

app.use(function (err, req, res, next) {
  console.log(err)
  res.status(err.status || 500)
  res.send({
    message: err.status ? err.message : 'Internal server error',
  })
})

module.exports = app
