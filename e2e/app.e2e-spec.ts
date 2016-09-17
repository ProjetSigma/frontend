import { FrontendNewPage } from './app.po';

describe('frontend-new App', function() {
  let page: FrontendNewPage;

  beforeEach(() => {
    page = new FrontendNewPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
