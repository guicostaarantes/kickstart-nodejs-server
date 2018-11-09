import crypto from 'crypto'
import jwt from 'jsonwebtoken'

class AuthView {
  checkPasswordSignToken (req, res, next) {
    const hash = crypto.createHash('sha512')
      .update(req.body.password)
      .digest('base64')
  }
}

const authView = new AuthView()

export default authView
