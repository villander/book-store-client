import DS from 'ember-data';
import Ember from 'ember';
import ENV from 'book-store-client/config/environment';

const { inject: { service }, computed } = Ember;

export default DS.RESTAdapter.extend({
  namespace: 'api',
  host: ENV.API_HOST,
  authManager: service(),

  headers: computed('authManager.content', function() {
    return {
      'Authorization': `Bearer ${this.get('authManager.content.accessToken')}`,
      'X-Key': this.get('authManager.content.user.id')
    };
  })
});
