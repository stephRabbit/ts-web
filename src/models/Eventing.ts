type Callback = () => void

export class Eventing {
  events: { [key: string]: Callback[] } = {}

  /**
   * Initial event and callback
   * @param eventName - specified event name
   * @param callback - action to be excuted - type Callback
   */
  on = (eventName: string, callback: Callback): void => {
    const handlers = this.events[eventName] || []
    handlers.push(callback)
    this.events[eventName] = handlers
  }

  /**
   * Iterate over events and fire specified events
   * @param eventName - event to be excuted
   */
  trigger = (eventName: string): void => {
    const handlers = this.events[eventName]
    if (!handlers || handlers.length === 0) {
      return
    }

    for (let i = 0; i < handlers.length; i++) {
      handlers[i]()
    }
  }
}