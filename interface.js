// require('dotenv').config()
// var fetch = require('node-fetch')

// async function Authorize () {
//     let response = await fetch('http://185.182.111.178:3000/connect', {
//     method: 'POST',
//     headers: { 
//         'Client': process.env.CLIENT
//     }
//     })
//     let token = await response.json()
//     return token.token
// }

// async function getNotes () {
//     let token = await Authorize()
//     let response = await fetch('http://185.182.111.178:3000/notes', {
//         method: 'GET',
//         headers: { 
//             'Client': process.env.CLIENT,
//             'Token': token
//         }
//     })
//     let rawData = await response.json()
//     let notes = rawData.data
//     document.querySelector('.content').innerHTML = `<table class="notes"></table>`
//     notes.forEach((item) => {
//         var row = document.createElement('tr')
//         row.innerHTML = `<td>${item.theme}</td>
//             <td>${item.question}</td>
//             <td>${item.decision}</td>
//             <td>${item.decidedBy}</td>
//             <td>${item.created}</td>`
//     })
//     document.querySelector('.notes').appendChild(row)
// }

// getNotes()

var notes = [
    {
        "theme": "Ручки чтения клиента",
        "question": "Какие ручки нужны",
        "decision": "Две ручки: инициализировать клиента и прочитать статус",
        "decidedBy": "Рамазан",
        "created": "2023-01-19"
    },
    {
        "theme": "Ручки чтения клиента",
        "question": "Какие ручки нужны",
        "decision": "Две ручки: инициализировать клиента и прочитать статус",
        "decidedBy": "Рамазан",
        "created": "2023-01-19"
    }
]

document.querySelector('.content').innerHTML = `<table class="notes"></table>`
notes.forEach((item) => {
    let row = document.createElement('tr')
    row.innerHTML = `
        <td>${item.theme}</td>
        <td>${item.question}</td>
        <td>${item.decision}</td>
        <td>${item.decidedBy}</td>
        <td>${item.created}</td>
    `
    document.querySelector('.notes').appendChild(row)
})