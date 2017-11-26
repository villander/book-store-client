import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('books', function() {
    this.route('show', { path: '/:id' });
  });
  this.route('secret');
  this.route('wishlist');
  this.route('checkout', function() {
    this.route('cart');
    this.route('payment');
  });
});

export default Router;
