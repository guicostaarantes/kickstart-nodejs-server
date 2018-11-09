import ExampleRoute from 'routes/example'
import UserRoute from 'routes/user'

class AllRoutes {
  load (app) {
    ExampleRoute.load(app)
    UserRoute.load(app)
  }
}

const allRoutes = new AllRoutes()

export default allRoutes
