import mongodb from 'utils/mongodb'

class UserView {
  read (req, res, next) {
    res.send('User is GETting example with id ' + req.params['id'])
  }
  create (req, res, next) {
    try {
      (async function () {
        const db = await mongodb
        db.collection('users').insertOne(req.body)
      })()
    } catch (err) {
      next(err)
    }
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
