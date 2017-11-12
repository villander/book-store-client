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
  actions: {
    loading(transition, originRoute) {
      // let controller = this.controllerFor('foo');
      // controller.set('currentlyLoading', true);
      // transition.promise.finally(function() {
      //     controller.set('currentlyLoading', false);
      // });
      console.log('loading...');
    }
  }
});
