const express = require('express')
const path = require('node:path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const itemsRouter = require('./routes/items')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// =========================================================
// RUTAS AÑADIDAS PARA LAS PRUEBAS DE SUPERTEST
// =========================================================
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' })
})

app.get('/items', (req, res) => {
    res.status(200).json([{ id: 1, stock: 15 }])
})
// =========================================================

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/items', itemsRouter)

module.exports = app
