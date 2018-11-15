import { jwtSecret } from 'utils/config'
import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

export function initializeStrategies () {
  passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
    algorithms: ['HS512']
  }, function (jwtPayload, done) {
    return done(null, jwtPayload)
  }))
}

// export const jwtMiddleware = passport.authenticate('jwt', { session: false })

export function jwtMiddleware (req, res, next) {
  // eslint-disable-next-line promise/prefer-await-to-callbacks
  return passport.authenticate('jwt', { session: false }, function (err, user, info) {
    if (err) next(err)
    else if (info && info.message === 'jwt expired') next(new Error(1004))
    else if (info && info.message === 'invalid signature') next(new Error(1003))
    else if (user) {
      req.user = user
      next()
    } else next(new Error(1005))
  })(req, res, next)
}
