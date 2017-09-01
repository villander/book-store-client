import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    error: function(reason) {
      console.log(reason);
      this.transitionTo('/login');
      return false;
    }
  }
});
