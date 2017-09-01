import DS from 'ember-data';

export default DS.Model.extend({
  selfLink: DS.attr('string'),
  etag: DS.attr('string'),
  volumeInfo: DS.attr()
});
