'use strict';

var assert = require('assert');
var di = require('di');

var prism = require('../../');

var Api = require('../../lib/services/api');
var PrismManager = require('../../lib/prism-manager');

describe('api', function() {
  var api;

  beforeEach(function() {
    function MockPrismManager() {
      this.getApiConfig = function() {
        return {
          enabled: true,
          route: '/_prism/'
        };
      };
    }
    
    // NOTE: it's important to annotate before getting the injector instance
    di.annotate(MockPrismManager, new di.Provide(PrismManager));
    var injector = new di.Injector([MockPrismManager]);    
       
    api = injector.get(Api);
  });

  it('should validate a real prism api request', function() {
    var validApiRequest = api.isApiRequest({
      "url": "/_prism/foo"
    });

    assert.equal(validApiRequest, true);
  });

  it('should invalidate an incorrect prism api request', function() {
    var validApiRequest = api.isApiRequest({
      "url": "/anyOtherRequest/foo"
    });

    assert.equal(validApiRequest, false);
  });
});