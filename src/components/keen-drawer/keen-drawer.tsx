import { Component, Host, h, Prop, State, Method } from '@stencil/core';

@Component({
  tag: 'keen-drawer',
  styleUrl: 'keen-drawer.css',
  shadow: true,
})
export class KeenDrawer {
  @State() showContactInfo: boolean = false;
  @Prop({ reflect: true }) heading: string;
  @Prop({ reflect: true, mutable: true }) isopen: boolean = false;

  private onCloseDrawer() {
    this.isopen = false;
  }

  private onContentChange(content: string) {
    this.showContactInfo = content === 'contact';
  }

  @Method()
  async open() {
    this.isopen = true;
  }

  render() {
    let mainContent = <slot />;
    if (this.showContactInfo) {
      mainContent = (
        <div id="contact-information">
          <h2>Contact Information</h2>
          <p>You can reach us via phone or email.</p>
          <ul>
            <li>Phone: 2384239042</li>
            <li>
              Email: <a href="mailto:test@test.com">test@test.com</a>
            </li>
          </ul>
        </div>
      );
    }

    return (
      <Host>
        <div class="backdrop" onClick={this.onCloseDrawer.bind(this)} />
        <aside>
          <header>
            <h1>{this.heading}</h1>
            <button onClick={this.onCloseDrawer.bind(this)}>X</button>
          </header>
          <section id="tabs">
            <button class={{ active: !this.showContactInfo }} onClick={this.onContentChange.bind(this, 'nav')}>
              Navigation
            </button>
            <button class={{ active: this.showContactInfo }} onClick={this.onContentChange.bind(this, 'contact')}>
              Contact
            </button>
          </section>
          <main>{mainContent}</main>
        </aside>
      </Host>
    );
  }
}
