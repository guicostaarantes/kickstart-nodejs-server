import { jwtMiddleware } from 'utils/strategy'
import { createSchema, updateSchema } from 'schemas/example'
import ExampleView from 'views/example'

class ExampleRoute {
  load (app) {
    app.get('/example/:id', jwtMiddleware, ExampleView.read)
    app.post('/example', jwtMiddleware, createSchema.validate.bind(createSchema), ExampleView.create)
    app.put('/example/:id', jwtMiddleware, updateSchema.validate.bind(updateSchema), ExampleView.update)
    app.delete('/example/:id', jwtMiddleware, ExampleView.delete)
    app.get('/error/:id', ExampleView.error)
  }
}

const exampleRoute = new ExampleRoute()

export default exampleRoute
