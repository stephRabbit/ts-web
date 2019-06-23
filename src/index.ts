import { User } from './models/User'

const user = new User({ name: 'NoID', age: 99 })

// Accessors
class Person {
  constructor(public firstName: string, public lastName: string) { }

  // getter for retrieving infromation - accessor
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }
}

const person = new Person('Gizmo', 'Jones')
// Gets invoked and returns string
console.log(person.fullName)