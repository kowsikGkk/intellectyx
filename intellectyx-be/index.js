const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var cors = require('cors');
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(cors({ credentials: true, origin: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})
app.get('/users', db.getUsers)
app.post('/create', db.createUser)
app.get('/delete/:id', db.deleteUser)
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})