import { createSchema, updateSchema } from 'utils/schema/example'
import ExampleView from 'views/example'

export default class ExampleRoute {
  static load (app) {
    app.get('/example/:id', ExampleView.read)
    app.post('/example', createSchema.validate.bind(createSchema), ExampleView.create)
    app.put('/example/:id', updateSchema.validate.bind(updateSchema), ExampleView.update)
    app.delete('/example/:id', ExampleView.delete)
    app.get('/error/:id', ExampleView.error)
  }
}
