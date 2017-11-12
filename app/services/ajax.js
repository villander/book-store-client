import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';
import ENV from 'book-store-client/config/environment';

const {
  computed,
  inject: { service }
} = Ember;

export default AjaxService.extend({
  authManager: service(),

  namespace: 'api',
  host: ENV.API_HOST,
  headers: computed('authManager.authToken', {
    get() {
      let headers = {};
      const authToken = this.get('accessToken.authToken');
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }
      return headers;
    }
  })
});