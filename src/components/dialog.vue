<template>
  <div class="dialog">
    <div class="mask"></div>
    <div class="content">
      <div class="c-top">
        <div v-if="type==='textarea'" class="c-advance">
          <div v-show="advance">
            <p class="title"> 请写出您的想法和意见</p>
            <textarea class="textarea" v-model="textarea"></textarea>
          </div>
          <div v-show="!advance">
            <img :src="$STATIC+'static/emotion-smile.png'">
            <p class="ad-re">感谢您的反馈</p>
            <p class="ad-re2">我们将认真查阅与改进</p>
          </div>
        </div>
        <div class="c-emotion" v-if="type==='alert'">
          <img :src="$STATIC+'static/emotion-cry.png'">
          <p class="c-info">您还没有注册，请先注册</p>
        </div>
      </div>
      <div class="c-bottom flex" v-if="showBtn">
        <button @click="cancel">取消</button>
        <button @click="ensure">{{button2}}</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'dialog',
    data() {
      return {
        textarea: '',
        advance: true,
        showBtn: true
      }
    },
    computed: {
      button2() {
        if (this.type === 'textarea') {
          return '好了'
        } else {
          return '注册'
        }
      }

    },
    props: {
      type: {
        type: String,
        default: 'alert'
      }
    },
    methods: {
      cancel() {
        this.$emit('cancel')
      },
      ensure() {
        if (this.type === 'textarea') {
          this.advance = false;
          this.showBtn = false;
          setTimeout(() => {
            this.$emit('ensure')
          }, 2000)

        }else{
          this.$emit('ensure')
        }

      }
    }
  }
</script>

<style lang="scss" scoped>
  .dialog {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    & .mask {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: black;
      opacity: 0.5;
      z-index: 99;
    }
  }

  .content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 620px;
    border-radius: 42px;
    background-color: #fff;
    z-index: 100;
    padding-top: 66px;
  }

  .c-top {
    padding-bottom: 30px;
    & .c-emotion {
      text-align: center;
      & img {
        margin-bottom: 40px;
      }
      & .c-info {
        font-size: 28px; /*px*/
        color: #999;
      }
    }
  }

  .c-bottom {
    border-top: 1px solid #ceced4; /*no*/
    & button {
      flex: 1;
      height: 95px;
      background-color: #fff;
      font-size: 30px; /*px*/
      color: #999;
      border-bottom-right-radius: 42px;
      border-bottom-left-radius: 42px;
      &:active {
        background-color: #4bc6ff;
        color: #fff;
      }
    }
    & button:nth-of-type(1) {
      border-bottom-right-radius: 0px;
      border-left: 1px solid #999; /*px*/
    }
    & button:nth-of-type(2) {
      border-bottom-left-radius: 0px;
      border-left: 1px solid #999; /*px*/
    }
  }

  .textarea {
    width: 80%;
    height: 214px;
    margin-top: 20px;
    border-left: 1px solid #999; /*px*/
    color: #999;
    text-align: left;
    font-size: 30px; /*px*/
  }

  .c-advance {
    font-size: 30px; /*px*/
    color: #999;
    text-align: center;
  }
  .ad-re{
    font-size:36px;/*px*/
    color:#4bc6ff;
    margin-top:40px;
  }
  .ad-re2{
    font-size:28px;/*px*/
    color:#999;
    line-height:47px;
  }
</style>
