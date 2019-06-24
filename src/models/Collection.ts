import axios, { AxiosResponse, AxiosError } from 'axios'
import { Eventing } from './Eventing'

export class Collection<T, K> {
  models: T[] = []
  events: Eventing = new Eventing()

  constructor(
    public rootUrl: string,
    public deserialize: (json: K) => T
  ) { }

  // Getters
  get on() {
    return this.events.on
  }

  get trigger() {
    return this.events.trigger
  }

  /**
   * Fetch data and push to models if it
   * satisfies specied interface
   */
  fetch(): void {
    axios.get(this.rootUrl).then((response: AxiosResponse) => {
      response.data.forEach((value: K) => {
        this.models.push(this.deserialize(value))
      })

      this.trigger('change')
    })
      .catch((err: AxiosError) => {
        console.error(err)
        this.trigger('error')
      })
  }
}