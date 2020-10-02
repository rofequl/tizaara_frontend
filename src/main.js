import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {iconsSet as icons} from './assets/icons/icons.js'
import store from './core/services/store'
import ApiService from "./core/services/api.service";
import {VERIFY_AUTH} from "./core/services/store/auth.module";
import {GENERAL_LIST} from "@/core/services/store/general.module";

// Vue 3rd party plugins
import "./core/plugins/bootstrap";

ApiService.init();

/*============================================
// fontawesome-svg-core
============================================= */
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    Promise.all([store.dispatch(VERIFY_AUTH)]).then(next);
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
    document.title = to.meta.title;
});

window.Fire = new Vue();

new Vue({
    router,
    store,
    icons,
    render: h => h(App),
    created() {
        store.dispatch(GENERAL_LIST)
    }
}).$mount('#app')
