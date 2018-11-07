class ExampleView {
  read (req, res, next) {
    res.send('User is GETting example with id ' + req.params['id'])
  }
  create (req, res, next) {
    res.send('User is POSTing a new example.')
  }
  update (req, res, next) {
    res.send('User is PUTting (updating) example with id ' + req.params['id'])
  }
  delete (req, res, next) {
    res.send('User is DELETEing) example with id ' + req.params['id'])
  }
  error (req, res, next) {
    next(new Error(req.params['id']))
  }
}

const exampleView = new ExampleView()

export default exampleView
