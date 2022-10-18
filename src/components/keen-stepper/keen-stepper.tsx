import { Component, Host, h, Event, Prop, EventEmitter, Watch } from '@stencil/core';

@Component({
  tag: 'keen-stepper',
  styleUrl: 'keen-stepper.css',
  shadow: true,
})
export class KeenStepper {
  @Prop() steps: number = 1;
  @Prop({ mutable: true, reflect: true }) active: number = 1;

  @Event() keenStepChange: EventEmitter<number>;

  @Watch('active')
  activeChanged(newValue: number, _oldValue: number) {
    this.keenStepChange.emit(newValue);
  }

  onBack() {
    if (this.active <= 1) return;
    this.active--;
  }

  onNext() {
    if (this.active >= +this.steps) return;
    this.active++;
  }

  render() {
    return (
      <Host>
        <header class="keen-stepper__header">
          {Array(this.steps)
            .fill(null)
            .map((_, i) => (
              <div class={`keen-stepper__step ${i + 1 === this.active ? 'active' : ''}`}>{i + 1}</div>
            ))}
          <div class="keen-stepper__track" />
        </header>
        <main class="keen-stepper__main">
          <slot></slot>
        </main>
        <footer class="keen-stepper__footer">
          <button disabled={this.active <= 1} onClick={this.onBack.bind(this)}>
            Back
          </button>
          <button disabled={this.active >= +this.steps} onClick={this.onNext.bind(this)}>
            Next
          </button>
        </footer>
      </Host>
    );
  }
}
