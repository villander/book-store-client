import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    page: {
      refreshModel: true
    }
  },
  model(params) {
    const { page } = params;
    return this.store.query('book', { page });
  },
  afterModel() {
    this._super(...arguments);
    window.scrollTo(0, 0);
  }
});
