import Ember from 'ember';

const {
  Controller,
  computed
} = Ember;

export default Controller.extend({
  cart: Ember.inject.service(),
  queryParams: ['page'],
  page: 1,
  chunckBooks: computed('model.[]', function() {
    console.log(this.get('model.meta'), 'meta');
    let result = [], chunkSize = 5;
    const model = this.get('model').toArray();
    for (let i = 0; i < model.length; i += chunkSize) {
      result.push(model.slice(i, i + chunkSize));
    }
    return result;
  }),
  metaData: computed.alias('model.meta'),

  showButtonPages: computed('metaData', function() {
    return this.get('metaData.total_pages') > 1;
  }),

  hasPrevPage: computed.gt('page', 1),


  actions: {
    nextPage() {
      if (this.get('page') < this.get('metaData.total_pages')) {
        this.set('page', this.get('page') + 1);
      }
    },

    prevPage() {
      if (this.get('page') > 1) {
        this.set('page', this.get('page') - 1);
      }
    },
    closeDialog() {
      this.set('showDialog', false);
    },
    openBook(book) {
      this.transitionToRoute('books.show', book.id);
    },
    buyItem(book) {
      this.get('cart').add(book);
    }
  }
});
