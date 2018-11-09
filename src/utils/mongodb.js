import { dbPath, dbName } from 'utils/config'
import { MongoClient } from 'mongodb'

const mongodb = MongoClient.connect(dbPath, { useNewUrlParser: true }).then(function (client) {
  console.log(`Established connection with Mongo server at ${client.s.url} and database ${dbName}`)
  return client.db(dbName)
})

export default mongodb
