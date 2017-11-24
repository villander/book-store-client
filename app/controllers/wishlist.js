import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
      removeWishListItem(bookWished) {
        return bookWished.destroyRecord().then(() => {
          // hack issue: https://github.com/emberjs/data/issues/4972
          this.store._removeFromIdMap(bookWished._internalModel);
        });
      }
    }
});
