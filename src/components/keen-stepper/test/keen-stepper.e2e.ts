import { newE2EPage } from '@stencil/core/testing';

describe('keen-stepper', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<keen-stepper></keen-stepper>');

    const element = await page.find('keen-stepper');
    expect(element).toHaveClass('hydrated');
  });
});
