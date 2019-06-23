import { Eventing } from './Eventing'
import { Sync } from './Sync'
import { Attributes } from './Attributes'
import { AxiosResponse, AxiosError } from 'axios';

export interface UserProps {
  id?: number
  name?: string
  age?: number
}

const rootUrl = 'http://localhost:3000/users'

export class User {
  public events: Eventing = new Eventing()
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl)
  public attributes: Attributes<UserProps>

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs)
  }

  // Getters
  get on() {
    return this.events.on
  }

  get trigger() {
    return this.events.trigger
  }

  get get() {
    return this.attributes.get
  }

  /**
   * Call attribute set method with update
   * and call events trigger method with 'change'
   * @param update - shape of UserProps
   */
  set(update: UserProps): void {
    this.attributes.set(update)
    this.events.trigger('change')
  }

  /**
   * Coordinate sync fetch with id and call
   * set in current class
   */
  fetch(): void {
    const id = this.get('id')

    if (typeof id !== 'number') {
      throw new Error('Can not fetch without an id')
    }

    this.sync.fetch(id)
      .then((response: AxiosResponse): void => {
        // Use class set method instead of attributes set method
        // in order to trigger change event
        this.set(response.data)
      })
  }

  /**
   * Save all user properties, on sucess
   * trigger save on error trigger error
   */
  save(): void {
    this.sync.save(this.attributes.getAll())
      .then((response: AxiosResponse): void => {
        this.trigger('save')
      })
      .catch((err: AxiosError) => {
        console.error(err)
        this.trigger('error')
      })
  }
}