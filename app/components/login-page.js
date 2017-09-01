import Ember from 'ember';

export default Ember.Component.extend({
  authManager: Ember.inject.service(),
  classNames: ['torii-iframe-placeholder'],

  actions: {
    authenticate() {
      const { login, password } = this.getProperties('login', 'password');
      this.get('authManager').authenticate(login, password);
      // .then(() => {
      //   alert('Success! Click the top link!');
      // }, (err) => {
      //   alert('Error obtaining token: ' + err.responseText);
      // });
    }
  }
});
