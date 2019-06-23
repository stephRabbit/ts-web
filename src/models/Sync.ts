import axios, { AxiosPromise } from 'axios'

interface HasId {
  id?: number
}

export class Sync<T extends HasId> {
  constructor(public rootUrl: string) { }

  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`)
  }

  save(data: T): AxiosPromise {
    const { id } = data

    if (id) {
      // PUT request to update existing user
      return axios.put(`${this.rootUrl}/${id}`, data)
    } else {
      // POST new user added to DB
      return axios.post(this.rootUrl, data)
    }
  }
}