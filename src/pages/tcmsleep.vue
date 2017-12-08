<template>
  <div class="wrap">
    <div class="content" ref="content">
      <header class="header flex align-center space-between" ref="header">
        <div class="h-l flex align-center justify-center">
          <span>{{curNum}}</span>/<span class="to-num">{{total}}</span>
        </div>
        <span class="test-title">睡眠情况测评</span>
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
  import { mapActions } from 'vuex'

  export default {
    data() {
      return {
        questions: [
          {
            name: 'NO01_SLEEPINGTIME',
            quesTitle: '1.您的睡眠时间足够么',
            answers: ['是', '否']
          }
        ],
        answers: {
          NO01_SLEEPINGTIME: '',
          NO02_ENOUGHREST: '',
          NO03_SLEEPHOUR: '',
          NO04_CANNOTSLEEP: '',
          NO05_EASILYAWAKENED: '',
          NO06_FALLASLEEP: '',
          NO07_WAKESLEEP: '',
          NO08_EARLYAWAKENING: '',
          NO09_WAKINGTIME: '',
          NO10_DISCOMFORT: '',
          NO11_DIZZY: '',
          NO12_DULLEYEPAIN: '',
          NO13_FLUSTERED: '',
          NO14_PIBPAIN: '',
          NO15_STILLFATIGUE: '',
          NO16_EASYANGRY: '',
          NO17_LOWSPIRITS: '',
          NO18_THINKWORRY: '',
          NO19_MISSTHISANDTHAT: '',
          NO20_AFFECTAPPETITE: ''

        },
        TCMSLEEP_SCORE: 0,
        TCMSLEEP_RESULT: 0,
        TCMSLEEP_PROPOSAL: 0,
        canNext: false,
        canSubmit: false,
        curNum: 1,
        total: 0,
        runing: false,
        sex:'',
        age:''
      }
    },
    created() {
      this.copyData = [
        {
          name: 'NO02_ENOUGHREST',
          quesTitle: '2. 醒来后是否感到充分休息了？',
          answers: ['是', '否']
        },
        {
          name: 'NO03_SLEEPHOUR',
          quesTitle: '3. 整晚不能睡觉？',
          answers: ['无', '有时', '常常', '严重']
        },
        {
          name: 'NO04_CANNOTSLEEP',
          quesTitle: '4. 晚上入睡困难？',
          answers: ['无', '有时', '常常', '严重']
        },
        {
          name: 'NO05_EASILYAWAKENED',
          quesTitle: '5. 睡觉时容易惊醒？',
          answers: ['无', '有时', '常常', '严重']
        },
        {
          quesTitle: '6. 睡眠情况',
          subQues: [
            {
              name: 'NO06_FALLASLEEP',
              subQuesTitle: '睡觉时多梦，且困在梦中醒不来？',
              subAnswers: ['没有', '有时', '常常', '严重', '严重']
            },
            {
              name: 'NO07_WAKESLEEP',
              subQuesTitle: '睡觉时多梦易醒，醒后难以入睡？',
              subAnswers: ['没有', '有时', '常常', '严重']
            }
          ]

        },
        {
          name: 'NO08_EARLYAWAKENING',
          quesTitle: '7.睡醒很早，醒后不能再次入睡',
          answers: ['无', '有时', '常常', '严重']
        },
        {
          name: 'NO09_WAKINGTIME',
          quesTitle: '8. 嗜睡（白天睡意过多）？',
          answers: ['无', '有时', '常常', '严重']
        },
        {
          name: 'NO10_DISCOMFORT',
          quesTitle: '9. 以上出现的症状持续了多久？',
          answers: ['3天', '一个月', '3个月及以上']
        },
        {
          name: 'NO11_DIZZY',
          quesTitle: '10. 醒来后是否感到头晕？',
          answers: ['无', '有时', '常常', '严重']
        },
        {
          name: 'NO12_DULLEYEPAIN',
          quesTitle: '11. 醒来后是否感到眼睛涩痛？',
          answers: ['无', '有时', '常常', '严重']
        },
        {
          name: 'NO13_FLUSTERED',
          quesTitle: '12. 醒来后是否感到心慌，胸闷？',
          answers: ['无', '有时', '常常', '严重']
        },
        {
          name: 'NO14_PIBPAIN',
          quesTitle: '13. 醒来后是否感到胁肋部位疼痛？',
          answers: ['无', '有时', '常常', '严重']
        },
        {
          name: 'NO15_STILLFATIGUE',
          quesTitle: '14. 是否感到睡后不解疲乏，腰膝酸软？',
          answers: ['无', '有时', '常常', '严重']
        },
        {
          name: 'NO16_EASYANGRY',
          quesTitle: '15. 是否心烦、急躁、容易生气？',
          answers: ['无', '有时', '常常', '严重']
        },
        {
          name: 'NO17_LOWSPIRITS',
          quesTitle: '16. 是否会有心情低落？',
          answers: ['无', '有时', '常常', '严重']
        },
        {
          name: 'NO18_THINKWORRY',
          quesTitle: '17. 是否会多思多虑（对事情思考较多）？',
          answers: ['无', '有时', '常常', '严重']
        },
        {
          name: 'NO19_MISSTHISANDTHAT',
          quesTitle: '18. 是否容易忘记事情或丢三落四？',
          answers: ['无', '有时', '常常', '严重']
        },
        {
          name: 'NO20_AFFECTAPPETITE',
          quesTitle: '19. 是否影响食欲？',
          answers: ['无', '有时', '常常', '严重']
        },
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
      bianZhengSleep() {
        function sortIndex(list) {
          var x = new Array();
          var tmpList = list;
          tmpList.sort();
          var j = 0;
          for (var i = 0; i < list.length; i++) {
            for (var j = 0; j < tmpList.length; j++) {
              if (list[i] == tmpList[j]) {
                x[i] = j;
                tmpList[j] = 1000; // 给一个绝对不可能出现的值
                break;
              }
            }
          }
          return x;
        }

        // start by sangf
        var bianbing1 = parseInt(this.answers.NO01_SLEEPINGTIME);
        var bianbing2 = parseInt(this.answers.NO02_ENOUGHREST);
        var bianbing3 = parseInt(this.answers.NO03_SLEEPHOUR);
        var bianbing4 = parseInt(this.answers.NO04_CANNOTSLEEP);
        var bianbing5 = parseInt(this.answers.NO05_EASILYAWAKENED);
        var bianbing6 = parseInt(this.answers.NO06_FALLASLEEP);
        var bianbing7 = parseInt(this.answers.NO07_WAKESLEEP);
        var bianbing8 = parseInt(this.answers.NO08_EARLYAWAKENING);
        var bianbing9 = parseInt(this.answers.NO09_WAKINGTIME);
        var bianbing10 = parseInt(this.answers.NO10_DISCOMFORT)
        var bianbing11 = parseInt(this.answers.NO11_DIZZY)
        var bianbing12 = parseInt(this.answers.NO12_DULLEYEPAIN)
        var bianbing13 = parseInt(this.answers.NO13_FLUSTERED)
        var bianbing14 = parseInt(this.answers.NO14_PIBPAIN)
        var bianbing15 = parseInt(this.answers.NO15_STILLFATIGUE)
        var bianbing16 = parseInt(this.answers.NO16_EASYANGRY)
        var bianbing17 = parseInt(this.answers.NO17_LOWSPIRITS)
        var bianbing18 = parseInt(this.answers.NO18_THINKWORRY)
        var bianbing19 = parseInt(this.answers.NO19_MISSTHISANDTHAT)
        var bianbing20 = parseInt(this.answers.NO20_AFFECTAPPETITE)

        var aScores = new Array();
        aScores[0] = bianbing1 * 1;
        aScores[1] = bianbing2 * 1;
        aScores[2] = bianbing3 * 2;
        aScores[3] = bianbing4 * 1;
        aScores[4] = bianbing5 * 1;
        aScores[5] = bianbing6 * 1;
        aScores[6] = bianbing7 * 1;
        aScores[7] = bianbing8 * 1;
        aScores[8] = bianbing9 * 1;

        var totalAScore = 0;    // A1-A9的总分
        var totalAScore = 0;    // A1-A9的总分
        for (var i = 0; i < aScores.length; i++) {
          totalAScore += aScores[i];
        }
        // A10的值
        aScores[9] = bianbing10 + 1;
        // 睡眠总得分
        var totalSocreSleep = aScores[9] * totalAScore;
        var resultShow = new Array();   // 显示的结果

        if (totalSocreSleep >= 2 && totalSocreSleep <= 12) {
          resultShow[0] = "轻度";
        } else if (totalSocreSleep >= 13 && totalSocreSleep <= 36) {
          resultShow[0] = "中度";
        } else {
          resultShow[0] = "重度";
        }

        var bScores = new Array();
        bScores[0] = bianbing11;
        bScores[1] = bianbing12;
        bScores[2] = bianbing13;
        bScores[3] = bianbing14;
        bScores[4] = bianbing15;
        bScores[5] = bianbing16;
        bScores[6] = bianbing17;
        bScores[7] = bianbing18;
        bScores[8] = bianbing19;
        bScores[9] = bianbing20;
        // 以下为复合分
        bScores[10] = bianbing15 + bianbing13;
        bScores[11] = bianbing15 + bianbing17;
        bScores[12] = bianbing15 + bianbing19;
        bScores[13] = bianbing18 + bianbing13;
        bScores[14] = bianbing18 + bianbing17;
        bScores[15] = bianbing18 + bianbing19;
        bScores[16] = bianbing20 + bianbing13;
        bScores[17] = bianbing20 + bianbing17;
        bScores[18] = bianbing20 + bianbing19;

        var bNames = new Array();
        bNames[0] = "痰热内扰证";
        bNames[1] = "肝火扰心证";
        bNames[2] = "心血虚证";
        bNames[3] = "肝火扰心证";
        bNames[4] = "心肾不交证";
        bNames[5] = "肝火扰心证";
        bNames[6] = "心血虚证";
        bNames[7] = "心脾两虚证";
        bNames[8] = "心血虚证";
        bNames[9] = "心脾两虚证";
        bNames[10] = "心肾不交证";
        bNames[11] = "心肾不交证";
        bNames[12] = "心肾不交证";
        bNames[13] = "心脾两虚证";
        bNames[14] = "心脾两虚证";
        bNames[15] = "心脾两虚证";
        bNames[16] = "心脾两虚证";
        bNames[17] = "心脾两虚证";
        bNames[18] = "心脾两虚证";

        var indexOfBScores = sortIndex(bScores);
        indexOfBScores.sort();

        var maxScore = bScores[indexOfBScores[18]];
        for (var i = 0; i >= bScores.length; i++) {
          if (maxScore == bScores[i] && bNames[i] == "心脾两虚证") {
            resultShow[1] = bNames[i];
            break;
          } else if (maxScore == bScores[i] && bNames[i] == "心肾不交证") {
            resultShow[1] = bNames[i];
            break;
          }
        }

        if (resultShow[1] != "心脾两虚证" || resultShow[1] != "心肾不交证") {
          resultShow[1] = bNames[indexOfBScores[18]];
        }

        var resultMsg = "您属于" + resultShow[0] + "睡眠障碍，中医辩证为不寐，" + resultShow[1] + "。";
        var adviceMsg = "";
        if (resultShow[1] == "痰热内扰证") {
          if (resultShow[0] == "轻度") {
            adviceMsg = "禁食肥甘厚腻，睡前数小时（一般下午4点以后）避免使用兴奋性物质（咖啡、浓茶或吸烟等）；睡前不要饮酒，酒精可干扰睡眠；规律的体育锻炼，但睡前应避免剧烈运动；睡前不要大吃大喝或进食不易消化的食物；睡前至少1小时内不做容易引起兴奋的脑力劳动或观看容易引起兴奋的书籍和影视节目；卧室环境应安静、舒适，光线及温度适宜；保持规律的作息时间。";
          } else if (resultShow[0] == "中度") {
            adviceMsg = "在调整作息和饮食的基础上可选用陈皮、淡竹叶泡水饮用；酸枣仁(炒)15g，甘草3g，知母、茯苓、川芎各6g，水煎，分3次温服。可按摩或针刺尺泽、丰隆等穴位。";
          } else {
            adviceMsg = "黄连温胆汤：黄连5g、竹茹10g、半夏10g、陈皮10g、茯苓15g、枳实10g。建议去正规医院就诊进行治疗。";
          }
        } else if (resultShow[1] == "肝火扰心证") {
          if (resultShow[0] == "轻度") {
            adviceMsg = "积极进行心理情志调整，保持乐观向上的态度，使心情愉快，睡前数小时（一般下午4点以后）避免使用兴奋性物质（咖啡、浓茶或吸烟等）；睡前不要饮酒，酒精可干扰睡眠；规律的体育锻炼，但睡前应避免剧烈运动；睡前不要大吃大喝或进食不易消化的食物；睡前至少1小时内不做容易引起兴奋的脑力劳动或观看容易引起兴奋的书籍和影视节目；卧室环境应安静、舒适，光线及温度适宜；保持规律的作息时间。";
          } else if (resultShow[0] == "中度") {
            adviceMsg = "在调整作息和饮食的基础上可取竹笋50~100g，夏枯草20g，槐花15g，煎水服食；酸枣仁(炒)15g，甘草3g，知母、茯苓、川芎各6g，水煎，分3次温服；或用新鲜竹笋适量，捣碎后取汁饮服，每日1次。可按摩或针刺肝俞、太冲等穴位。";
          } else {
            adviceMsg = "龙胆泻肝汤：龙胆草15g、黄芩10g、栀子10g、当归15g、生地黄15g、柴胡15g、泽泻15g、车前子15g、甘草6g。建议去正规医院就诊进行治疗。";
          }
        } else if (resultShow[1] == "心血虚证") {
          if (resultShow[0] == "轻度") {
            adviceMsg = "注意睡眠环境的安宁，床铺要舒适，努力减少噪音，睡前数小时（一般下午4点以后）避免使用兴奋性物质（咖啡、浓茶或吸烟等）；睡前不要饮酒，酒精可干扰睡眠；规律的体育锻炼，但睡前应避免剧烈运动；睡前不要大吃大喝或进食不易消化的食物；睡前至少1小时内不做容易引起兴奋的脑力劳动或观看容易引起兴奋的书籍和影视节目；卧室环境应安静、舒适，光线及温度适宜；保持规律的作息时间。";
          } else if (resultShow[0] == "中度") {
            adviceMsg = "在调整作息和饮食的基础上可取新鲜百合30g，冰糖20g。百合洗净，加入冰糖，隔水蒸熟服用，每日1次，晚7时服；酸枣仁(炒)15g，甘草3g，知母、茯苓、川芎各6g，水煎，分3次温服。可按摩或针刺心俞、膻中、内关等穴位。";
          } else {
            adviceMsg = "天王补心丹：人参、茯苓、玄参、丹参、桔梗、远志各15g，当归(酒浸)、五味子、麦门冬、天门冬、柏子仁、酸枣仁(炒)各30g，生地黄120g。建议去正规医院就诊进行治疗。";
          }
        } else if (resultShow[1] == "心脾两虚证") {
          if (resultShow[0] == "轻度") {
            adviceMsg = "晚餐要清淡，饮食规律，不宜过饱，睡前数小时（一般下午4点以后）避免使用兴奋性物质（咖啡、浓茶或吸烟等）；睡前不要饮酒，酒精可干扰睡眠；规律的体育锻炼，但睡前应避免剧烈运动；睡前不要大吃大喝或进食不易消化的食物；睡前至少1小时内不做容易引起兴奋的脑力劳动或观看容易引起兴奋的书籍和影视节目；卧室环境应安静、舒适，光线及温度适宜；保持规律的作息时间。";
          } else if (resultShow[0] == "中度") {
            adviceMsg = "在调整作息和饮食的基础上可取山楂、山药、白术泡水饮用；酸枣仁(炒)15g，甘草3g，知母、茯苓、川芎各6g，水煎，分3次温服。可按摩或针刺神门、三阴交等穴位。";
          } else {
            adviceMsg = "归脾汤：人参10g、白术15g、甘草6g、黄芪15g、当归15g、远志15g、酸枣仁15g、茯神15g、龙眼肉15g、木香10g。建议去正规医院就诊进行治疗。";
          }
        } else {
          if (resultShow[0] == "轻度") {
            adviceMsg = "从事适当地体力活动或体育锻炼，增强体质，持之以恒，促进身心健康，睡前数小时（一般下午4点以后）避免使用兴奋性物质（咖啡、浓茶或吸烟等）；睡前不要饮酒，酒精可干扰睡眠；规律的体育锻炼，但睡前应避免剧烈运动；睡前不要大吃大喝或进食不易消化的食物；睡前至少1小时内不做容易引起兴奋的脑力劳动或观看容易引起兴奋的书籍和影视节目；卧室环境应安静、舒适，光线及温度适宜；保持规律的作息时间。";
          } else if (resultShow[0] == "中度") {
            adviceMsg = "在调整作息和饮食的基础上可取枸杞、山药、熟地黄泡水饮用；酸枣仁(炒)15g，甘草3g，知母、茯苓、川芎各6g，水煎，分3次温服。可按摩或针刺通里、照海、心俞、肾俞、太溪等穴位。";
          } else {
            adviceMsg = "六味地黄丸合交泰丸：地黄15g、山茱萸10g、山药15g、泽泻15g、茯苓15g、牡丹皮15g、黄连5g、肉桂5g。建议去正规医院就诊进行治疗。";
          }
        }


//        $("#TCMSLEEP_SCORE").val(totalSocreSleep);
//        $("#TCMSLEEP_RESULT").val(resultMsg);
//        $("#TCMSLEEP_PROPOSAL").val(adviceMsg);
        return [totalSocreSleep, resultMsg, adviceMsg]
        // alert(resultShow[0] + "&&&&&&&shshhshhshs" + resultShow[1]);
      },
      submit() {
        this.endTime = parseInt(new Date().getTime() / 1000);
        let [TCMSLEEP_SCORE, TCMSLEEP_RESULT, TCMSLEEP_PROPOSAL] = this.bianZhengSleep();
        console.log(TCMSLEEP_SCORE);
        this.answers.TCMSLEEP_SCORE = TCMSLEEP_SCORE + "";
        this.answers.TCMSLEEP_RESULT = TCMSLEEP_RESULT + "";
        this.answers.TCMSLEEP_PROPOSAL = TCMSLEEP_PROPOSAL + "";
        this.answers.STARTDATE = this.startTime;
        this.answers.SUMMITDATE = this.endTime;
        let PATIENT_ID=window.localStorage.getItem('userid');
        this.answers.PATIENT_ID=PATIENT_ID;
        this.answers.AGE=this.age;
        this.answers.SEX=this.sex;
//        this.$router.push({
//          name:'result',
//          query:{
//            from:'tcmsleep',
//            score: 50
//          }
//        });
        this.$http.post('/phwechat/shuimain.do', this.answers).then((res) => {
          if(res.result==='01'){
            let deepNum=this.answers.TCMSLEEP_SCORE;
            let name='';
            if (deepNum < 2) {

              name='良好';
            }
            else if (deepNum >= 2 && deepNum <= 12) {


              name = '轻度睡眠障碍';
            }
            else if (deepNum >= 13 && deepNum <= 36) {
              name = '中度睡眠障碍';

            }
            else {
              name = '重度睡眠障碍';

            }
            this.SET_HISTORY({
              item:'h6',
              result:{
                name:`${name}`,
                isTest:true,
                score: this.answers.TCMSLEEP_SCORE,
              }
            });
            this.$router.push({
              name:'result',
              query:{
                from:'tcmsleep',
                score: this.answers.TCMSLEEP_SCORE
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
