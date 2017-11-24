import Ember from 'ember';

export default Ember.Controller.extend({
  wishedBook: Ember.computed('model.wishedBooks.[]', function() {
    const wishedBook = this.get('model.wishedBooks').filterBy('bookId', this.get('model.book.id'));
    return wishedBook.get('firstObject');
  }),
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
    removeWishListItem(bookWished) {
      return bookWished.destroyRecord().then(() => {
        // hack issue: https://github.com/emberjs/data/issues/4972
        this.store._removeFromIdMap(bookWished._internalModel);
      });
    }
  }
});
