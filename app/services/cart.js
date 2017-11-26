import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),

  init() {
    this._super(...arguments);

    this.set('bookIds', Ember.A());

    let payload;

    if (window.localStorage.getItem('cart')) {
      payload = window.localStorage.getItem('cart');
      payload = JSON.parse(payload);
    }

    if (payload) {
      payload.forEach((item) => {
        this.get('bookIds').pushObject(this.get('store').createRecord('book', item));
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
      window.localStorage.setItem('cart', JSON.stringify(bookIds));
    } else {
      window.localStorage.removeItem('cart');
    }
  },

  bookPrices: Ember.computed.mapBy('bookIds', 'price'),
  total: Ember.computed.sum('bookPrices'),

  add(bookId) {
    this.get('bookIds').pushObject(bookId);
  },

  remove(bookId) {
    // https://stackoverflow.com/questions/38620994/ember-js-remove-only-one-instance-of-object-with-removeobject
    this.get('bookIds').removeObject(bookId);
  },

  empty() {
    if (this.get('bookIds.length')) {
      this.get('bookIds').clear();
    }
  }
});
