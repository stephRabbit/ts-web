export class UserForm {
  constructor(public parent: HTMLElement) { }

  template(): string {
    return `
      <div>
        <h1>User Form</h1>
        <input type="text">
      </div>
    `
  }

  render(): void {
    if ('content' in document.createElement('template')) {
      const tempEl = document.createElement('template')
      tempEl.innerHTML = this.template()

      this.parent.append(tempEl.content)
    } else {
      console.log('Sorry, your browser does not support this feature!')
    }
  }
}