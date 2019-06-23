import { User } from './models/User'

const user = new User({ name: 'NoID', age: 99 })
user.events.on('change', () => {
  console.log('CHANGED!')
})

user.events.trigger('change')