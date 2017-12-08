<template>
  <div>
    <header class="header flex direction-column justify-center">
      <p>{{title}}</p>
      <p><b>{{titleResult}}</b></p>
    </header>
    <div id="rador" v-if="resultText!==''">
      <chart :options="polar" v-if="showChart"></chart>

    </div>
    <div class="chart-result" v-if="resultText!==''">
      您的评测结果，{{resultText}}
    </div>
    <div class="suggests">
      <div class="sug-item">
        <h2 class="sug-title">专家说法</h2>
        <section>
          <p class="txt">{{suggests}}
          </p>
        </section>
      </div>
      <div class="sug-item">
        <h2 class="sug-title">如何改善</h2>
        <section>
          <div v-if="isArray(improve)&& improve.length>0">
            <div>
              <div class="per per-ti">
                有效性
              </div>
              <ul class="me-lst">
                <li class="me-lst-li" v-for="(item,index) in improve" :key="index">
                  <div class="bar bar-out"><span class="bar bar-in" :style="{width:item.percent}"></span></div>
                  <p>{{item.name}} <span class="per">{{item.percent}}</span></p>
                </li>

              </ul>
            </div>
          </div>
          <div v-else class="syn-improve">
            {{improve}}
          </div>
          <p class="user-num">
            数据为与您症状相同的<span>5577</span>位用户<br>
            有效排名前五的方法
          </p>
        </section>
      </div>
    </div>
    <div class="code flex justify-center align-center">
      <img :src="$STATIC+'static/result/code.png'">
    </div>
    <footer class="footer">
      <div class="re-test">
        <span @click="reTest">重新测试&gt;&gt;</span>
      </div>
      <div class="isHelp">
        <span>以上结果是否对您有帮助{{result}}</span>
        <input type="button" value="是" @click="setHelp($event)" :class="{iptActive:isHelp==='1'}">
        <input type="button" value="否" @click="setHelp($event)" :class="{iptActive:isHelp==='0'}">
      </div>
    </footer>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {isArray} from '@/common/utils'

  export default {
    name: 'result',
    data() {
      return {
        fromPage: '',// 判断从哪个量表过来
        titleResult: '',// 不同量表的测评结果文字
        isHelp: '',
        score: '',//情绪程度判断
        showChart: true,// 是否显示echarts
        polar: {
          radar: [
            {
              name: {
                show: true,
                color: '#666',
                fontSize: '100%'
              },
              splitNumber: 4,//设置分割几块
              scale: false,
              splitLine: { //分割块的线条的样式
                lineStyle: {
                 width:0
                }
              },
              indicator: [//指示器
                {text: '心态不错', max: 100},
                {text: '重抑郁', max: 100},
                {text: '中度抑郁', max: 100},
                {text: '轻度抑郁', max: 100}
              ],
              splitArea: {//分割块区域的样式
                show: true,
                areaStyle: {
                  color:['#b1e6ff','#b1e6ff','#4bc6ff','#0094d9']
                }
              },
              center: ['50%', '50%'],
              radius: '65%',//雷达图的半径
              axisLabel: {//设置显示刻度
                show: false,
                showMaxLabel: true,
                fontSize: '80%',
                width: 1,
                color:'#fff'
              },
            }
          ],
          series: [
            {
              name: '成绩单',
              type: 'radar',
              radarIndex: 0,
              data: [
                {
                  value: [50, 50, 50, 50],
                  name: '张三',
                  label: {
                    normal: {
                      show: false,
                      formatter: function (params) {
                        return params.value;
                      }
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: '#b1e6ff',
                      borderWidth: 5,
                      opacity: 0.8
                    }
                  },//拐点的小圆点的样式
                  lineStyle: {
                    normal: {
                      width: 1.5,
                      color: '#fff',
                    }
                  },//连接线的样式
                  areaStyle: {// 链接区域的样式
                    normal: {
                      color: '#fff',
                      opacity: 0.5
                    }
                  }
                }
              ]
            }
          ]
        },// echarts数据
        fromPath: '',// 来源的路径
        suggests: '', // 专家说法
        improve: [],//如何改善
        resultText: '',// 评测的文字结果信息
      }
    },
    created() {
      console.log('created')
      if (this.$route.query.showChart === false) {//是否显示echarts
        this.showChart = false;
      }
      console.log(this.$route.query);
      this.fromPage = this.$route.query.from;// 设置从哪里过来
      this.score = this.$route.query.score==='undefined'?undefined:this.$route.query.score+"";// 设置结果分数
      this.setTopTitle();
      this.setSuggest();//设置专家说法
      this.setImprove();
      this.setResultText();
    },
    methods: {
      setHelp(e) {
        let dom = e.target;
        dom.value === '是' ? this.isHelp = '1' : this.isHelp = '0';
      },
      reTest() {
        this.$router.push({path:`/${this.fromPage}`,query:{allow:true} });
      },
      setSuggest() {
        let from = this.fromPage;
        switch (from) {
          case 'emotion':
            this.suggests = `抑郁症又称抑郁障碍，
              以显著而持久的心境低落为主要临床特征，
              是心境障碍的主要类型。临床可见心境低落与其处境不相称，
              情绪的消沉可以从闷闷不乐到悲痛欲绝，自卑抑郁，
              甚至悲观厌世，可有自杀企图或行为；甚至发生木僵；
              部分病例有明显的焦虑和运动性激越；严重者可出现幻觉、
              妄想等精神病性症状。每次发作持续至少2周以上、长者甚或数年
              ，多数病例有反复发作的倾向，每次发作大多数可以缓解，
              部分可有残留症状或转为慢性。`;
            break;
          case 'tcmsleep':
            this.suggests = `睡眠是生命的需要，所以人不能没有睡眠，
              而且每天缺少的睡眠还要补上，否则会受到惩罚，
              很像欠债一定要还一样。。`;
            break;
          case 'syndrome':
            let data={
              SYNDROME_RESULT:this.$route.query.SYNDROME_RESULT
            }
            this.$http.post('/phwechat/zhenghoujieguo.do',data).then((res)=>{
              this.suggests = res.data_02;
              this.improve=res.data_01;
            });

            break;
          default:
            break;
        }
      },// 设置专家说法
      setImprove() {
        let list = [
          {
            name: '身体锻炼',
            percent: '70%'
          },
          {
            name: '睡前引用少量温奶粉',
            percent: '68%'
          },
          {
            name: '晚餐少量，清单',
            percent: '68%'
          },
          {
            name: '晚餐后泡热水脚',
            percent: '67%'
          },
          {
            name: '有规律的时间内睡眠起床',
            percent: '62%'
          }
        ]
        if (this.fromPage === 'emotion') {
          list = [
            {
              name: '多与人沟通',
              percent: '80%'
            },
            {
              name: '多与家人陪伴',
              percent: '68%'
            },
            {
              name: '坚持每天锻炼',
              percent: '53%'
            },
            {
              name: '多阅读健康书籍',
              percent: '67%'
            },
            {
              name: '有规律的时间内睡眠起床',
              percent: '62%'
            },
          ]
        } else if (this.fromPage === 'syndrome') {
          list = [];
        }
        this.improve = list;
      },//设置如何改善
      setTopTitle() {

        let deep = '';// 置头部标题大字部份
        let deepNum;// 根据分数来判断
        if (this.score !== undefined && this.fromPage !== undefined) {
          deepNum = this.score;
          if (this.fromPage === 'emotion') {
            switch (deepNum) {
              case '0':
                deep = '心态不错';
                this.polar.series[0].data[0].value[0] = 100;
                break;
              case '1':
                deep = '轻度抑郁';
                this.polar.series[0].data[0].value[3] = 100;
                break;
              case '2':
                deep = '中度抑郁';
                this.polar.series[0].data[0].value[2] = 100;
                break;
              case '3':
                this.polar.series[0].data[0].value[1] = 100;
                deep = '重度抑郁';

                break;
              default:
                break;

            }
          }
          else if (this.fromPage === 'tcmsleep') {
            this.polar.radar[0].indicator = this.polar.radar[0].indicator.map((item, index) => {
              let o = {text: '', max: 100}
              switch (index) {
                case 0:
                  o.text = '良好';
                  break;
                case 1:
                  o.text = '轻度';
                  break;
                case 2:
                  o.text = '中度';
                  break;
                case 3:
                  o.text = '重度';
                  break;
                default:
                  break;
              }
              return o;
            });
            deep = `${deepNum}分`;
            if (deepNum < 2) {
              this.polar.series[0].data[0].value[0] = 100;
              this.polar.radar[0].indicator[0].text = '良好';
            }
            else if (deepNum >= 2 && deepNum <= 12) {

              this.polar.series[0].data[0].value[3] = 100;
              this.polar.radar[0].indicator[3].text = '轻度';
            } else if (deepNum >= 13 && deepNum <= 36) {
              this.polar.radar[0].indicator[2].text = '中度';
              this.polar.series[0].data[0].value[2] = 100;
            } else {
              this.polar.radar[0].indicator[1].text = '重度';
              this.polar.series[0].data[0].value[1] = 100;
            }
          }
          else if(this.fromPage==='syndrome'){
            deep=this.$route.query.SYNDROME_RESULT.slice(0,this.$route.query.SYNDROME_RESULT.length-1)
//            this.$http.post('/api/zhenghoujieguo').then((res)=>{
//              console.log(res);
//            })
          }
          this.titleResult = deep;//设置头部标题大字部份
        }
        else{ //中医症候
          this.titleResult=this.$route.query.SYNDROME_RESULT.slice(0,this.$route.query.SYNDROME_RESULT.length-1);
        }
        if (this.fromPage !== undefined) {//这是头部标题前缀

          switch (this.fromPage) {
            case 'emotion':
              this.title = '您偏向于';
              break;
            case 'tcmsleep':
              this.title = '您的睡眠测评得分';
              break;
            case 'syndrome':
              this.title = '根据测评结果显示' +
                '你属于';
              break;
            default:
              break;
          }
        }
      },// 设置头部内容,雷达图数据
      setResultText() {// 设置文字结果

        if (this.fromPage === 'emotion') {
          switch(this.score){
            case '0':
              this.resultText='您的情绪状况良好';
              break;
            case '1':
              this.resultText='你可能患有轻度抑郁';
              break;
            case '2':
              this.resultText='你可能患有中度抑郁';
              break;
            case '3':
              this.resultText='你可能患有重度抑郁';
              break;
          }
        }
        else if(this.fromPage==='tcmsleep'){

          if (this.score < 2) {
            this.resultText='您的睡眠状况良好';
          }
          else if (this.score >= 2 && this.score <= 12) {
            this.resultText='您可能患有轻度失眠';
          } else if (this.score >= 13 && this.score <= 36) {
            this.resultText='您可能患有中度失眠';
          } else {
            this.resultText='您可能患有重度失眠';
          }
        }
        else if(this.fromPage==='syndrome'){
          this.resultText='';
        }
      },
      isArray(a){
        return isArray(a);
      }
    },
    computed: {
      ...mapState(['result'])
    },
    beforeRouteEnter(to, from, next) {
      console.log('进入路由',to.fullPath,from.fullPath)
      next();
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当守卫执行前，组件实例还没被创建
    },
    beforeRouteUpdate(to, from, next) {
      console.log('beforeRouteUpdate')
      next();
      // 在当前路由改变，但是该组件被复用时调用
      // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
      // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
      // 可以访问组件实例 `this`
    },
    beforeRouteLeave(to, from, next) {
      console.log('离开路路由',to.fullPath,from.fullPath)
      if(!to.query.allow){
        if (to.fullPath === '/home') {
          next();
        } else {
          console.log('从新提交')
          next('/home')
        }
      }else{
        next();
      }

      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
    }
  }
</script>

<style lang="scss" scoped>
  @import "../common/scss/mixin";

  .header {
    height: 453px;
    @include bk('result/cloud_02.jpg', 100);
    & p {
      color: #fff;
      font-size: 48px; /*px*/
      text-align: center;
      & b {
        line-height: 109px;
        font-size: 72px; /*px*/
      }
    }
  }

  #rador {
    height: 800px;
  }

  .chart-result {
    text-align: center;
    padding-bottom: 200px;
    padding-top: 100px;
    font-size: 18px; /*px*/
  }

  .suggests {
    padding: 0 30px;
  }

  .sug-title {
    font-size: 36px; /*px*/
    color: #4bc6ff;
    text-align: center;
    border-bottom: 2px solid #ceced4;
    padding-bottom: 44px;
  }

  .sug-item section .txt {
    padding-top: 52px;
    font-size: 22px; /*px*/
    line-height: 60px;
    color: #666;
    min-height: 360px;
  }

  .per {
    font-size: 30px; /*px*/
    color: #4bc6ff;
    text-align: right;
  }

  .per-ti {

    padding-top: 40px;
  }

  .me-lst-li {
    margin-top: 37px;
  }

  .me-lst-li p {
    color: #999;
    font-size: 30px; /*px*/
    overflow: hidden;
    & .per {
      float: right;
    }
  }

  .bar-in {
    display: inline-block;
    width: 0%;
    height: 100%;
    background-color: #4bc6ff;
    border-radius: 19px;
    font-size: 20px;
  }

  .bar-out {
    height: 19px;
    background-color: #f9f9f9;
    -webkit-border-radius: 100px;
    margin-bottom: 21px;
  }

  .user-num {
    margin-top: 188px;
    font-size: 30px; /*px*/
    color: #999;
    text-align: center;
    line-height: 43px;
    & span {
      font-size: 43px; /*px*/
      color: #4bc6ff;
    }
  }

  .code {
    & img {
      width: 300px;
    }
    height: 553px;
  }

  .re-test {
    text-align: right;
    border-bottom: 2px solid #ceced4;
    padding-bottom: 33px;
    & span {
      font-size: 30px;
      color: #4bc6ff;
      padding-right: 37px;
    }
  }

  .footer {
    padding: 0 30px;
  }

  .isHelp {

    padding-top: 20px;
    padding-bottom: 200px;
    & span {
      display: inline-block;
      width: 474px;
      font-size: 30px;
      color: #999;
    }
    & input {
      width: 68px;
      height: 62px;
      border: 1px solid #b8ecff; /*no*/
      background-color: #fff;
      color: #4bc6ff;
      font-size: 18px; /*px*/

    }
    & input:nth-of-type(2) {
      margin-left: 47px;
    }
    & .iptActive {
      background-color: #4bc6ff;
      color: #fff;
    }
  }

  .echarts {
    width: 100%;
    height: 900px;
  }
  .syn-improve{
    padding-top:20px;
    font-size:28px;/*px*/
    line-height:50px;
  }
</style>
