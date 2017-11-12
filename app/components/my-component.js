import Ember from 'ember';

export default Ember.Component.extend({
  bookWished: Ember.computed('model.bookWished.[]', function() {
    return this.get('model.bookWished.firstObject');
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
