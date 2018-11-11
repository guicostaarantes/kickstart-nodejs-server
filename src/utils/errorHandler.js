import path from 'path'
import fs from 'fs'

export default function errorHandler (err, req, res, next) {
  const errors = {
    1001: { statusCode: 500, message: 'Internal server error.' },
    1002: { statusCode: 400, message: 'JSON not valid for this request.' },
    1003: { statusCode: 401, message: 'Unauthorized.' },
    1004: { statusCode: 401, message: 'Token has expired.' },
    1005: { statusCode: 404, message: 'Resource not found.' },
    1006: { statusCode: 400, message: 'Username already exists in the database.' },
    1007: { statusCode: 400, message: 'Email already exists in the database.' }
  }
  if (Object.keys(errors).indexOf(err.message) !== -1 && !isNaN(err.message) && err.message !== '1001') {
    res.status(errors[err.message].statusCode).send({ err: true, errCode: Number(err.message), ...errors[err.message] }).end()
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
