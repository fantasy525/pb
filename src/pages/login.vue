<template>
  <div class="wrap">
    <div class="content">
      <img :src="$STATIC+'static/login/logo.png'" alt="" class="logo">
      <div class="form-wrap">
        <ul class="form" v-if="isLogin">
          <li>
            <input placeholder="请输入手机号" type="number" :key="0"
                   v-model="MOBILENUMBER"
                  >
          </li>
          <li class="wrong">
            <p v-show="phoneMsg"
                >{{phoneWaring}}</p>
          </li>
          <li>
            <input type="password" placeholder="请输入密码"
                   v-model="PASSWORD"
                  :key="1"
                   v-validate:PASSWORD.empty="'pwdMsg'">
          </li>
          <li class="wrong"><p
                   v-show="pwdMsg"
                  >{{pwdWaring}}</p></li>
          <li class="login-btn">
            <input type="button" value="登录"
                   :key="2"
                  @click="login">
          </li>
          <li class="qa flex space-between">
            <a href="javascript:void(0)">忘记密码</a><a href="javascript:void(0)" @click="goReg">注册账号</a>
          </li>
        </ul>
        <ul class="form" v-if="isRegister">
          <li>
            <input placeholder="请输入手机号" type="number" :key="3"
                   v-model="MOBILENUMBER"
                   v-validate:MOBILENUMBER.empty.phone="'phoneMsg'"
            >
          </li>
          <li class="wrong">
            <p
                  v-show="phoneMsg"
                  v-validate:err="'MOBILENUMBER'" ref="phoneWaring"></p>
          </li>
          <li>
            <input type="password" placeholder="请输入密码"
                   v-model="PASSWORD"
                   :key="4"
                   v-validate:PASSWORD.empty="'pwdMsg'">
          </li>
          <li class="wrong"><p
                   v-show="pwdMsg"
                   v-validate:err="'PASSWORD'"></p></li>
          <li>
            <input type="password" placeholder="请再次确认密码"
                   v-model="ensurePassword"
                   :key="5"
                   ref="ensure"
                   v-validate:ensurePassword.empty.compare="'compareMsg'">
          </li>
          <li class="wrong"><p
                    v-show="compareMsg" v-validate:err="'ensurePassword'"></p></li>
          <li style="background-color:#fff;" class="liRadius">
            <!--<input type="text" placeholder="请输入验证码" class="code"-->
                   <!--v-validate:authCode.empty="'authMsg'"-->
                   <!--v-model="authCode">-->
            <input type="text" placeholder="请输入验证码" class="code"
                   :key="6"
                   v-model="authCode"><input type="button" class="getCode"  value="获取" @click="getCode($event)">
          </li>
          <li class="wrong"><p
            v-validate:err="'authCode'"
            v-show="authMsg">{{authCodeWaring}}</p></li>
          <li class="login-btn">

            <input type="button" value="注册"   :key="7" v-validate:click="'reg'">
          </li>
        </ul>
      </div>
    </div>
    <my-dialog v-if="showDialog"
    @ensure="goReg();showDialog=false;"
               @cancel="showDialog=false"
    ></my-dialog>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import axios from 'axios'
  import Dialog from '@/components/dialog'
  export default {
    name: 'Login',
    data() {
      return {
        phoneNum: '',
        PASSWORD: '',
        phoneWaring: '',
        pwdWaring: '',
        phoneMsg: false,
        pwdMsg: false,
        isLogin: true,
        isRegister: false,
        authCode: '',
        authMsg: '',
        authCodeWaring: '',
        compareMsg:false,
        ensurePassword:'',
        showDialog:false
      }
    },

    methods: {
      ...mapActions(['SET_PATIENT_ID']),
      goReg() {
        if (this.isLogin) {

          this.isLogin = false;
          this.isRegister = true;
         this.$nextTick(()=>{
           console.log(this.$refs.ensure.value);
         })
          this.phoneNum='';
          this.PASSWORD='';
          this.phoneMsg='';
          this.pwdWaring='';
          this.pwdMsg='';
          this.phoneNum='';
          this.ensurePassword='';
          this.$router.push({query:{page:'reg'}})
        }
      },
      checkEmpty() {

        let flag = false;
        if (this.phoneNum === '') {

          this.phoneMsg = true;
          this.phoneWaring = '不能为空';
          flag = true;
        } else {
          this.phoneMsg = false;
          this.phoneWaring = '';
        }
        if (this.PASSWORD === '') {
         console.log('pwd')
          this.pwdMsg = true;
          this.pwdWaring = '不能为空';
          flag = true;
        } else {
          console.log('pwd22')
          this.pwdMsg = false;
          this.pwdWaring = '';
        }
        return flag;
      },
      checkPhone(str) {
        let reg = /^1\d{10}$/;
        let flag = reg.test(str);
        if (!flag) {
          this.phoneMsg = true;
          this.phoneWaring = '请输入正确的手机号码'
        }
        return flag;
      },
      calTime(dom,time){
        this.timer=setTimeout(()=>{
          time--;
          if(time<0){
            dom.disabled=false;
            dom.value=`获取`;

            clearTimeout(this.timer);
            return false;
          }
          dom.value=`${time}s`;
          this.calTime(dom,time)
        },1000)
      },
      getCode(e){
        if(this.phoneNum==='') return false;
        let dom=e.target;
        let time=10;
        dom.value=`${time}s`;
        dom.disabled=true;
        this.calTime(dom,time)
      },
      login() {
        if(!this.checkEmpty()){
          if(this.checkPhone(this.phoneNum)){
            let data={
              MOBILENUMBER:this.phoneNum,
              PASSWORD:this.PASSWORD
            };
            this.$http.post('/phwechat/land.do',data).then((res) =>{
              if(res.result==='01'){
                this.SET_PATIENT_ID(res.data);
                this.$router.push('/home');
              }else if(res.result==='02'){
                console.log('33')
                this.pwdMsg=true;
                this.pwdWaring='密码错误';
              }else if(res.result==='04'){
                this.showDialog=true;
              }
            });

          }
        }
      },
      reg(){
        console.log('注册')
        let data={
          MOBILENUMBER:this.phoneNum,
          PASSWORD:this.PASSWORD
        }
        this.$http.post('/phwechat/zhucetiao.do',data).then((res) =>{

        if(res.result==='01'){
          console.log(this);
          this.isLogin=true;
          this.isRegister=false;

          this.phoneNum='';
          this.PASSWORD='';
          this.phoneMsg='';
          this.pwdWaring='';
          this.pwdMsg='';
          this.phoneNum='';

          this.ensurePassword='';

        }else{

          this.phoneMsg=true;
          this.$refs.phoneWaring.innerHTML='您的手机号已经注册';
        }
        }).catch((e)=>{
          console.log(e);
        })
        console.log(this.phoneNum,this.PASSWORD);
      }
    },
    computed: {

      MOBILENUMBER: {
        get() {
          return this.phoneNum;
        },
        set(val) {
          if (!val) return;
          this.phoneNum = val;
          if (this.phoneNum.length > 11) {
            this.phoneNum = this.phoneNum.substring(0, 11);
          }

        }
      }
    },
    components:{
      'my-dialog':Dialog
    },
    beforeRouteEnter(to, from, next) {

      next(vm => {
        vm.$router.replace({query:{page:'login'}})
      });
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当守卫执行前，组件实例还没被创建
    },
    watch:{
      $route(){
        console.log(this.$route)
        if(this.$route.query.page==='login'){
          this.isLogin = true;
          this.isRegister = false;
          this.phoneNum='';
          this.PASSWORD='';
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../common/scss/mixin';

  .ipt {
    background-color: #fff;

    height: 75px;
    padding-left: 75px;
    font-size: 24px; /*px*/
    color: #999;
  }

  .wrap {
    position: absolute;
    left:0;
    right:0;
    bottom:0;
    top:0;
    height: 100%;
    background: url("../../static/home/bk.png") center center no-repeat;
    background-size: 100% 100%;
  }

  .form-wrap {
    margin: 150px auto 0;
    padding-bottom: 113px;
    @include bk('login/rec.png', 100);
  }

  .content {
    width: 671px;

    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    & .logo {
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%, 0);
    }
  }

  .form {
    width: 520px;
    margin: 0 auto;
    padding-top: 120px;
  }

  .form li input[type='password'], .form li input[type='number'] {
    width: 445px;
    @extend .ipt;
  }

  .form li input::-webkit-input-placeholder {

    color: #999;
  }

  .wrong {
    height: 40px;
    padding-left: 75px;
    color: red;
    line-height: 40px;
    font-size: 24px; /*px*/
  }

  .login-btn input {
    width: 520px;
    height: 73px;

    background-color: #66cffa;
    text-align: center;
    margin: 74px auto 0;
    font-size: 36px; /*px*/
    color: #fff;
    line-height: 73px;
  }

  .qa {
    margin-top: 30px;
    & a {
      font-size: 30px;
      color: #fff;
    }
  }

  .code {
    @extend .ipt;
    width: 257px;
    vertical-align: middle;
  }

  .liRadius {
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
  }

  .getCode {
    width: 188px;
    background-color: #66cffa;
    text-align: center;
    vertical-align: middle;
    height: 75px;
    line-height: 75px;
    border-radius: 7px;
    font-size: 24px;
    color: #fff;
  }
</style>
