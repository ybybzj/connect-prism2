'use strict';

var winston = require('winston');
var _ = require('lodash');
var PrismUtils = require('./prism-utils');

var defaultFileTransportOptions = {
  colorize: true
};

function Logger(prismUtils) {
  var logger = new (winston.Logger)({
    exitOnError: false,
    transports: [
      new (winston.transports.Console)({
        colorize: true,
        level: 'info'
      })]
  });

  this.useVerboseLog = function() {
    logger.transports.console.level = 'verbose';
  };

  this.logToFile = function(options){
    var transportOpts = _.extend({}, defaultFileTransportOptions, options);
    if(transportOpts.maxFiles != null){
      transportOpts.tailable = true;
    }
    logger.remove(winston.transports.Console)
      .add(winston.transports.File, transportOpts);
    console.log('Log to file:', transportOpts.filename);
  };

  this.logSuccess = function(modeMsg, req, prism) {
    var target = prismUtils.absoluteUrl(prism.config.https, prism.config.host, prism.config.port, req.url ? req.url : req.path);
    this.verboseLog(modeMsg + ' request: ' + target);
  };

  this.log = winston.info;
  this.warn = winston.warn;
  this.error = winston.error;
  this.verboseLog = logger.verbose;
}

module.exports = Logger;
