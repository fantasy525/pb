<template>
  <div class="wrap">
    <div class="content" ref="content">
      <header class="header flex align-center space-between" ref="header">
        <div class="h-l flex align-center justify-center">
          <span>{{curNum}}</span>/<span class="to-num">{{total}}</span>
        </div>
        <span class="test-title">情绪状态测评</span>
        <span class="user"></span>
      </header>
      <div class="main-test" ref="mainTest">

        <div class="test-list" id="plist" ref="plist" @click="blur($event)">
          <transition-group name="fade" tag="div" class="pli" ref="pli" >
            <div key="name" class="item">
              <p class="question">请输入年龄</p>
              <input type="number"  ref="age" class="username" v-model="age" >
            </div>
            <div key="sex" class="item" >
              <p class="question">请选择性别</p>
              <radio
                key="man"
                @sl="sl"
                :hasSub="false"
                :runing="runing"
                v-model="sex"
                :self-value="'1'">男

              </radio>
              <radio
                key="woman"
                @sl="sl"
                :hasSub="false"
                :runing="runing"
                v-model="sex"
                :self-value="'0'">女

              </radio>
            </div>
            <div class="item" v-for="(quesItem,index) in questions " :key="index" :id="index" ref="index"
                 @click="next(index,$event)">
              <p class="question">{{quesItem.quesTitle}}</p>
              <div class=" answer-option  " v-if="!quesItem.subQues">
                <radio
                  v-for="(subRadio,radioIndex) in quesItem.answers"
                  :key="radioIndex"
                  @sl="sl"
                  :hasSub="false"
                  :runing="runing"
                  v-model="answers[quesItem.name]"
                  :self-value="radioIndex+''">{{subRadio}}
                </radio>
              </div>
              <mutil-question @sl="sl" v-else :sub-items="quesItem.subQues" :answers="answers">
              </mutil-question>
            </div>
            <div class="btn" v-if="canSubmit" ref="submit" key="smt">
              <button class="submit" @click="submit">提交</button>

            </div>
          </transition-group>

        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import Radio from '@/components/radio'
  import MutilQuestion from '@/components/MutilQuestion'
  import {Css} from '@/common/utils'
  import { mapActions } from 'vuex'

  export default {
    data() {
      return {
        questions: [
          {
            name: 'NO01_ENERGY',
            quesTitle: '1.感到自己的精力下降，活动减慢？',
            answers: ['没有', '较轻', '中等', '较重', '严重']
          }
        ],
        answers: {
          NO01_ENERGY: '',
          NO02_WEEP: '',
          NO03_HURT: '',
          NO04_REPROACH: '',
          NO05_LONELY: '',
          NO06_DEPRESSED: '',
          NO07_WORRY: '',
          NO08_UNINTERESTED: '',
          NO09_FUTURE: '',
          NO10_DIFFICULTY: '',
          NO11_VALUE: '',
          NO12_OPPOSITESEX: '',
          NO13_LIFE: ''
        },
        TCMSLEEP_SCORE: 0,
        TCMSLEEP_RESULT: 0,
        TCMSLEEP_PROPOSAL: 0,
        canNext: false,
        canSubmit: false,
        curNum: 1,
        total: 0,
        runing: false,
        emotionDeep: 0,
        sex:'',
        age:''

      }
    },
    created() {
      this.copyData = [


        {
          name: 'NO02_WEEP',
          quesTitle: '2.经常想哭？',
          answers: ['没有', '偶尔', '有时', '常常', '总是']
        },
        {
          name: 'NO03_HURT',
          quesTitle: '3.常感到受骗上当或有人想伤害您？',
          answers: ['没有', '偶尔', '有时', '常常', '总是']
        },
        {
          name: 'NO04_REPROACH',
          quesTitle: '4.经常责怪自己？',
          answers: ['没有', '偶尔', '有时', '常常', '总是']
        },
        {
          name: 'NO05_LONELY',
          quesTitle: '5.感到孤独？',
          answers: ['没有', '偶尔', '有时', '常常', '总是']
        },
        {
          name: 'NO06_DEPRESSED',
          quesTitle: '6.感到苦闷？',
          answers: ['没有', '偶尔', '有时', '常常', '总是']
        },
        {
          name: 'NO07_WORRY',
          quesTitle: '7.过分担忧？',
          answers: ['没有', '较轻', '中等', '较重', '严重']
        },
        {
          name: 'NO08_UNINTERESTED',
          quesTitle: '8.对事物不感兴趣？',
          answers: ['没有', '较轻', '中等', '较重', '严重']
        },
        {
          name: 'NO09_FUTURE',
          quesTitle: '9.感到没有前途没有希望？',
          answers: ['没有', '偶尔', '有时', '常常', '总是']
        },
        {
          name: 'NO10_DIFFICULTY',
          quesTitle: '10.感到任何事情都很困难？',
          answers: ['没有', '较轻', '中等', '较重', '严重']
        },
        {
          name: 'NO11_VALUE',
          quesTitle: '11.感到自己没有什么价值？',
          answers: ['没有', '偶尔', '有时', '常常', '总是']
        },
        {
          name: 'NO12_OPPOSITESEX',
          quesTitle: '12.对异性的兴趣减退？',
          answers: ['没有', '较轻', '中等', '较重', '严重']
        },
        {
          name: 'NO13_LIFE',
          quesTitle: '13.想结束自己的生命？',
          answers: ['没有', '偶尔', '有时', '常常', '总是']
        }
      ];
      this.total = this.copyData.length + this.questions.length;
    },
    mounted() {

      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.plist, {
          click: true,
          bounce: false,
          probeType: 3
        });
        this.scroll.on('scrollEnd', () => {
          console.log('滚动结束')
        })
        this.curPo = null;
        this.scroll.on('scroll', ({x, y}) => {
          console.log(y, this.curPo)
          if (y >= -100) {
            this.$refs.header.style.transform = 'translate(0,0%)';
            return;
          }
          if (y > this.curPo) {
            this.$refs.header.style.transform = 'translate(0,-100%)';
            console.log('上面')
          } else {
            this.$refs.header.style.transform = 'translate(0,0%)';
            console.log('下面')
          }
          this.curPo = y;

        })
      })
      let t = 0;
      this.startTime = parseInt(new Date().getTime() / 1000);
    },
    components: {
      'radio': Radio,
      'mutil-question': MutilQuestion
    },
    methods: {
      next(index, e) {
        if (this.canNext) {
          this.canNext = false;
          if (!this.questions[index + 1] && this.copyData[index]) {
            this.questions.push(this.copyData[index]);
            if (this.curNum < this.total) {
              this.curNum++;
            }
          }

          if (index === this.total - 1) {
            this.canSubmit = true;
            setTimeout(() => {
              this.scroll.refresh();
              this.scrollNext(this.$refs.submit, true);
            }, 20)
          }
          else {
            setTimeout(() => {
              this.scroll.refresh();
              this.scrollNext(this.$refs.index[index + 1]);
            }, 20)
          }

        }
      },
      sl(hasSub) {
        console.log('下一个')
        this.canNext = true;
      },
      bianZhengSleep() {
        var endResult = [];
        endResult[0] = this.answers.NO01_ENERGY;
        endResult[1] = this.answers.NO02_WEEP;
        endResult[2] = this.answers.NO03_HURT;
        endResult[3] = this.answers.NO04_REPROACH;
        endResult[4] = this.answers.NO05_LONELY;
        endResult[5] = this.answers.NO06_DEPRESSED;
        endResult[6] = this.answers.NO07_WORRY;
        endResult[7] = this.answers.NO08_UNINTERESTED;
        endResult[8] = this.answers.NO09_FUTURE;
        endResult[9] = this.answers.NO10_DIFFICULTY;
        endResult[10] = this.answers.NO11_VALUE;
        endResult[11] = this.answers.NO12_OPPOSITESEX;
        endResult[12] = this.answers.NO13_LIFE;
        var paperScore = 0;
        var endScore = 0;
        for (var i = 0; i < endResult.length; i++) {
          if (endResult[i] == "1") {
            endScore = 1;
          } else if (endResult[i] == "2") {
            endScore = 2;
          } else if (endResult[i] == "3") {
            endScore = 3;
          } else if (endResult[i] == "4") {
            endScore = 4;
          } else if (endResult[i] == "0") {
            endScore = 0;
          }
          paperScore += endScore;
        }
        ;
        var depressedScore = paperScore / 13;
        var EMOTION_RESULT;
        if (depressedScore >= 3.9) {
          this.emotionDeep = 4;
          EMOTION_RESULT = "该患者为重度抑郁!";
        } else if (depressedScore >= 3) {
          this.emotionDeep = 3;
          EMOTION_RESULT = "该患者为中度抑郁!";
        } else if (depressedScore >= 2) {
          this.emotionDeep = 1;
          EMOTION_RESULT = "该患者为轻度抑郁!";
        } else {
          this.emotionDeep = 0;
          EMOTION_RESULT = "该患者心态很好，并没有得抑郁症!";
        }
        var EMOTION_SCORE = paperScore;
//        $("#TCMSLEEP_SCORE").val(totalSocreSleep);
//        $("#TCMSLEEP_RESULT").val(resultMsg);
//        $("#TCMSLEEP_PROPOSAL").val(adviceMsg);
        return [EMOTION_RESULT, EMOTION_SCORE]
        // alert(resultShow[0] + "&&&&&&&shshhshhshs" + resultShow[1]);
      },
      scrollNext(el, y) {
        this.scroll.scrollToElement(el, 1000, 0, y)
      },
      submit() {
        this.endTime = parseInt(new Date().getTime() / 1000);
        let [EMOTION_RESULT, EMOTION_SCORE] = this.bianZhengSleep();
        console.log(EMOTION_RESULT);
        this.answers.EMOTION_RESULT = EMOTION_RESULT + "";
        this.answers.EMOTION_SCORE = EMOTION_SCORE + "";
        this.answers.STARTDATE = this.startTime;
        this.answers.SUMMITDATE = this.endTime;
        let PATIENT_ID = window.localStorage.getItem('userid');
        this.answers.PATIENT_ID = PATIENT_ID;
        this.answers.AGE=this.age;
        this.answers.SEX=this.sex;
        this.$http.post('/phwechat/qingxu.do', this.answers).then((res) => {
          if (res.result === '01') {
            let deep='';
            switch (this.emotionDeep) {
              case 0:
                deep = '心态不错';

                break;
              case 1:
                deep = '轻度抑郁';

                break;
              case 2:
                deep = '中度抑郁';

                break;
              case 3:

                deep = '重度抑郁';

                break;
              default:
                break;

            }
            this.SET_HISTORY({
              item:'h8',
              result:{
                name:deep,
                isTest:true,
                score:this.emotionDeep,
              }
            })
            this.$router.push({
              name: 'result',
              query: {from: 'emotion', score: this.emotionDeep}
            });
          }
        })
      },
      blur(e){
        console.log(e.target);
        this.$refs.age.blur();
        e.target.focus();
      },
      ...mapActions(['SET_HISTORY'])
    },
    beforeRouteEnter(to, from, next) {
      console.log('进入路由', to.fullPath, from.fullPath)
      next(vm => {
        vm.fromPath = from.path;
      });
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当守卫执行前，组件实例还没被创建
    },
    beforeRouteLeave(to, from, next) {
//      console.log(to, from);
//      if (this.fromPath === '/result'&&to.path!=='/reuslt') {
//        console.log('拉拉阿拉啦')
//      next('/home')
//      }else{
//        next()
//      }
      next();
    }
  }

</script>

<style lang="scss" scoped>
  .wrap {
    position: relative;
  }

  .user {
    font-size: 18px; /*px*/
    margin-right: 67px;
  }
  .username{
    width:100%;
    height:85px;
    font-size:30px;/*px*/
    text-align:center;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .1s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */
  {
    opacity: 0
  }

  .content {

    width: 100%;
    margin: 0 auto;
  }

  $headerHeight: 145px;
  .header {
    position: relative;
    z-index: 2;
    background-color: #18b7f1;
    color: #fff;
    font-size: 30px; /*px*/
    height: $headerHeight;
    margin-bottom: 42px;
    transition: transform .5s;
  }

  .h-l {
    width: 100px;
    height: 100px;
    background-color: #fff;
    border-radius: 100px;
    font-size: 35px; /*px*/
    color: #18b7f1;
    margin-left: 57px;
  }

  .test-title {
    width: 200px;
    color: #fff;
    font-size: 30px;
    margin-right: 70px;

  }

  .item .flex .my-radio:first-child {
    margin-top: 0;
  }

  .question {
    font-size: 36px; /*px*/
    color: #18b7f1;
    margin-bottom: 24px;

  }

  .test-list {
    width: 697px;
    margin: 0 auto;
    position: relative;

    & .pli {

    }
    & .item {
      background-color: #e7f8fe;
      margin-top: 5px;
      border-radius: 5px;
      padding: 55px 45px;

    }
    & .item:first-child {
      margin-top: 0;
    }
  }

  .answer-option {

  }

  .submit {
    width: 500px;
    height: 57px;
    line-height: 34px;
    font-size: 36px; /*px*/
    color: #fff;
    background-color: #18b7f1;
    border-radius: 5px;
    -webkit-appearance: none;
  }

  .btn {
    margin-top: 40px;
    text-align: center;
    padding-bottom: 100px;
  }

  #plist {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: $headerHeight;
  }
</style>
