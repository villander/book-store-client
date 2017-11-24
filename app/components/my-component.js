import Ember from 'ember';

export default Ember.Component.extend({
  bookWished: Ember.computed('model.bookWished.[]', function() {
    const bookWished = this.get('model.bookWished').filterBy('bookId', this.get('model.book.id'));
    return bookWished;
  }),
  actions: {
    addInWishList(book) {
      this.get('addInWishList')(book);
    },
    removeWishListItem(bookWished) {
      this.get('removeWishListItem')(bookWished);
    }
  }
});
