import { newSpecPage } from '@stencil/core/testing';
import { KeenStepper } from '../keen-stepper';

describe('keen-stepper', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [KeenStepper],
      html: `<keen-stepper></keen-stepper>`,
    });
    expect(page.root).toEqualHtml(`
      <keen-stepper>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </keen-stepper>
    `);
  });
});
