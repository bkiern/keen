import { newE2EPage } from '@stencil/core/testing';

describe('keen-stock-finder', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<keen-stock-finder></keen-stock-finder>');

    const element = await page.find('keen-stock-finder');
    expect(element).toHaveClass('hydrated');
  });
});
