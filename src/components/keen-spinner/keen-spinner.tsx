import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'keen-spinner',
  styleUrl: 'keen-spinner.css',
  shadow: true,
})
export class KeenSpinner {
  render() {
    return (
      <Host>
        <div class="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </Host>
    );
  }
}
