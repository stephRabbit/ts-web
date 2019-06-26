import { View } from './View'
import { User, UserProps } from '../models/User'

/**
 * UserForm
 * Extends View - this.model will refer to an instance of a user
 * and the different properties user is going to have - UserProps
 * @param {type} - User
 * @param {interface} - UserProps
 */
export class UserForm extends View<User, UserProps> {
  /**
   * @returns {object} - custom key name and callback reference
   */
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick,
      'click:.save-model': this.onSaveModelClick
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

  onSaveModelClick = (): void => {
    this.model.save()
  }

  template(): string {
    return `
      <div>
        <div>
          <input type="text" placeholder="${this.model.get('name')}">
          <button class="set-name">Change name</button>
          <button class="set-age">Set random age</button>
          <button class="save-model">Save</button>
        </div>
      </div>
    `
  }
}