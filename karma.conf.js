customLaunchers: {
  ChromeHeadless: {
    base: 'Chrome',
    flags: [
      '--headless',
      '--disable-gpu',
      '--no-sandbox',
      '--remote-debugging-port=9222',
    ]
  }
},
browsers: ['ChromeHeadless'],
