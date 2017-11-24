import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('books', function() {
    this.route('show', { path: '/:id'});
  });
  this.route('secret');
  this.route('wishlist');
  this.route('checkout', function() {
    this.route('cart');
    this.route('payment');
  });
});

export default Router;
