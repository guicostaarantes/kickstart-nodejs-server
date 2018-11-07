import { Validator } from 'jsonschema'

export default class JSONValidator extends Validator {
  constructor (schema) {
    super()
    this.schema = schema
  }
  validate (req, res, next) {
    const val = super.validate(req.body, this.schema)
    if (val.errors.length) {
      next(new Error(1002))
    } else {
      next()
    }
  }
}
