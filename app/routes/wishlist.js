import Ember from 'ember';

const {
  inject: { service }
} = Ember;

export default Ember.Route.extend({
  authManager: service(),
  
  beforeModel() {
    if (!this.get('authManager.isAuthenticated')) {
      this.transitionTo('login');
    }
  },

  model() {
    return this.store.findAll('wishlist');
  },
  
  activate() {
    this._super(...arguments);
    window.scrollTo(0, 0);
  }
});
