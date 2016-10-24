import DS from 'ember-data';

export default DS.Model.extend({
  name:DS.attr('string'),
  date:DS.attr('string'),
  comment:DS.attr('string'),
  rating:DS.attr('number'),
  restaurant: DS.belongsTo('restaurants')
});
