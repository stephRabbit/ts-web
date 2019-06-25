import { User } from '../models/User'

export abstract class View {
  abstract template(): string
  abstract eventsMap(): { [key: string]: () => void }

  constructor(public parent: HTMLElement, public model: User) {
    this.bindModel()
  }

  bindModel(): void {
    this.model.on('change', () => { this.render() })
  }

  /**
   * Iterate over eventsMap split the key ':'
   * Iterate over fragment and add event and callback
   * @param frag - document fragment
   */
  bindEvents(frag: DocumentFragment): void {
    const eventsMap = this.eventsMap()

    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':')
      frag.querySelectorAll<HTMLElement>(selector).forEach((el: HTMLElement): void => {
        el && el.addEventListener(eventName, eventsMap[eventKey])
      })
    }
  }

  render(): void {
    if ('content' in document.createElement('template')) {
      this.parent.innerHTML = ''
      const tempEl = document.createElement('template')
      tempEl.innerHTML = this.template()
      this.bindEvents(tempEl.content)
      this.parent.append(tempEl.content)
    } else {
      throw new Error('Sorry, your browser does not support this feature!')
    }
  }
}