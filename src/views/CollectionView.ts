import { Collection } from '../models/Collection'

/**
 * Renders user collection in to DOM
 * @param {T} - model
 * @param {K} - properties of model
 */
export abstract class CollectionView<T, K> {
  constructor(public parent: HTMLElement, public collection: Collection<T, K>) { }

  abstract renderItem(model: T, itemParent: HTMLElement): void

  render(): void {
    this.parent.innerHTML = ''
    const templateEl = document.createElement('template')
    for (let model of this.collection.models) {
      const itemParent = document.createElement('div')
      // Create a view and render item into itemParent
      this.renderItem(model, itemParent)
      templateEl.content.append(itemParent)
    }

    this.parent.append(templateEl.content)
  }
}