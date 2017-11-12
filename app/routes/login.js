import Ember from 'ember';

const {
  inject: { service }
} = Ember;

export default Ember.Route.extend({
  authManager: service(),
  
  beforeModel() {
    if (this.get('authManager.isAuthenticated')) {
      this.transitionTo('books');
    }
  }
});
