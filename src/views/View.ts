import { Model } from '../models/Model'

/**
 * View
 * @param {type} - Model class
 * @param {interface} - shape on data that satisfies Model<K>
 */
export abstract class View<T extends Model<K>, K>  {
  regions: { [key: string]: HTMLElement } = {}

  constructor(public parent: HTMLElement, public model: T) {
    this.bindModel()
  }

  abstract template(): string

  // Overload
  eventsMap(): { [key: string]: () => void } {
    return {}
  }

  regionsMap(): { [key: string]: string } {
    return {}
  }

  bindModel(): void {
    this.model.on('change', () => { this.render() })
  }

  onRender(): void { }

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

  /**
   * Iterate over object and create selector
   * from the value. Add key and created element to
   * regions property - { [key: string]: Element } = {}
   * @param frag - document fragment
   */
  mapRegions(frag: DocumentFragment): void {
    const regionsMap = this.regionsMap()

    for (let mapKey in regionsMap) {
      const selector = regionsMap[mapKey]
      const el = frag.querySelector<HTMLElement>(selector)
      if (el) {
        this.regions[mapKey] = el
      }
    }
  }

  render(): void {
    if ('content' in document.createElement('template')) {
      this.parent.innerHTML = ''
      const tempEl = document.createElement('template')
      tempEl.innerHTML = this.template()

      this.bindEvents(tempEl.content)
      this.mapRegions(tempEl.content)

      // Simulate and event handler for render()
      this.onRender()

      this.parent.append(tempEl.content)
    } else {
      throw new Error('Sorry, your browser does not support this feature!')
    }
  }
}