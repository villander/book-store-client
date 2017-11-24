import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  bookId: DS.attr('string'),
  title: DS.attr('string'),
  img: DS.attr('string'),
  author: DS.attr('string'),
  book: DS.belongsTo('book'),

  price: Ember.computed('book.saleInfo.listPrice.amount', function() {
    return DS.PromiseObject.create({
      promise: this.get('book').then((book) => {
        return book.get('saleInfo.listPrice.amount') || 29.90;
      })
    });
  }),
});
