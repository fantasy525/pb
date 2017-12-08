<template>
    <div class="wrap">
      <div class="content">
        <header class="header">
          <img :src="$STATIC+'static/home/banner_02.png'" >
        </header>
       <div class="center">
         <div class="block bl1">
          <div class="top">
            <img :src="$STATIC+'static/home/logo.png'" alt="">
            <p class="title">为你推荐</p>
            <p class="ti-p">根据您身体情况，为您推荐测评</p>
          </div>
           <ul class="recommed">
             <li class="flex ">
              <div>
                <img :src="$STATIC+'static/home/img1.png'" class="re-img">
              </div>
               <div class="re-right">
                 <p class="re-title">记忆能力</p>
                 <p class="re-desc">根据您身体情况，为您推荐测评，根
                   据您身体情况，为您推荐测评</p>
               </div>
               <div class="flex align-center side-a">
                 <span> &gt;</span>
               </div>
             </li>
             <li class="flex ">
              <div> <img :src="$STATIC+'static/home/img2.png'" class="re-img"></div>
               <div class="re-right">
                 <p class="re-title">症候辨识</p>
                 <p class="re-desc">根据您身体情况，为您推荐测评，根
                   据您身体情况，为您推荐测评</p>
               </div>
              <div class="flex align-center side-a">
                <span> &gt;</span>
              </div>
             </li>
           </ul>
         </div>
         <div class="block bl2">
           <div class="top">
              公卫测评
           </div>
           <ul class="flex pblist space-between ">
             <li>
               <div class="icon flex align-center justify-center">
                 <img :src="$STATIC+'static/home/pb1.png'">
               </div>
               <p class="icon-t">记忆能力测评</p>
             </li>
             <li >
               <div class="icon flex align-center justify-center"
                    @click="go(2,testHistory.h2)"
                    :style="{backgroundColor:testHistory.h2.isTest?'#aec1c9':''}"
               >
                 <img :src="$STATIC+'static/home/pb2.png'" v-if="!testHistory.h2.isTest">
                 <span v-else>{{testHistory.h2.name.split(/(,|，)/)[0]}}</span>
               </div>
               <p class="icon-t">证候体征测评</p>
             </li>
             <li>
               <div class="icon flex align-center justify-center">
                 <img :src="$STATIC+'static/home/pb3.png'">
               </div>
               <p class="icon-t">反应速度测评</p>
             </li>
             <li>
               <div class="icon flex align-center justify-center">
                 <img :src="$STATIC+'static/home/pb4.png'">
               </div>
               <p class="icon-t">执行能力测评</p>
             </li>
             <li>
               <div class="icon flex align-center justify-center">
                 <img :src="$STATIC+'static/home/pb5.png'">
               </div>
               <p class="icon-t">决策能力测评</p>
             </li>
             <li >
               <div class="icon flex align-center justify-center"
                    @click="go(6,testHistory.h6)"
                    :style="{backgroundColor:testHistory.h6.isTest?'#aec1c9':''}"
               >
                 <img :src="$STATIC+'static/home/pb6.png'" v-if="!testHistory.h6.isTest">
                 <span v-else>{{testHistory.h6.name}}</span>
               </div>
               <p class="icon-t">睡眠状况测评</p>
             </li>
             <li>
               <div class="icon flex align-center justify-center">
                 <img :src="$STATIC+'static/home/pb8.png'">
               </div>
               <p class="icon-t">工作记忆测评</p>
             </li>
             <li >
               <div class="icon flex align-center justify-center"
                    @click="go(8,testHistory.h8)"
                    :style="{backgroundColor:testHistory.h8.isTest?'#aec1c9':''}"
               >
                 <img :src="$STATIC+'static/home/pb8.png'" v-if="!testHistory.h8.isTest">
                 <span v-else>{{testHistory.h8.name}}</span>
               </div>
               <p class="icon-t">情绪状态测评</p>
             </li>

             <li>
               <div class="icon flex align-center justify-center">
                 <img :src="$STATIC+'static/home/pb8.png'">
               </div>
               <p class="icon-t">视空间能力测评</p>
             </li>

           </ul>
         </div>
         <div class="block bl3">
           <div class="top">
             更多
           </div>
           <div class="more flex justify-center align-center">
            <div style="text-align:center">
              <img :src="$STATIC+'static/home/qidai.png'" alt="">
              <p class="qidai">敬请期待</p>
            </div>
           </div>
         </div>
       </div>
      </div>
      <div class="bt-test block">
        <h2 class="title">
          测评记录
        </h2>
        <ul class="res-list">
          <li class="flex space-between align-center"
              v-for="(value,index) in testRecords"
          >
            <div><img :src="value.img" alt=""></div>
            <div>
              <p class="res-title">{{value.name}}</p>
              <!--<p class="res-time"><i class="icon-time"></i>2017.11.28</p>-->
            </div>
            <div class="result">
              {{value.result}}
            </div>
          </li>
          <!--<li class="flex space-between align-center">-->
            <!--<div><img src="static/home/icon1.png" alt=""></div>-->
            <!--<div>-->
              <!--<p class="res-title">记忆能力</p>-->
              <!--<p class="res-time"><i class="icon-time"></i>2017.11.28</p>-->
            <!--</div>-->
            <!--<div class="result">-->
              <!--无风险-->
            <!--</div>-->
          <!--</li>-->
          <!--<li class="flex space-between align-center">-->
            <!--<div><img src="static/home/icon1.png" alt=""></div>-->
            <!--<div>-->
              <!--<p class="res-title">记忆能力</p>-->
              <!--<p class="res-time"><i class="icon-time"></i>2017.11.28</p>-->
            <!--</div>-->
            <!--<div class="result">-->
              <!--无风险-->
            <!--</div>-->
          <!--</li>-->
        </ul>
      </div>
      <footer class="footer" @click="showAdvance">
         意见反馈
      </footer>
      <my-dialog v-if="showAd"
      :type="diaType"
      @ensure="submitAdvance"
                 @cancel="submitAdvance"
      ></my-dialog>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Dialog from '@/components/dialog'
    export default {
      name:'home',
      data(){
        return{
        showAd:false,
        diaType:'textarea'

        }
      },
      created(){
        console.log(this.$STATIC)
      },
      methods:{
        go(id,history){
         console.log(id);
         switch(id){
           case 8:

           console.log(history)
             if(history.isTest){
               this.$router.push({path:'/result',query:{from:'emotion',score:history.score}});
             }else{
               this.$router.push('/emotion');
             }
             break;
           case 6:
             if(history.isTest){
               this.$router.push({path:'/result',query:{from:'tcmsleep',score:history.score}});
             }else{
               this.$router.push('/tcmsleep');
             }

             break;
           case 0:
             this.$router.push('/memory');
             break;
           case 2:
             if(history.isTest){
               this.$router.push({path:'/result',query:{from:'syndrome', SYNDROME_RESULT:history.name+'；'}});
             }else{
               this.$router.push('/syndrome');
             }

             break;
           default:break;
         }
        },
        submitAdvance(){
          this.showAd=false;
        },
        showAdvance(){
          this.showAd=true;
        }
      },
      computed:{
        ...mapState(['testHistory']),
        testRecords(){
          let names=[
            '记忆能力测评',
            '症候体征测评',
            '反应速度测评',
            '执行能力测评',
            '决策能力测评',
            '睡眠状况测评',
            '工作记忆测评',
            '情绪状态测评',
            '视空间能力测评',
          ];
          let arr=[];
          for(let i=1;i<=9;i++){

            let hasTest=this.testHistory[`h${i}`];
            if(hasTest.isTest){

              arr.push({
                img:this.$STATIC+'static/home/icon1.png',
                name:names[i-1],
                result:hasTest.name
              })
            }

          }
          return arr;
        }
      },
      components:{
        'my-dialog':Dialog
      }
    }
</script>

<style lang="scss" scoped>
  @import "../common/scss/mixin.scss";

  .radius20{
    border-radius:20px;
  }
  .bl-top{
    width:692px;
    height:164px;
    font-size:40px;/*px*/
    color:#2ec3e7;
    text-align:center;
    line-height:200px;
  }
  .wrap{

  background-color:#edebeb;

}
.header img{
  width:100%;
}
.block{
  margin-top:64px;
}
  .center{
    padding:0 30px;
  }
  .bl1{
    background-color:#fff;
    position:relative;
    margin-top:-121px;
   padding-bottom:110px;
   @extend .radius20;

    & .top{
      width:586px;
      margin:0 auto;
      border-bottom:2px solid #ceced4;
      text-align:center;
      padding-bottom:64px;
      & img{

        transform:translate(0%,-50%)
      }
      & .title{
        font-size:30px;/*px*/
        color:#444;
      }
      & .ti-p{
        font-size:24px;/*px*/
        color:#999;
        margin-top:14px;
      }
    }
  }
  .recommed{
    width:568px;
    margin:0 auto;
    padding-top:75px;
    & >li{
      height:100%;
        /*align-items:start;*/
      margin-top:48px;
      & .side-a{

        font-size:48px;/*px*/
        color:#00bbff;
      }
    }
    & >li:first-child{
      margin-top:0;
    }
    & .re-img{
      margin-right:27px;
    }
    & .re-title{
      font-size:30px;/*px*/
      color:#444;
      margin-bottom:6px;
    }
    & .re-desc{
      font-size:24px;/*px*/
      color:#999;
      line-height:44px;
    }

  }
  .re-right{
    width:380px;
    margin-right:48px;
  }
  .bl2{
    background-color:#fff;
    @extend .radius20;
    & .top{
     @extend .bl-top;
      @include bk('home/img3_03.png',100)
    }
    & .pblist{
      width:605px;
      padding-top:10px;
      padding-bottom:100px;
      margin:0 auto;
      flex-wrap:wrap;
    }
  }
  .pblist li{
    text-align:center;
    margin-top:48px;
  }
  .pblist .icon{
    width:160px;
    height:160px;
    background-color:#4bc6ff;
    border-radius:160px;
    & span{
      color:#fff;
    }
  }
  .icon-t{
    font-size:26px;/*px*/
    color:#666;
    margin-top:31px;
  }
  .bl3{

    & .top{
      @extend .bl-top;
      @include bk('home/img4_03.png',100);
    }
  }
  .more{
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
    height:574px;
   background-color:#fff;
    & .qidai{
      font-size:40px;
      color:#efefef;
      margin-top:25px;
    }
  }
  .bt-test{
    padding-top:48px;
    background-color:#fff;
    & .title{
      font-size:30px;/*px*/
      color:#666;
      text-align:center;
    }
  }
  .res-list{
    width:670px;
    padding-left:30px;
    padding-bottom:30px;

    & li{
      padding-left:20px;
      padding-top:40px;
      padding-bottom:40px;
      border-bottom:2px solid #ceced3;
    }
    & li:last-child{
      border-bottom:none;
    }
  }
  .res-title{
    font-size:26px;/*px*/
    color:#666;
  }
  .res-time{
    font-size:24px;/*px*/
    color:#666;
    vertical-align: middle;
    margin-top:22px;
    & .icon-time{
      vertical-align: middle;
      display:inline-block;
      width:27px;
      height:27px;
      margin-right:8px;
      @include bk('home/clock.png',100);
    }
  }
  .result{
    width:180px;
    font-size:26px;
    color:#666;
    text-align:left;
  }
  .footer{
    background-color:#00baff;
    font-size:30px;
    color:#fff;
    height:100px;
    line-height:100px;
    text-align:center;
    margin-top:56px;
  }
</style>
