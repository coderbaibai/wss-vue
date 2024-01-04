<template>
  <div v-if="source" id="item">
    <img :src="source" alt="noImg" width="90px" height="90px">
    <el-checkbox v-model="myIsChosen" id="ecb"></el-checkbox>
  </div>
</template>

<script>
export default {
    props:["source","isChosen"],
    data(){
        return{
            myIsChosen:false,
        }
    },
    watch:{
        isChosen:{
            immediate:true,
            handler(){
                this.myIsChosen = this.isChosen;
            }
        },
        myIsChosen(){
            this.$emit('changeChosens',this.source,this.myIsChosen)
        }
    }
}
</script>

<style lang="scss" scoped>
#item{
    width: 150px;
    height: 90px;
    position: relative;
}
#ecb{
    margin-left: 10px;
}
</style>