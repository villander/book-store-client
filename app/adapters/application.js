import DS from 'ember-data';
import Ember from 'ember';

const { inject: { service }, computed } = Ember;

export default DS.RESTAdapter.extend({
  namespace: 'api',
  host: 'http://localhost:3000',
  authManager: service(),

  headers: computed('authManager.accessToken', function() {
    return {
      "Authorization": `Bearer ${this.get("authManager.accessToken")}`
    };
  })
});
