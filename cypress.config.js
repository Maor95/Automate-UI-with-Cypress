const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    env: {
      login_url: '/login',
      products_url: '/products',
      defaultCommandTimeout : 10000,
      number_of_pages: 4
    },
    baseUrl : 'https://www.ebay.com/',
    watchForFileChanges : false,

  }
})