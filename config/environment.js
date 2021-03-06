/* eslint-env node */
'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'book-store-client',
    environment,
    rootURL: '/',
    locationType: 'auto',
    API_HOST: 'https://morning-mountain-77224.herokuapp.com',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    'ember-websockets': {
      socketIO: true
    },
    contentSecurityPolicy: {
      'default-src': ["'none'"],
      'script-src': ["'self'",],
      'font-src': ["'self'", "https://fonts.gstatic.com"],
      'connect-src': ["'self'", "http://localhost:3000", "ws://localhost:3000", "https://morning-mountain-77224.herokuapp.com"],
      'img-src': ["'self'", "*", "data:"],
      'style-src': ["'self' 'unsafe-inline' https://fonts.googleapis.com"],
      'media-src': ["'self'"]
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.API_HOST = 'http://localhost:3000';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
