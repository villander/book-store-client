import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  model(params) {
    return RSVP.hash({
      bookWished: this.store.findAll('wishlist')
        .then((wishlist) => {
          const bookWished = wishlist.filterBy('bookId', params.id);
          return bookWished;
        }),
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

      return wishlist.save().then((record) => {
        this.controller.get('model.bookWished').pushObject(record);
      });
    },
    removeWishListItem(bookWished) {
      return bookWished.destroyRecord().then(() => { 
        // hack issue: https://github.com/emberjs/data/issues/4972
        this.store._removeFromIdMap(bookWished._internalModel);
        this.controller.get('model.bookWished').removeObject(bookWished); 
      });
    }
  }
});
