import Vue from 'vue';
import firebase from 'firebase';
import { fbConfig } from './helpers/firebaseConfig';
import App from './App.vue';
import router from './router';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faUser, faEnvelope, faMobile, faFingerprint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';

dom.watch();
library.add(fab, faUser, faEnvelope, faMobile, faFingerprint);
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

let app = '';

if (!app) {
  app = new Vue({
    router,
    created() {
      firebase.initializeApp(fbConfig);
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // this.$router.push('/dashboard');
          this.$router.push('/home');
        }
        else {
          this.$router.push('/home');
        }
      });
    },
    render: h => h(App)
  }).$mount('#app');
}