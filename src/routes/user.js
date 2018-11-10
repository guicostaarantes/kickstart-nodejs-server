import { jwtMiddleware } from 'utils/strategy'
import { createSchema, updateSchema } from 'schemas/user'
import UserView from 'views/user'

class UserRoute {
  load (app) {
    app.get('/user/:id', jwtMiddleware, UserView.read)
    app.post('/user', createSchema.validate.bind(createSchema), UserView.create)
    app.put('/user', jwtMiddleware, updateSchema.validate.bind(updateSchema), UserView.update)
    app.delete('/user', jwtMiddleware, UserView.deactivate)
  }
}

const userRoute = new UserRoute()

export default userRoute
