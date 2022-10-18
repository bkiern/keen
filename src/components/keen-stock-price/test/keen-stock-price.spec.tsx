import { newSpecPage } from '@stencil/core/testing';
import { KeenStockPrice } from '../keen-stock-price';

describe('keen-stock-price', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [KeenStockPrice],
      html: `<keen-stock-price></keen-stock-price>`,
    });
    expect(page.root).toEqualHtml(`
      <keen-stock-price>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </keen-stock-price>
    `);
  });
});
