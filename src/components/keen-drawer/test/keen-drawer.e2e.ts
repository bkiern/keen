import { newE2EPage } from '@stencil/core/testing';

describe('keen-drawer', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<keen-drawer></keen-drawer>');

    const element = await page.find('keen-drawer');
    expect(element).toHaveClass('hydrated');
  });
});
