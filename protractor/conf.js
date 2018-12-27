exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',

    // Capabilities to be passed to the webdriver instance.
  capabilities: {
    browserName: 'chrome'
  },
  specs: ['01_ilkelanding.js'],
    // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true, // Use colors in the command line report.
  }
};

