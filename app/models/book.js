import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  selfLink: DS.attr('string'),
  etag: DS.attr('string'),
  volumeInfo: DS.attr(),
  saleInfo: DS.attr(),

  price: Ember.computed('saleInfo.listPrice.amount', function() {
    return this.get('saleInfo.listPrice.amount') || 29.90
  }),
});
