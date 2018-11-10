import JSONValidator from 'schemas/validate'

export const createSchema = new JSONValidator({
  type: Object,
  properties: {
    email: {
      type: String,
      pattern: /^[A-Za-z0-9.]{1,64}@[A-Za-z0-9]{1,32}\.[A-Za-z0-9.]{2,32}$/
    },
    password: {
      type: String,
      pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-!$%^&*()_+|~=`{}[\]:";'<>?,./\\]).{8,}$/
    },
    language: {
      type: String
    }
  },
  required: ['email', 'password', 'language'],
  additionalProperties: false
})

export const updateSchema = new JSONValidator({
  type: Object,
  properties: {
    email: {
      type: String,
      pattern: /^[A-Za-z0-9.]{1,64}@[A-Za-z0-9]{1,32}\.[A-Za-z0-9.]{2,32}$/
    },
    password: {
      type: String,
      pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-!$%^&*()_+|~=`{}[\]:";'<>?,./\\]).{8,}$/
    },
    language: {
      type: String
    }
  },
  additionalProperties: false
})
