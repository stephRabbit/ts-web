import { UserForm } from './views/UserForm'
import { User } from './models/User'

const user = User.buildUser({ name: 'GizBot', age: 100 })
const userForm = new UserForm(
  document.getElementById('root'),
  user
)
userForm.render()