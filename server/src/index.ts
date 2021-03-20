import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import apicache from 'apicache';
import cors from 'cors';

import config from './config/config.json';
import api from './routes/api';

const port = process.env.PORT || config.SERVER.PORT

const app = express()

app.use(express.static(path.join(__dirname, '../client/dist')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(apicache.middleware(`${config.API.CACHE_TIME} ${config.API.CACHE_TYPE}`))
app.use(cors())

app.use('/api', api)

const server = app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})

module.exports = server
