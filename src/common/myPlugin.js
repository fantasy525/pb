/**
 * Created by zxf on 2017.12.4.
 */

let ipt = [];
let errDom = {}
let vm;
import {arrHas,objHasKey} from "./utils";

export default {
  install(Vue, options) {
    Vue.directive('validate', {
      inserted(el, binding, vnode, oldValue){
       // if(ipt.length===0){
       //   return false;
       // }
       // ipt=[];
       // console.log('888',ipt)
      },
      bind(el, binding, vnode, oldValue) {
        // vm=Object.assign({},vnode.context[binding.arg]);
        vm = vnode.context;
        if (binding.arg === 'click') {
          let methods=binding.value;
          el.addEventListener('click', function () {
            let isPass=true;
            console.log(isPass)
            ipt.forEach(function (item, index) {
              if(arrHas(item.rules,'empty')!==undefined){

                if (vm[item.ipt] === '') {

                  vm[item.err] = true;
                  console.log('empty')
                  errDom[item.ipt].innerHTML = '不能为空';
                  isPass=false;
                  return false;
                } else {
                  vm[item.err] = false;
                  errDom[item.ipt].innerHTML = ''
                }
              }
              if(arrHas(item.rules,'phone')!==undefined){

                let reg=/^1\d{10}$/;
                let flag=reg.test((vm[item.ipt]));
                if(!flag){
                  console.log('phone')
                  isPass=false;
                  vm[item.err] = true;
                  errDom[item.ipt].innerHTML = '手机号码格式不正确'
                  return false;
                }
              }
              if(arrHas(item.rules,'compare')!==undefined){

               console.log('compare',domValue,vm['PASSWORD'])
                let domValue=item.dom.value;
                if(domValue!==vm['PASSWORD']){

                  isPass=false;
                  vm[item.err]=true;

                  errDom[item.ipt].innerHTML='两次输入不匹配'
                  return false;
                }
              }
            });

            if(isPass){
              vm[methods]();
            }
          })
        } else {
          if (binding.arg === 'err') {
            errDom[binding.value]=el;
            //errDom.push({dom: el, ipt: binding.value})
          }else{
            let keys = objHasKey(binding.modifiers);
            if(ipt.length>3){
              ipt=[];
            }
            ipt.push({
              dom:el,
              ipt: binding.arg,
              err: binding.value,
              rules: keys
            })

            console.log(ipt)
          }

        }

      }, update(el, binding, vnode, oldValue) {

      }

    })
  }
}
