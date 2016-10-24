import Ember from 'ember';
import _ from 'underscore';


export default Ember.Controller.extend({
    stars: [{"class":"star-icon full", "id":1},
            {"class":"star-icon full", "id":2},
            {"class":"star-icon full", "id":3},
            {"class":"star-icon full", "id":4},
            {"class":"star-icon full", "id":5}],

    isValid: Ember.computed.notEmpty('name') || Ember.computed.notEmpty('comment'),
    isDisabled: Ember.computed.not('isValid'),

    addClass:function(object){
      var self = this;
      self.ok = true;
      this.get(object).forEach(function(item){
          if (self.ok){
              item.set('class','item active');
              self.ok = false;
          }else{
            item.set('class','item');
          }
      });
    },

    init:function(){
        this.restaurants = this.store.findAll('restaurants');
        this.set('restaurants', this.restaurants);
        this.set('stars', this.stars);
    },

    actions: {
        setRestaurant:function(id){
            this.restaurantId = id;
        },

        postReview: function() {
            const comment = Ember.Handlebars.Utils.escapeExpression(this.get('comment'));
            const name = Ember.Handlebars.Utils.escapeExpression(this.get('name'));
            var rating = this.get('rating');
            if (rating === undefined || rating === null){
              rating = 0;
            }
            const date = moment();
            const newReview = this.store.createRecord('review', { comment: comment, name:name, rating:parseInt(rating), date:date });
            this.store.find('restaurants', this.restaurantId).then(function(restaurant) {
                restaurant.get('reviews').pushObject(newReview);
                var restaurantRate = Math.ceil((parseInt(restaurant.get('rating')) + parseInt(newReview.get('rating'))) / 2);
                restaurant.set('rating', restaurantRate);
                newReview.save().then(function() {
                    return restaurant.save();
                });
            });
        },

        updateRating:function(value){
            this.rating = value;
        },

        updateCuisine:function(value){
          this.cuisine = value;
        },

        filter:function(){
            self = this;
            if (self.rating === undefined){
              self.rating = 0;
            }
            if (self.cuisine === undefined){
              self.cuisine = 'All';
            }
            self.set('restaurants',self.store.findAll('restaurants').then(function(response){
                  self.filteredByRating = response.filterBy('rating', parseInt(self.rating));
                  if (self.filteredByRating.length > 0){
                     if (self.cuisine !== 'All' && self.cuisine !== undefined){
                          self.filteredByCuisine = self.filteredByRating.filterBy('speciality', self.cuisine);
                      }else{
                          self.filteredByCuisine = self.filteredByRating;
                      }
                  }else{
                      self.filteredByCuisine = response.filterBy('speciality', self.cuisine);
                  };
                  if (self.filteredByCuisine.length > 0){
                      self.set('filterred', self.filteredByCuisine);
                  }else{
                    self.set('filterred', response);
                  }
                  self.addClass("filterred");
                  self.set('restaurants', self.get('filterred'));
            }));

        }
    }

});
