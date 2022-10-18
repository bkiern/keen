import { newE2EPage } from '@stencil/core/testing';

describe('keen-spinner', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<keen-spinner></keen-spinner>');

    const element = await page.find('keen-spinner');
    expect(element).toHaveClass('hydrated');
  });
});
