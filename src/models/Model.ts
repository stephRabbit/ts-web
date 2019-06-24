import {
  AxiosPromise,
  AxiosResponse,
  AxiosError
} from 'axios'
interface ModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K]
  getAll(): T
  set(update: T): void
}

interface Sync<T> {
  fetch(id: number): AxiosPromise
  save(data: T): AxiosPromise
}

interface Events {
  on(eventName: string, callback: Callback): void
  trigger(eventName: string): void
}

interface HasId {
  id?: number
}

type Callback = () => void

/**
 * @params <T> -shape of data constraint HasId
 */
export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) { }

  // Getters
  on = this.events.on
  trigger = this.events.trigger
  get = this.attributes.get

  /**
   * Call attribute set method with update
   * and call events trigger method with 'change'
   * @param update - shape of UserProps
   */
  set(update: T): void {
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