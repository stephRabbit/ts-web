import { View } from './View'

export class UserForm extends View {
  /**
   * @returns {object} - custom key name and callback reference
   */
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick
    }
  }

  onSetAgeClick = (): void => {
    this.model.setRandomAge()
  }

  onSetNameClick = (): void => {
    const input = this.parent.querySelector('input')
    if (input) {
      const name = input.value
      if (name) {
        this.model.set({ name })
      }
    }
  }

  template(): string {
    return `
      <div>
        <h1>User Form</h1>
        <div>Name: ${this.model.get('name')}</div>
        <div>Age: ${this.model.get('age')}</div>
        <div>
          <input type="text">
          <button class="set-name">Click</button>
        </div>
        <button class="set-age">Set random age</button>
      </div>
    `
  }
}