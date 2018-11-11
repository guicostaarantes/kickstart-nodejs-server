import bcrypt from 'bcryptjs'
import mongodb from 'utils/mongodb'

class UserView {
  async read (req, res, next) {
    try {
      const db = await mongodb
      const user = await db.collection('users').findOne({ username: req.params['id'] })
      if (!user || !user.active) next(new Error(1005))
      if (req.user.sub !== user.username) {
        delete user.language
      }
      delete user._id
      delete user.password
      delete user.active
      res.send({ err: false, user: user })
    } catch (err) {
      next(err)
    }
  }
  async create (req, res, next) {
    try {
      const db = await mongodb
      const usernameAlreadyExists = await db.collection('users').findOne({ username: req.body.username })
      const emailAlreadyExists = await db.collection('users').findOne({ email: req.body.email })
      if (usernameAlreadyExists) next(new Error(1006))
      else if (emailAlreadyExists) next(new Error(1007))
      else {
        const hash = await bcrypt.hash(req.body.password, 8)
        await db.collection('users').insertOne({ ...req.body, password: hash, active: true })
        res.send({ err: false, message: 'User created.' })
      }
    } catch (err) {
      next(err)
    }
  }
  async update (req, res, next) {
    try {
      const db = await mongodb
      const usernameAlreadyExists = await db.collection('users').findOne({ username: req.body.username })
      if (usernameAlreadyExists) {
        next(new Error(1006))
      } else {
        await db.collection('users').updateOne({ _id: req.user.sub }, { $set: req.body })
        res.send({ err: false, message: 'User updated.' })
      }
    } catch (err) {
      next(err)
    }
  }
  async deactivate (req, res, next) {
    try {
      const db = await mongodb
      await db.collection('users').updateOne({ _id: req.user.sub }, { $set: { active: false } })
      res.send({ err: false, message: 'User deactivated.' })
    } catch (err) {
      next(err)
    }
  }
  async resetPassword (req, res, next) {
    res.send('User is changing password')
  }
}

const userView = new UserView()

export default userView
