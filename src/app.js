import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { clientUrls, port } from 'utils/config'
import errorHandler from 'utils/errorHandler'
import AllRoutes from 'routes/allRoutes'

const app = express()

app.use(cors({ origin: clientUrls }))

app.use(bodyParser.json())

AllRoutes.load(app)

app.use(errorHandler)

app.listen(port, () => {
  console.log('Server running on port ' + port + '!')
})
