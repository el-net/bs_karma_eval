module.exports = function(config) { 
  config.set({
    port      : 9876,
    logLevel  : config.LOG_INFO,
    colors    : true,

    frameworks: ['mocha'],
    
    basePath  : process.cwd(),
    files     : [
      'node_modules/expect.js/index.js',
      'src/**/*.js',
      'test/client/**/*.js'      
    ],

    preprocessors: {
      'src/**/*.js': ['coverage']
      //TODO - start mock server
      //TODO - pack, uglify, minify, obfuscate
    },
    reporters : ['mocha','coverage','junit'],

    junitReporter: {
      outputDir: process.env.CIRCLE_TEST_REPORTS || "./", // results will be saved as $outputDir/$browserName.xml
      //outputFile: undefined, // if included, results will be saved as $outputDir/$browserName/$outputFile
      suite: 'PROJ' // suite will become the package name attribute in xml testsuite element
    },
    
    client: {
      captureConsole: true,
    }    
  });
  return config;
}