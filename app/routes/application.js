import Ember from 'ember';

const {
  inject: { service }
} = Ember;

export default Ember.Route.extend({
  authManager: service(),
  actions: {
    error(reason) {
      if (reason.errors[0].status === '401') {
        this.get('authManager').invalidate();
      }
    }
  }
});
