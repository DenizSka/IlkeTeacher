// can not import Base Page? .loaded function is built in but it is not working.
// import basePage from './Base';
const dashboard = $$('.navbar-toggler');
const dropdown = $$('#navbarToggleExternalContent');

describe('homepage todo list', () => {

  it('open the page and check dropdown menu is showing the following', async () => {
    await browser.waitForAngularEnabled(false);
    await browser.get('http://www.ilkeciritci.com');
    await dashboard.click();
    await browser.wait(await this.isVisible(dropdown), 6000, `Failed to find element ${dropdown}. Timeout: 6000 ms.`);
    // return el.click();
    // // await basePage.dashboardShown();
    // await dropdown.isPresent(), 6000;

  });

  it('select publications and check it the project images are showing');
  it('select a random publication and check if a single project page is working');
  it('go to the projects page and check if page is loading');
  it('select a random project click view and see if the page is loading');
  it('check if exam results page is loading');
  it('check if contact me is loading');

// admin page tests
  it('login as admin, get the admin dashboard and get the admin dropdown menu');


});
