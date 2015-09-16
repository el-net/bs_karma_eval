module.exports = function(config) {
  require('./karma.base.js')(config).set({
    singleRun : false,
    autoWatch : true,

    //what browsers to use
    browsers  : [ 'Chrome', 'Safari', 'Opera', 'Firefox' ],
 })
}