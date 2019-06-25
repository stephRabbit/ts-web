import { User } from '../models/User'
export class UserForm {
  constructor(
    public parent: HTMLElement,
    public model: User
  ) {
    this.bindModel()
  }

  bindModel(): void {
    this.model.on('change', () => { this.render() })
  }

  /**
   * @returns {object} - custom key name and callback reference
   */
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-age': this.onSetAgeClick
    }
  }

  onSetAgeClick = (): void => {
    this.model.setRandomAge()
  }

  template(): string {
    return `
      <div>
        <h1>User Form</h1>
        <div>Name: ${this.model.get('name')}</div>
        <div>Age: ${this.model.get('age')}</div>
        <input type="text">
        <button>Click</button>
        <button class="set-age">Set random age</button>
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
      this.parent.innerHTML = ''
      const tempEl = document.createElement('template')
      tempEl.innerHTML = this.template()
      this.bindEvents(tempEl.content)
      this.parent.append(tempEl.content)
    } else {
      console.log('Sorry, your browser does not support this feature!')
    }
  }
}