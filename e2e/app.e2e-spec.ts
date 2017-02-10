import { SigmaFrontendPage } from './app.po';

describe('sigma-frontend App', function() {
  let page: SigmaFrontendPage;

  beforeEach(() => {
    page = new SigmaFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
