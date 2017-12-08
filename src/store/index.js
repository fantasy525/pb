/**
 * Created by zxf on 2017.12.6.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import {SessionStorge} from '@/common/utils'
Vue.use(Vuex);
const sto=SessionStorge;
let patient_id=sto.getItem('patient_id');
let testHistory={
  "h1":{
    name:'',
    isTest:false,
    score:''
  },
  "h2":{
    name:'',
    isTest:false,
    score:''
  },
  "h3":{
    name:'',
    isTest:false,
    score:''
  },
  "h4":{
    name:'',
    isTest:false,
    score:''
  },
  "h5":{
    name:'',
    isTest:false,
    score:''
  },
  "h6":{

    name:'',
    isTest:false,
    score:''
  },
  "h7":{
    name:'',
    isTest:false,
    score:''
  },
  "h8":{
    name:'',
    isTest:false,
    score:''
  },
  "h9":{
    name:'',
    isTest:false,
    score:''
  }
}
let stoHistory=sto.getItem('testHistory')?sto.getItem('testHistory'):testHistory;
const store =new Vuex.Store({
  state:{
    result:'',
    patient_id:patient_id?patient_id:'',
    testHistory:stoHistory
  },
  mutations:{
    SET_PATIENT_ID(state,data){
      state.patient_id=data;
      sto.setItem('patient_id',data);
    },
    SET_HISTORY(state,data){

      state.testHistory[data.item]=data.result;
      sto.setItem('testHistory', state.testHistory)
    }
  },
  actions:{
    SET_PATIENT_ID({commit},data){
      commit('SET_PATIENT_ID',data);
    },
    SET_HISTORY({commit},data){
      commit('SET_HISTORY',data)
    }
  },
  getters:{
    result:(state)=>{
      return state.result;
    },
    testHitory:(state) =>{
      return state;
    }
  }
})
export default store;
