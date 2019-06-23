import { User } from './models/User'

const user = new User({ name: 'NoID', age: 99 })
console.log(user.get('name'))
user.on('change', () => console.log('changed!'))
user.trigger('change')