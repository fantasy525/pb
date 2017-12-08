<template>
    <div class="my-radio flex align-center justify-center"
         @click="setSel"
         :class="checked===selfValue?'my-radio-sel':''">

     <span class="txt"><slot></slot></span>
      <!--<input type="radio" name="radio"-->
             <!--:checked="checked===selfValue"-->
            <!--@change="change($event)">-->
    </div>
</template>

<script>
    export default {
      name:'radio',
      data(){
        return {
          show:true
        }
      },
      model:{
        prop:'checked',
        event:'change'
      },
      props:{
        checked:String,
        selfValue:String,
        hasSub:Boolean,
        runing:Boolean
      },
      methods:{
        setSel(){
          if(!this.runing){
            console.log('子')
            this.$emit('change',this.selfValue);
            this.$emit('sl',this.hasSub);
          }
        }
      }
    }
</script>

<style lang="scss">
.my-radio{
  position:relative;
  width:593px;
  flex:0 1 593px;
  height:83px;
  background-color:#fff;
  border-radius:4px;
  margin-top:24px;
 font-size:18px;/*px*/
  color:#b8ecff;
  border:1px solid #b8ecff;/*no*/
  & .txt{
    font-size:36px;/*px*/
    color:#00bbff;
  }
}
  .my-radio-sel{
    background-color:#41c4f4;
    color:#fff;
    & .txt{
      color:#fff;
    }
  }
</style>
