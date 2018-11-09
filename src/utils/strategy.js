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

export const jwtMiddleware = passport.authenticate('jwt', { session: false })
