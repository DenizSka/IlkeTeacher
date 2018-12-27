export default class BasePage {
  constructor() {
    super();
    this.dashboard = $$('.navbar-toggler');
    this.dropdown = $$('.collapse show');
  }
  async dashboardShown() {
    await this.dashboard.click();
    expect(await this.dropdown.loaded()).toBe(true, 'Dropdown is not loaded');
  }
}
