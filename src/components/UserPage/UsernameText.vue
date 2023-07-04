<template>
  <div id="usernameText" @mouseenter="mouseIn" @mouseleave="mouseOut">
    <span id="text">爱学习的小白</span>
    <img @click="beginEdit" v-show="isShowEdit" id="changeImg" src="../../assets/change.svg">
  </div>
</template>

<script>
export default {
    data(){
        return{
            isShowEdit :false
        }
    },
    methods:{
        mouseIn(){
            this.isShowEdit = true;
        },
        mouseOut(){
            this.isShowEdit = false;
        },
        beginEdit(){
            console.log("beginEdit");
        }
    }
}
</script>

<style scoped>
#usernameText{
    display: inline-block;
}
#text{
    display: inline-block;
    height: 35px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
    font-weight: 700;
    line-height: 35px;
}
#changeImg{
    cursor: pointer;
    position:relative;
    top: 5px;
    margin-left: 6px;
    height: 20px;
    width: 20px;
}
</style>