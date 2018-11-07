import path from 'path'
import fs from 'fs'

export default function errorHandler (err, req, res, next) {
  const errors = {
    1001: { statusCode: 500, message: 'Internal Server Error.' },
    1002: { statusCode: 400, message: 'Bad Request.' },
    1003: { statusCode: 401, message: 'Authentication failed.' },
    1004: { statusCode: 401, message: 'Token has expired.' },
    1005: { statusCode: 404, message: 'Resource not found.' }
  }
  if (Object.keys(errors).indexOf(err.message) !== -1 && err.message !== '1001') {
    res.status(errors[err.message].statusCode).send(errors[err.message]).end()
  } else {
    const errLog = fs.createWriteStream(path.join(__dirname, '../../error.log'), { flags: 'a' })
    errLog.write(`
      Error caught at ${Date()}:
      Remote address: ${res.connection.remoteAddress}
      URL: ${req.method} ${req.url}
      Headers: ${JSON.stringify(req.headers)}
      Body: ${JSON.stringify(req.body)}
      Stack: ${err.stack}
    `.split('      ').join(''))
    res.status(500).send(errors[1001]).end()
  }
}
