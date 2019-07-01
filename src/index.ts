// import { UserEdit } from './views/UserEdit'
// import { User } from './models/User'

// const user = User.buildUser({ name: 'GizBot', age: 100 })
// const root = document.getElementById('root')

// if (root) {
//   const userEdit = new UserEdit(root, user)
//   userEdit.render()
// } else {
//   throw new Error('Root element not found!')
// }

import { UserList } from './views/UserList'
import { Collection } from './models/Collection'
import { UserProps, User } from './models/User'

const users = new Collection('http://localhost:3000/users', (json: UserProps) => {
  return User.buildUser(json)
})

users.on('change', () => {
  const root = document.getElementById('root')

  if (root) {
    new UserList(root, users).render()
  }
})

users.fetch()
