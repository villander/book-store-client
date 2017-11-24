import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),

  bookIds: [],

  init() {
    this._super(...arguments);

    let payload;

    if (window.localStorage.getItem('cart')) {
      payload = window.localStorage.getItem('cart');
      payload = JSON.parse(payload);
    }

    if (payload) {
      payload.forEach((item) => {
        this.get('bookIds').pushObject(item);
      });
    }

    this.addObserver('bookIds.[]', this, this._dumpToLocalStorage.bind(this));
  },

  willDestroy() {
    this._super(...arguments);

    this.removeObserver('bookIds.[]', this, this._dumpToLocalStorage.bind(this));
  },

  _dumpToLocalStorage() {
    let bookIds = this.get('bookIds');
    if (!Ember.isEmpty(bookIds)) {
      window.localStorage.setItem('cart', JSON.stringify(this.get('bookIds')));
    } else {
      window.localStorage.removeItem('cart');
    }
  },

  books: Ember.computed('bookIds.[]', function() {
    let bookIds = this.get('bookIds');
    return Ember.isEmpty(bookIds) ? bookIds : this.get('store').query('book', { ids: bookIds });
  }),

  bookPrices: Ember.computed.mapBy('books', 'price'),

  total: Ember.computed.sum('bookPrices'),

  add(bookId) {
    this.get('bookIds').pushObject(bookId);
  },

  remove(bookId) {
    this.get('bookIds').removeObject(bookId);
  },

  empty() {
    if (this.get('bookIds.length')) {
      this.get('bookIds').clear();
    }
  }
});
