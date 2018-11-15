import basicParser from 'basic-auth'
import bearerParser from 'parse-bearer-token'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { jwtSecret } from 'utils/config'
import mongodb from 'utils/mongodb'

class AuthView {
  async passwordForRefreshToken (req, res, next) {
    try {
      const credentials = basicParser(req)
      const db = await mongodb
      const user = await db.collection('users').findOne({ $or: [ { username: credentials.name }, { email: credentials.name } ] })
      const match = await bcrypt.compare(credentials.pass, user.password)
      if (match) {
        const refToken = await jwt.sign({ 'sub': user.username, 'cid': 'own', 'scp': 'all' }, jwtSecret, { algorithm: 'HS512' })
        const accToken = await jwt.sign({ 'sub': user.username, 'scp': 'all' }, jwtSecret, { algorithm: 'HS512', expiresIn: '10m' })
        res.send({ err: false, refreshToken: refToken, accessToken: accToken })
      } else next(new Error(1003))
    } catch (err) {
      next(err)
    }
  }
  async refreshTokenForAccessToken (req, res, next) {
    try {
      const db = await mongodb
      const payload = await jwt.verify(bearerParser(req), jwtSecret)
      if (!payload.cid) {
        next(new Error(1003))
      } else if (payload.cid === 'own') {
        const accToken = await jwt.sign({ 'sub': payload.sub, 'scp': payload.scp }, jwtSecret, { algorithm: 'HS512', expiresIn: '10m' })
        res.send({ err: false, accessToken: accToken })
      } else {
        const user = await db.collection('users').findOne({ username: payload.sub })
        for (let i of user.clients) {
          if (i.cid === payload.cid) {
            if (i.scp === payload.scp) {
              const accToken = await jwt.sign({ 'sub': payload.sub, 'scp': payload.scp }, jwtSecret, { algorithm: 'HS512', expiresIn: '10m' })
              res.send({ err: false, accessToken: accToken })
            } else {
              next(new Error(1003))
            }
          }
        }
        next(new Error(1003))
      }
    } catch (err) {
      if (err.message === 'invalid signature') {
        next(new Error(1003))
      } else {
        next(err)
      }
    }
  }
}

const authView = new AuthView()

export default authView
