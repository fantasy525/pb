<template>
  <div class="wrap">
    <div class="content" ref="content">
      <header class="header flex align-center space-between" ref="header">
        <div class="h-l flex align-center justify-center">
          <span>{{curNum}}</span>/<span class="to-num">{{total}}</span>
        </div>
        <span class="test-title">中医证候测评</span>
        <span class="user"></span>
      </header>
      <div class="main-test" ref="mainTest">

        <div class="test-list" id="plist" ref="plist" @click="blur($event)">
          <transition-group name="fade" tag="div" class="pli" ref="pli">
            <div key="name" class="item">
              <p class="question">请输入年龄</p>
              <input type="text" maxlength="3" class="username" v-model="age" >
            </div>
            <div key="sex" class="item">
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
                  v-if="isArray(quesItem.name)"
                  v-for="(subRadio,radioIndex) in quesItem.answers"
                  :key="radioIndex"
                  @sl="sl"
                  :hasSub="false"
                  :runing="runing"
                  :id="Array.isArray(quesItem.name)"

                  :checked="test"
                  @change="set22"
                  :self-value="radioIndex+''">{{subRadio}}

                </radio>
                <radio
                  v-if="!isArray(quesItem.name)"
                  v-for="(subRadio,radioIndex) in quesItem.answers"
                  :key="radioIndex"
                  @sl="sl"
                  :hasSub="false"
                  :runing="runing"
                  :id="Array.isArray(quesItem.name)"
                  v-model="answers[quesItem.name]"
                  :self-value="radioIndex+''">{{subRadio}}

                </radio>
              </div>
              <mutil-question @sl="sl" v-else :sub-items="quesItem.subQues" :answers="answers">
              </mutil-question>
            </div>
            <div class="btn" v-if="canSubmit" ref="submit" key="smt">
              <button class="submit"  @click="submit" >提交</button>

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
  import {Css, Tween} from '@/common/utils'
  import {Syndrome} from '@/common/syndrome'
  import { mapActions } from 'vuex'

  export default {
    data() {
      return {
        questions: [

          {
            name: 'D01_MEMORYLOSS',
            quesTitle: '1.记忆减退',
            answers: ['无', '轻', '中', '重']
          }
        ],
        answers: {
          D01_MEMORYLOSS: '',
          D02_UNRESPONSIVE: '',
          D03_TEMPERAMENTCHANGE: '',
          S01_OSTEOPOROSIS: '',
          S02_DIZZINESSTINNITUS: '',
          S03_DIMINISHEDLIBIDO: '',
          S04_FREQUENTMICTURITION: '',
          S05_COLDLIMBS: '',
          S06_POORURINEADNLIGHTCOLOR: '',
          S07_EXHAUSTED: '',
          S08_EASYCOLD: '',
          S09_LIPS: '',
          S10_EYESTRAIN: '',
          S11_DIET: '',
          S12_DIARRHEA: '',
          S14_CONSTIPATION: '',
          S15_UNSHAPED: '',
          S13_COUGH: '',
          S16_EYEDRY: '',
          S17_HALITOSIS: '',
          S18_DIZZY: '',
          S19_ANGRY: '',
          S20_STING: '',
          S21_DRYTONGUE: '',
          S22_TONGUECOLOR: '',
          S23_DULLRED: '',
        },
        TCMSLEEP_SCORE: 0,
        TCMSLEEP_RESULT: 0,
        TCMSLEEP_PROPOSAL: 0,
        canNext: false,
        canSubmit: false,
        curNum: 1,
        total: 0,
        runing: false,
        test: '',
        sex:'',
        age:''
      }
    },
    created() {
      this.copyData = [

        {
          name: 'D02_UNRESPONSIVE',
          quesTitle: '2. 反应迟钝',
          answers: ['无', '轻', '中', '重']
        },
        {
          name: 'D03_TEMPERAMENTCHANGE',
          quesTitle: '3. 性情改变',
          answers: ['无', '轻', '中', '重']
        },
        {
          name: 'S01_OSTEOPOROSIS',
          quesTitle: '4.腰酸骨软或骨质疏松？',
          answers: ['没有', '有时', '常常', '严重']
        },
        {
          name: 'S03_DIMINISHEDLIBIDO',
          quesTitle: '5.腰膝酸软，性欲减退？',
          answers: ['没有', '有时', '常常', '严重']
        },
        {
          name: 'S02_DIZZINESSTINNITUS',
          quesTitle: '6.头晕耳鸣，耳鸣声音细小如同蝉鸣？',
          answers: ['没有', '有时', '常常', '严重']
        },

        {
          name: 'S04_FREQUENTMICTURITION',
          quesTitle: '7.夜尿频多，或小便失禁？',
          answers: ['没有', '有时', '常常', '严重']
        },
        {
          name: 'S06_POORURINEADNLIGHTCOLOR',
          quesTitle: '8.小便时间长且颜色清亮？',
          answers: ['没有', '有时', '常常', '严重']
        },
        {
          name: 'S05_COLDLIMBS',
          quesTitle: '9.常感到怕冷，手脚冰凉？',
          answers: ['没有', '有时', '常常', '严重']
        },

        {
          name: 'S07_EXHAUSTED',
          quesTitle: '10. 常感到疲乏无力，不愿多说话？',
          answers: ['没有', '有时', '常常', '严重']
        },
        {
          name: 'S08_EASYCOLD',
          quesTitle: '11.经常容易感冒而且爱出汗？',
          answers: ['没有', '有时', '常常', '严重']
        },
        {
          name: 'S09_LIPS',
          quesTitle: '12.口唇颜色淡、指甲苍白？',
          answers: ['没有', '有时', '常常', '严重']
        },
        {
          name: 'S10_EYESTRAIN',
          quesTitle: '13.眼睛看东西容易疲劳？',
          answers: ['没有', '有时', '常常', '严重']
        },
        {
          name: 'S16_EYEDRY',
          quesTitle: '14.常感到眼睛干涩？',
          answers: ['没有', '有时', '常常', '严重']
        },
        {
          name: 'S11_DIET',
          quesTitle: '15.常有胃口差，或腹胀的现象？',
          answers: ['没有', '有时', '常常', '严重']
        },
        {
          quesTitle: '16. 大便情况',
          subQues: [{
            name: 'S12_DIARRHEA',
            subQuesTitle: '容易腹泻，或大便不成形。',
            subAnswers: ['没有', '有时', '常常', '严重']
          },
            {
              name: 'S14_CONSTIPATION',
              subQuesTitle: '常常大便干燥或便秘，或大便不成形。',
              subAnswers: ['没有', '有时', '常常', '严重']
            },
            {
              name: 'S15_UNSHAPED',
              subQuesTitle: '常常大便干燥或便秘，大便成形。',
              subAnswers: ['没有', '有时', '常常', '严重']
            }
          ]

        },
        {
          name: 'S13_COUGH',
          quesTitle: '17.常常口中黏腻，甚至有痰？',
          answers: ['没有', '有时', '常常', '严重']
        },


        {
          name: 'S17_HALITOSIS',
          quesTitle: '18.有口臭或口苦的现象？',
          answers: ['没有', '有时', '常常', '严重']
        },
        {
          name: 'S19_ANGRY',
          quesTitle: '19.爱发脾气',
          answers: ['没有', '有时', '常常', '严重']
        },
        {
          name: 'S18_DIZZY',
          quesTitle: '20.生气后常感到头目胀痛或头晕目眩？',
          answers: ['没有', '有时', '常常', '严重']
        },

        {
          name: 'S20_STING',
          quesTitle: '21.身体常感到刺痛或闷痛，且部位固定？',
          answers: ['没有', '有时', '常常', '严重']
        },
        {
          name: ['S21_DRYTONGUE', 'S22_TONGUECOLOR', 'S23_DULLRED'],
          quesTitle: '22. 舌像情况，选择下列和您近似的舌像',
          answers: ['舌红干燥，舌苔少或无舌苔', '舌红干燥，舌苔少或无舌苔', '舌质暗红，或舌体有瘀点，或舌下静脉曲张', '以上情况都不是']
        }
//        { name: 'S22_TONGUECOLOR' },
//        {
//          name: 'S23_DULLRED',
//          quesTitle: '舌质暗红，或舌体有瘀点，或舌下静脉曲张',
//          answers: ['没有', '有时', '常常', '严重']
//        }
      ];
      this.c = 0;
      this.b = 0;
      this.d = 50;
      this.t = 0;
      this.stop = document.documentElement.scrollTop || document.body.scrollTop;
      this.total = this.copyData.length + this.questions.length;
      this.p = false;


    },
    mounted() {

      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.plist, {
          click: true,
          bounce:false,
          probeType: 3
        });
        this.scroll.on('scrollEnd', () => {
          console.log('滚动结束')
        })
        this.curPo = null;
        this.scroll.on('scroll', ({x, y}) => {
          console.log(y, this.curPo)
          if(y>=-100){
            this.$refs.header.style.transform = 'translate(0,0%)';
            return ;
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
      blur(e){
        console.log(e.target);
        this.$refs.age.blur();
        e.target.focus();
      },
      set22(val) {
        console.log(val);
        this.test = val;
        switch (val) {
          case '0':
            this.answers.S21_DRYTONGUE = '1';
            this.answers.S22_TONGUECOLOR = '0';
            this.answers.S23_DULLRED = '0';
            break;
          case '1':
            this.answers.S21_DRYTONGUE = '0';
            this.answers.S22_TONGUECOLOR = '1';
            this.answers.S23_DULLRED = '0';
            break;
          case '2':
            this.answers.S21_DRYTONGUE = '0';
            this.answers.S22_TONGUECOLOR = '0';
            this.answers.S23_DULLRED = '1';
            break;
          case '3':
            this.answers.S21_DRYTONGUE = '0';
            this.answers.S22_TONGUECOLOR = '0';
            this.answers.S23_DULLRED = '0';
            break;
          default:
            break;
        }
      },
      isArray(arr) {
        return Object.prototype.toString.apply(arr) === '[object Array]';
      },
      click(){
        alert('')
      },
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
              this.scrollNext(this.$refs.submit,true);
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
      scrollNext(el,y) {
        this.scroll.scrollToElement(el, 1000, 0,y)
      },
      submit(){
        let scores = Syndrome.getScores(this.answers).join().split(',');
        [this.answers.DS01_SUIJIAN,
          this.answers.DS02_SHENXU,
          this.answers.DS03_YANGXU,
          this.answers.DS04_QIXU,
          this.answers.DS05_XUEXU,
          this.answers.DS06_PIXU,
          this.answers.DS07_TANZHUO,
          this.answers.DS08_YINXU,
          this.answers.DS09_NEIRE,
          this.answers.DS10_YANGKANG,
          this.answers.DS11_XUEYU
        ] = [...scores];
        this.answers.SYNDROME_RESULT = Syndrome.nameOfZhengXing(scores)
        console.log(this.answers.SYNDROME_RESULT)
        this.endTime = parseInt(new Date().getTime() / 1000);
        this.answers.STARTDATE = this.startTime;
        this.answers.SUMMITDATE = this.endTime;
        let PATIENT_ID=window.localStorage.getItem('userid');
        this.answers.PATIENT_ID=PATIENT_ID;
        this.answers.AGE=this.age;
        this.answers.SEX=this.sex;
        this.$http.post('/phwechat/zhenghou.do', this.answers).then((res) => {
          if(res.result==='01'){
            this.SET_HISTORY({
              item:'h2',
              result:{
                name:this.answers.SYNDROME_RESULT.slice(0,this.answers.SYNDROME_RESULT.length-1),
                isTest:true,
                score:undefined,
              }
            });
            this.$router.push({
              name:'result',
              query:{
                SYNDROME_RESULT:this.answers.SYNDROME_RESULT,
                from:'syndrome',
                score:undefined
              }
            });
          }
        })
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
      console.log(to, from);
      if (this.fromPath === '/result'&&to.path!=='/home') {
        next('/home');
      }else{
        next()
      }
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
  .username::-webkit-input-placeholder{
   color:#999;
  font-size:24px;/*px*/
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
