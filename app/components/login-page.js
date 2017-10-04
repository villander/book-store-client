import Ember from 'ember';

export default Ember.Component.extend({
  authManager: Ember.inject.service(),
  classNames: ['torii-iframe-placeholder'],

  actions: {
    authenticate() {
      this.get('authManager').authenticate();
      // .then(() => {
      //   alert('Success! Click the top link!');
      // }, (err) => {
      //   alert('Error obtaining token: ' + err.responseText);
      // });
    }
  }
});
