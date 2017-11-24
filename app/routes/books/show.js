import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  model(params) {
    return RSVP.hash({
      wishedBooks: this.store.findAll('wishlist'),
      book: this.store.findRecord('book', params.id)
    });
  },
  activate() {
    this._super(...arguments);
    window.scrollTo(0, 0);
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
