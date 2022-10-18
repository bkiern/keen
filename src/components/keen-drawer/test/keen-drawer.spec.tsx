import { newSpecPage } from '@stencil/core/testing';
import { KeenDrawer } from '../keen-drawer';

describe('keen-drawer', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [KeenDrawer],
      html: `<keen-drawer></keen-drawer>`,
    });
    expect(page.root).toEqualHtml(`
      <keen-drawer>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </keen-drawer>
    `);
  });
});
