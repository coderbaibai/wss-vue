<template>
  <div style="width:100%;height:100%"><router-view>请稍后......</router-view></div>
</template>

<script>
export default {
    mounted(){
        this.$http.get('/index/userInfo',{timeout:1000})
        .then(res=>{
            if(res.data.code==1){
                this.$router.push({
                    path:"/base"
                },()=>{},()=>{})
            }
            else{
                this.$router.push({
                    path:"/start"
                },()=>{},()=>{})
            }
        })
        .catch(res=>{
            this.$message.error("服务器访问错误");
        })
    }
}
</script>

<style>

</style>