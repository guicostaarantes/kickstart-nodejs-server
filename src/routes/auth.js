import AuthView from 'views/auth'

class AuthRoute {
  load (app) {
    app.get('/auth/login', AuthView.passwordForRefreshToken)
    app.get('/auth/token', AuthView.refreshTokenForAccessToken)
  }
}

const authRoute = new AuthRoute()

export default authRoute
