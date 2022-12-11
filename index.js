require('dotenv').config()

const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const bodyParser = require('body-parser')
var qs = require('qs')

const Note = require('./db').Note

app.set('port', 3000)

app.use(bodyParser.urlencoded( { extended: true }))
app.use(bodyParser.json())
app.use('query parser', function (str) {
    return qs.parse(str, { /* custom options */ })
})

// Генерация токена
const token = jwt.sign({
    date: new Date()
}, process.env.CLIENT, {expiresIn: 60 * 60})


// Логин клиента
app.post('/connect', (req, res, next) => {
    if (req.get('Client') != process.env.CLIENT) res.status(403).end()
    if (!req.get('Client')) res.status(403).end()
    else res.status(200).json({token: token})
})

// Добавление записи
app.post('/notes', (req, res, next) => {
    Note.saveNew(
        {theme: req.body.theme, question: req.body.question, decision: req.body.decision, fromWho: req.body.fromWho, date: req.body.date},
        (err, note) => {
            if (err) return next(err)
            res.status(200).end()
        }
    )
})

// Получение всех записей
app.get('/notes', (req, res, next) => {
    if (req.get('Token') != token) res.status(403).end()
    else {Note.getAll((err, notes) => {
        if (err) return next(err)
        if (!notes) res.status(404).end()
        if (notes) {res.status(200).json({
            theme: notes.theme,
            question: notes.question,
            decision: notes.decision,
            decidedBy: notes.from_who,
            created: notes.date
        })}
    })}
})

// Получение одной записи
app.get('/notes/:noteId', (req, res, next) => {
    Note.getNote(req.params.noteId, (err, note) => {
        if (err) return next(err)
        if (!note) res.status(404).end()
        if (note) {res.status(200).json({
            theme: note.theme,
            question: note.question,
            decision: note.decision,
            decidedBy: note.from_who,
            created: note.date
        })}
    })
})

// Поиск заметок
app.get('/search-notes', (req, res, next) => {
    Note.find(req.query.searchBy, (err, result) => {
        if (err) return next(err)
        if (!result) {
            res.status(404).end()
        }
        else res.status(200).json({
            theme: result.theme,
            question: result.question,
            decision: result.decision,
            decidedBy: result.from_who,
            created: result.date
        })
    })
})

app.listen(app.get('port'), () => {
    console.log(`You are online at ${app.get('port')}`)
})

// fetch(process.env.SENDER + '/decision', {
//     method: 'POST',
//     body: rejectionMessage,
//     headers: { 'Content-Type': 'application/xml' }
// })