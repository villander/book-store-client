import Ember from 'ember';

export default Ember.Controller.extend({
  bookWished: Ember.computed.readOnly('model.bookWished.firstObject'),
});
