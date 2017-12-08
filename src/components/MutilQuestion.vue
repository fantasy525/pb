<template>
  <div class="mutil-ques" >
   <div v-for="(subItem,index) in subItems" :key="index" class="mutil-list">
     <p class="question" >{{subItem.subQuesTitle}}</p>
     <div class=" mutil-op ">
       <radio
         @sl="sl"
         v-model="answers[subItem.name]"
         :self-value="index3+''"
         v-for="(subAns,index3) in subItem.subAnswers"
         :key="index3"
         :hasSub="true"
       >{{subAns}}
       </radio>
     </div>
   </div>
  </div>
</template>

<script>
  import Radio from '@/components/radio'
  export default {
    name:'mutil-radio',
    data(){
      return {
        canNext:false
      }
    },
    created(){
      this.sum=this.subItems.length;
    },
    components:{
      'radio':Radio
    },
    props:['subItems','answers'],
    methods:{
      sl(){
       for(let i in this.subItems){
         console.log( this.answers[this.subItems[i].name])
         if( this.answers[this.subItems[i].name]===''){
           return ;
         }
       }
       this.$emit('sl')
      }
    }
  }
</script>

<style lang="scss" scoped>
.mutil-ques{
  padding-left:13px;
  margin-top:20px;
  & .mutil-list{
    border-top:1px dotted #18b7f1;
    padding-left:15px;
    margin-top:23px;
    padding-top:20px;
    & .question{
      font-size: 36px; /*px*/
      color: #18b7f1;
      margin-bottom: 24px;
    }

  }
}
  .flex{
    & .my-radio:first-child{
      margin-left:0;
    }
  }

</style>
