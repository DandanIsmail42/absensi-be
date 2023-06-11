const express = require('express')
const cors = require('cors')
const port = 5000

const sequelize = require('./db.config')
sequelize.sync().then(() => console.log('Database ready'))


const userEndPoint = require('./routes/users.js')
const absensiEnpoint = require('./routes/absensi.js')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/users', userEndPoint)

app.use('/absensi', absensiEnpoint)

app.listen(port, () => console.log(`Running server on port ${port}`))