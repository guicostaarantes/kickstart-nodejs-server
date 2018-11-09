import mongodb from 'utils/mongodb'

class UserView {
  read (req, res, next) {
    res.send('User is GETting example with id ' + req.params['id'])
  }
  create (req, res, next) {
    mongodb.then(function (db) {
      return db.collection('users').insertOne(req.body)
    }).then(function () {
      res.send(`User ${req.body.email} is POSTing a new example.`)
    }).catch(function (err) {
      next(err)
    })
  }
  update (req, res, next) {
    res.send('User is PUTting (updating) example with id ' + req.params['id'])
  }
  deactivate (req, res, next) {
    res.send('User is DELETEing example with id ' + req.params['id'])
  }
}

const userView = new UserView()

export default userView
