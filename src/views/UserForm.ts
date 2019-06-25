import { User } from '../models/User'
export class UserForm {
  constructor(
    public parent: HTMLElement,
    public model: User
  ) { }

  eventsMap(): { [key: string]: () => void } {
    return {
      'click:button': this.onButtonClick
    }
  }

  onButtonClick(): void {
    console.log('Clicked!')
  }

  template(): string {
    return `
      <div>
        <h1>User Form</h1>
        <div>Name: ${this.model.get('name')}</div>
        <div>Age: ${this.model.get('age')}</div>
        <input type="text">
        <button type="button">Click</button>
      </div>
    `
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
      Array.from(frag.querySelectorAll(selector)).forEach((el: HTMLElement): void => {
        el.addEventListener(eventName, eventsMap[eventKey])
      })
    }
  }

  render(): void {
    if ('content' in document.createElement('template')) {
      const tempEl = document.createElement('template')
      tempEl.innerHTML = this.template()
      this.bindEvents(tempEl.content)
      this.parent.append(tempEl.content)
    } else {
      console.log('Sorry, your browser does not support this feature!')
    }
  }
}