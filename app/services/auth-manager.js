import Ember from 'ember';
import ENV from 'book-store-client/config/environment';

const {
  Service,
  computed,
  isEmpty,
  inject: { service }
} = Ember;

const { keys } = Object;

const COOKIE_NAME = 'lm-store-auth-session';

export default Service.extend({
  cookies: service(),
  router: service(),
  ajax: service(),

  isAuthenticated: computed.notEmpty('content'),

  content: computed({
    get() {
      let data = this.get('cookies').read(COOKIE_NAME);
      if (isEmpty(data)) {
        return {};
      } else {
        return JSON.parse(data);
      }
    },
    set(_, value) {
      let data = JSON.stringify(value || {});
      this.get('cookies').write(COOKIE_NAME, data);
      return value;
    }
  }),

  init() {
    this._super(...arguments);
    this.set('API_HOST', ENV.API_HOST);
    if (keys(this.get('content')).length === 0) {
      this.set('content', null);
    }
    window.addEventListener('message', this._receiveMessage.bind(this));
  },

  _receiveMessage(event) {
    if (event.origin === this.get('API_HOST')) {
      const { email, name, id, accessToken } = event.data.google;
      this.set('content', { accessToken, user: { email, name, id } });
      this.get('router').transitionTo('books', { queryParams: { page: 1 } });
    }
  },

  authenticate() {
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;
    const h = 500;
    const w = 450;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const left = ((width / 2) - (w / 2)) + dualScreenLeft;
    const top = ((height / 2) - (h / 2)) + dualScreenTop;
    const url = `${this.get('API_HOST')}/auth/google`;
    window.open(url, 'Authorize', `height=${h}, width=${w}, top=${top}, left=${left}`);
  },

  invalidate() {
    return this.get('ajax').request(
      '/logout',
      { method: 'GET' }
    ).then(() => {
      this.set('content', null);
      this.get('router').transitionTo('login');
    });
  },
});
