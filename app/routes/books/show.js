import Ember from 'ember';
import RSVP from 'rsvp';
import ENV from 'book-store-client/config/environment';

const { Logger, inject: { service } } = Ember;

export default Ember.Route.extend({
  authManager: service(),
  socketIOService: service('socket-io'),

  init() {
    this._super(...arguments);

    const socket = this.get('socketIOService').socketFor(ENV.API_HOST);
    socket.on('connect', this._connectHandler, this);

    this.socket = socket;
  },

  model(params) {
    return RSVP.hash({
      wishedBooks: this.store.findAll('wishlist'),
      book: this.store.findRecord('book', params.id)
    });
  },

  afterModel(model) {
    this.socket.emit('bookViewed', { bookId: model.book.id, userId: this.get('authManager.content.user.id') });
  },

  activate() {
    this._super(...arguments);
    window.scrollTo(0, 0);
  },

  _connectHandler(event) {
    Logger.info(`On open event has been called: ${event}`);
  },

  actions: {
    addInWishList(book) {
      const wishlist = this.store.createRecord('wishlist', {
        bookId: book.get('id'),
        title: book.get('volumeInfo.title'),
        img: book.get('volumeInfo.imageLinks.smallThumbnail'),
        book,
        author: book.get('volumeInfo.authors.firstObject')
      });

      return wishlist.save();
    },
    removeWishListItem(wishedBook) {
      return wishedBook.destroyRecord().then(() => {
        // hack issue: https://github.com/emberjs/data/issues/4972
        this.store._removeFromIdMap(wishedBook._internalModel);
      });
    }
  }
});
