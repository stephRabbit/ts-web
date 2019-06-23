import { User } from './models/User'

const user = new User({ id: 1, name: 'GIZZiLLA!', age: 500 })

user.on('save', () => {
  console.log(user)
})

user.save()