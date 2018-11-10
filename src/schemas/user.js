import JSONValidator from 'utils/validate'

export const createSchema = new JSONValidator({
  type: Object,
  required: ['username', 'email', 'password', 'language'],
  additionalProperties: false,
  properties: {
    username: {
      type: String,
      pattern: /^[A-Za-z0-9.]{1,32}$/
    },
    email: {
      type: String,
      pattern: /^[A-Za-z0-9.]{1,64}@[A-Za-z0-9]{1,32}\.[A-Za-z0-9.]{2,32}$/
    },
    password: {
      type: String,
      pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-!@$%^&*_+|~=`:;<>?,.]).{8,}$/
    },
    language: {
      type: String,
      pattern: /^[A-Z]{2}$/
    }
  }
})

export const updateSchema = new JSONValidator({
  type: Object,
  additionalProperties: false,
  properties: {
    username: {
      type: String,
      pattern: /^[A-Za-z0-9.]{1,32}$/
    },
    language: {
      type: String,
      pattern: /^[A-Z]{2}$/
    }
  }
})

export const resetPasswordSchema = new JSONValidator({
  type: Object,
  additionalProperties: false,
  properties: {
    password: {
      type: String,
      pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-!@$%^&*_+|~=`:;<>?,.]).{8,}$/
    }
  }
})
