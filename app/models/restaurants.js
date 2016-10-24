import DS from 'ember-data';

export default DS.Model.extend({
  name:DS.attr('string'),
  open:DS.attr('string'),
  description:DS.attr('string'),
  img:DS.attr('string'),
  rating:DS.attr('number'),
  speciality: DS.attr('string'),
  reviews:DS.hasMany("review", { async:true }),
  class:DS.attr('string'),
});
