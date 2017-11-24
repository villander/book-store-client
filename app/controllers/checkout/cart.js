import Ember from 'ember';

export default Ember.Controller.extend({
  cart: Ember.inject.service(),
  actions: {
    removeItem(bookId) {
      this.get('cart').remove(bookId)
    },
    goToPurchase() {
        this.get('cart').empty();
        this.transitionToRoute('checkout.payment');
    }
  }
});
