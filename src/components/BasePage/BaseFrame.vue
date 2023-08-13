<template>
    <div v-loading="loading" style="width:100%;height:100%;position:relative">
        <BasePageVue :name="name" :url="url" v-if="isManager&&!loading"/>
        <CommonBasePageVue :name="name" :url="url" v-if="!isManager&&!loading"/>
        <keep-alive :include="['UserPage','TeamPage','ReservationPage']">
            <router-view id="kmain" @changeName="changeName" @changeUrl="changeUrl"></router-view>
        </keep-alive>
    </div>
</template>

<script>
import BasePageVue from './BasePage.vue'
import CommonBasePageVue from './CommonBasePage.vue'
export default {
    data(){
        return{
            isManager:false,
            name:'',
            url:''
        }
    },
    computed:{
        computedUrl(){
            if(this.name){
                if (/[\u4E00-\u9FA5\uFE30-\uFFA0]/.test(this.name)&&this.name.length>=2) {
                    return this.url==''||!this.url?"https://ui-avatars.com/api/?size=512&&font-size=0.33&&background=random&&name="+this.name.slice(-2):this.url
                }//包含中文且长度大于等于2
                return this.url==''||!this.url?"https://ui-avatars.com/api/?size=512&&font-size=0.33&&background=random&&name="+this.name.slice(0,1):this.url
            }
            else
                return ''
        },
        loading(){
            return this.name==''||this.computedUrl=='';
        }
    },
    mounted(){
        this.$http.get('/index/userInfo',{timeout:1000})
        .then(res=>{
            if(res.data.code==1){
                if(res.data.data.type==1){
                    this.isManager = true
                    this.name = res.data.data.name
                    this.url = res.data.data.url
                }
            }
            else{
                this.$message.error(res.data.msg);
                this.$router.push("/start",()=>{},()=>{})
            }
        })
        .catch(res=>{
            this.$message.error("服务器连接错误");
            this.$router.push("/start",()=>{},()=>{})
        })
    },
    methods:{
        changeName(newName){
            this.name = newName
        },
        changeUrl(newUrl){
            this.url = newUrl
        }
    },
    components:{
        BasePageVue,
        CommonBasePageVue
    }
}
</script>

<style scoped>
#kmain{
    position:absolute; 
    top:70px;
    left: 230px;
    width: calc(100% - 230px);
    width:-webkit-calc(100% - 230px);
    width:-moz-calc(100% - 230px);
    height: calc(100% - 70px);
    height: -webkit-calc(100% - 70px);
    height: -moz-calc(100% - 70px);
}
</style>