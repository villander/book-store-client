import Ember from 'ember';
import ENV from 'book-store-client/config/environment';

const { Logger, inject: { service } } = Ember;

export default Ember.Controller.extend({
  authManager: service(),
  socketIOService: service('socket-io'),
  cart: service(),

  init() {
    this._super(...arguments);

    const socket = this.get('socketIOService').socketFor(ENV.API_HOST);
    socket.on('connect', this._connectHandler, this);

    this.socket = socket;
  },

  _connectHandler(event) {
    Logger.info(`On open event has been called: ${event}`);
  },

  _triggerBooksPurchased(books) {
    const bookIds = books.map((book) => {
      return book.id;
    });
    this.socket.emit('booksPurchased', { userId: this.get('authManager.content.user.id'), bookIds });
  },

  actions: {
    removeItem(bookId) {
      this.get('cart').remove(bookId)
    },
    goToPurchase() {
      this._triggerBooksPurchased(this.get('cart.bookIds'));
      this.get('cart').empty();
      this.transitionToRoute('checkout.payment');
    }
  }
});
