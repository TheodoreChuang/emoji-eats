const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 4000;

app.use(cors())

const data = require('./data')

app.get('/', (req, res) =>
    res.json({ data })  // data = data:data since same key/value
)

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})