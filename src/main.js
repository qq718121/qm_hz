// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import fastclick from 'fastclick';
import setFontsize from './common/js/setFontsize';
import Axios from 'axios';
import Element from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import {url} from './common/js/urlLocation';
import store from './common/js/store';
import weixin from './common/js/share'
import {class_name_ftn} from './common/js/computed_class_name';
import wx from 'weixin-js-sdk';


Vue.config.productionTip = false;
fastclick.attach(document.body);
Vue.prototype.$Axios = Axios;
Vue.prototype.$url = url;
Vue.prototype.$store = store;
Vue.prototype.$class_name_ftn = class_name_ftn;
weixin();
setFontsize();

Vue.use(Element);
Vue.use(wx);

/* eslint-disable no-new */
let vm = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  },
});

var bus = new Vue({});
Vue.prototype.$bus = bus;
console.log(bus)






