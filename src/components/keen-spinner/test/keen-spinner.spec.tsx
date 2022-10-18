import { newSpecPage } from '@stencil/core/testing';
import { KeenSpinner } from '../keen-spinner';

describe('keen-spinner', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [KeenSpinner],
      html: `<keen-spinner></keen-spinner>`,
    });
    expect(page.root).toEqualHtml(`
      <keen-spinner>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </keen-spinner>
    `);
  });
});
