const sqlite3 = require('sqlite3').verbose()
const dbName = 'notes_db.sqlite'
const db = new sqlite3.Database(dbName)

// Создать таблицу ЗАПИСИ
db.serialize(() => {
    const sql = `
        CREATE TABLE IF NOT EXISTS note (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            theme TEXT,
            question TEXT,
            decision TEXT,
            from_who TEXT,
            date REAL
        )
    `
    db.run(sql)
})

// SQL-запрос
// db.serialize(() => {
//     const sql = "SELECT * FROM note WHERE id = 2"
//     db.run(sql)
// })

// Запись
class Note {
    static saveNew(data, cb) {
        const sql = 'INSERT INTO note (theme, question, decision, from_who, date) VALUES (?, ?, ?, ?, ?)'
        db.run(sql, data.theme, data.question, data.decision, data.fromWho, data.date, cb)
    }
    static getAll(cb) {
        db.get('SELECT theme, question, decision, from_who, date FROM note', cb)
    }
    static getNote(noteId, cb) {
        db.get('SELECT theme, question, decision, from_who, date FROM note WHERE id = ?', noteId, cb)
    }
    static find(searchBy, cb) {
        db.get('SELECT theme, question, decision, from_who, date FROM note WHERE theme LIKE ?', searchBy, cb)
    }
}

module.exports = db
module.exports.Note = Note