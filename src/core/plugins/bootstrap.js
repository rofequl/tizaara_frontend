import Vue from "vue";
import {BootstrapVue, IconsPlugin} from "bootstrap-vue";

window._ = require('lodash');
try {
    window.Popper = require('popper.js').default;
    window.$ = window.jQuery = require('jquery');

    require('bootstrap');
} catch (e) {
}

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

/*============================================
// npm i axios vform
============================================= */
import {Form, HasError, AlertError} from 'vform';

Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);
window.Form = Form;

/*============================================
// npm install sweetalert2
============================================= */
import swal from 'sweetalert2'

const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});
window.toast = toast;
window.swal = swal;

import GoogleAuth from '@/core/config/google_oAuth'

const gauthOption = {
    clientId: '541835342636-cpkgm0vn65eev3p1b3o3hngibfsd09ul.apps.googleusercontent.com',
    scope: 'profile email',
    prompt: 'select_account'
}
Vue.use(GoogleAuth, gauthOption)

import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
    preLoad: 1.3,
    loading: 'https://i.ibb.co/jG5PXnD/spinner.gif',
    attempt: 1
})
