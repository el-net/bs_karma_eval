module.exports = function(config) {
  config.set({
    singleRun : true,
    autoWatch : false,
    port      : 9876,
    logLevel  : config.LOG_INFO,
    colors    : true,

    reporters : ['mocha'],
    frameworks: ['mocha'],
    
    basePath  : process.cwd(),
    files     : [
      'node_modules/expect.js/index.js',
      'test/client/**/*.js'      
    ],

    //what browsers to use
    browsers  : [ 'Chrome', 'Firefox', 'Safari',
      'bs_firefox_mac', 
      'bs_iphone5',
      'bs_iOS_7','bs_iOS_8','bs_Android_4_1','bs_Android_4_2'
    ],

    preprocessors: {
      //TODO - start mock server
      //TODO - pack, uglify, minify, obfuscate
    },

    // define custom browsers
    customLaunchers: {
      bs_firefox_mac: {
        base: 'BrowserStack',
        browser: 'firefox',
        browser_version: '21.0',
        os: 'OS X',
        os_version: 'Mountain Lion'
      },
      bs_iphone5: {
        real_mobile: false,
        base: 'BrowserStack',
        device: 'iPhone 5',
        os: 'ios',
        os_version: '6.0'
      },
      bs_iOS_7: {
          base: 'BrowserStack',
          device: 'iPhone 5S',
          os: 'ios',
          os_version: '7.0',
          real_mobile: 'false',
      },
      bs_iOS_8: {
          base: 'BrowserStack',
          device: 'iPhone 6',
          os: 'ios',
          os_version: '8.3',
          real_mobile: 'false',
      },
      bs_Android_4_1: {
          base: 'BrowserStack',
          browser: 'Android Browser',
          os: 'android',
          os_version: '4.1',
          real_mobile: 'false',
      },
      bs_Android_4_2: {
          base: 'BrowserStack',
          browser: 'Android Browser',
          os: 'android',
          os_version: '4.2',
          real_mobile: 'false',
      }      
    },
    client: {
      captureConsole: true,
    },    
     // global config of your BrowserStack account
    browserStack: {
      username : process.env.BROWSERSTACK_USERNAME,
      accessKey: process.env.BROWSERSTACK_KEY
    }
 })
}