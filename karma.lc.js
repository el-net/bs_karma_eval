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
      'src/**/*.js',
      'test/client/**/*.js'      
    ],

    //what browsers to use
    browsers  : [ 'Chrome' ],

    preprocessors: {
      //TODO - start mock server
      //TODO - pack, uglify, minify, obfuscate
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