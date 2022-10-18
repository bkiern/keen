import { newSpecPage } from '@stencil/core/testing';
import { KeenStockFinder } from '../keen-stock-finder';

describe('keen-stock-finder', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [KeenStockFinder],
      html: `<keen-stock-finder></keen-stock-finder>`,
    });
    expect(page.root).toEqualHtml(`
      <keen-stock-finder>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </keen-stock-finder>
    `);
  });
});
