import Ember from 'ember';

const {
  computed,
  Object: EmberObject
} = Ember;

export default EmberObject.extend({
  selfLink: '',
  etag: '',
  volumeInfo: {},
  saleInfo: {},

  price: computed('saleInfo.listPrice.amount', function() {
    return this.get('saleInfo.listPrice.amount') || 29.90
  }),
});