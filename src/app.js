import '@babel/polyfill'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { clientUrls, port } from 'utils/config'
import errorHandler from 'utils/errorHandler'
import * as routes from './routes'
import passport from 'passport'
import { initializeStrategies } from 'utils/strategy'

const app = express()

app.use(cors({ origin: clientUrls }))

app.use(bodyParser.json())

app.use(passport.initialize())
initializeStrategies()

for (let r in routes) routes[r].load(app)

app.use(errorHandler)

app.listen(port, function () {
  console.log('Server running on port ' + port + '!')
})
