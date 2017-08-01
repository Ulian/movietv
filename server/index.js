const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const apicache = require('apicache')
const cors = require('cors')

const config = require('./config/config')

const port = process.env.PORT || config.SERVER.PORT

const app = express()

app.use(express.static(path.join(__dirname, '../client/dist')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(apicache.middleware(`${config.API.CACHE_TIME} ${config.API.CACHE_TYPE}`))
app.use(cors())

const api = require('./routes/api')
app.use('/api', api)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})

const server = app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})

module.exports = server
