import JSONValidator from 'utils/validate'

export const createSchema = new JSONValidator({
  type: Object,
  properties: {
    title: {
      type: String
    },
    text: {
      type: String
    },
    language: {
      type: String
    }
  },
  required: ['title', 'text', 'language'],
  additionalProperties: false
})

export const updateSchema = new JSONValidator({
  type: Object,
  properties: {
    title: {
      type: String
    },
    text: {
      type: String
    },
    language: {
      type: String
    }
  },
  additionalProperties: false
})
