import DS from 'ember-data';

export default DS.Model.extend({
  bookId: DS.attr('string'),
  title: DS.attr('string'),
  img: DS.attr('string'),
  author: DS.attr('string'),
  book: DS.belongsTo('book')
});
