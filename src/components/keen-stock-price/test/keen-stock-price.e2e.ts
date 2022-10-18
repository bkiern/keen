import { newE2EPage } from '@stencil/core/testing';

describe('keen-stock-price', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<keen-stock-price></keen-stock-price>');

    const element = await page.find('keen-stock-price');
    expect(element).toHaveClass('hydrated');
  });
});
