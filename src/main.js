import Vue from 'vue'
import App from './App'
import router from './router'
import Http from './common/http'
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/radar'
import MyPlugin from './common/myPlugin'
import Vuex from 'vuex'
import store from './store'
import {SessionStorge} from "./common/utils";

Vue.config.productionTip = false;
Vue.use(MyPlugin);
Vue.use(Vuex)
Vue.component('chart',ECharts);
const  STATIC=process.env.NODE_ENV==='development'?process.env.STATIC_URL:process.env.STATIC_URL;
Object.defineProperty(Vue.prototype,'$http',{value:Http});
Object.defineProperty(Vue.prototype,'$sto',{value:SessionStorge});
Object.defineProperty(Vue.prototype,'$STATIC',{value:STATIC});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
router.beforeEach((to,from,next) => {

  let patientId=SessionStorge.getItem('patient_id');
  console.log(patientId)
  if(to.path==='/login'){
    next();
  }else{
    if(patientId!==undefined&&patientId!==''&&patientId!==null){
      next();
    }else{
      next('/login');
    }
  }


})
