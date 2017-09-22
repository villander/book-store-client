import Ember from 'ember';
import ENV from 'book-store-client/config/environment';

const {
  Service,
  computed,
  inject: { service }
} = Ember;

const COOKIE_NAME = 'session-token';

export default Service.extend({
  cookies: service(),

  isAuthenticated: computed.notEmpty('accessToken'),

  accessToken: computed({
    get() {
      return this.get('cookies').read(COOKIE_NAME);
    },
    set(_, value) {
      this.get('cookies').write(COOKIE_NAME, value);
      return value;
    }
  }),

  init() {
    this._super(...arguments);
    this.set('API_HOST', ENV.API_HOST);
    window.onmessage = (e) => {
      if (e.origin === this.get('API_HOST')) {
        this.set('accessToken', e.data.google.accessToken);
      }
    };
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
    this.set('accessToken', null);
  },
});
