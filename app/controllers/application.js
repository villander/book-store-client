import Ember from 'ember';

const {
  Controller,
  inject: { service }
} = Ember;

Ember.LinkComponent.reopen({
  attributeBindings: ['data-badge']
});

export default Controller.extend({
  cart: Ember.inject.service(),
  authManager: service(),
  actions : {
    logout() {
      this.get('authManager').invalidate();
      this.get('cart').empty();
    }
  }
});
