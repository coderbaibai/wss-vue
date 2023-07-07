<template>
<div id="formDiv">
    <div id="form">
        <LoginFormVue ref="login" v-if="isLogin" @change="change" @login="login"/>
        <RegisterFormVue ref="register" v-else @register="register"/>
    </div>
</div>
</template>

<script>
import RegisterFormVue from './RegisterForm.vue'
import LoginFormVue from './LoginForm.vue'
export default {
    data(){
        return{
            isLogin:true
        }
    },
    methods:{
        change(){
            this.isLogin = !this.isLogin
        },
        login(username,password){
            // this.$emit('login',1)
            this.$http.post("/start/login",{username:username,password:password},{timeout:1000})
            .then(res=>{
            if(res.data.code==1){
                if(res.data.data.type)
                    this.$emit('login',1)
                else
                    this.$emit('login',2)
            }
            else{
                this.$refs.login.changeErrorAndShow(res.data.msg)
            }
            })
            .catch(()=>{
                this.$refs.login.changeErrorAndShow("服务器访问错误")
            })
        },
        register(username,password){
            this.$http.post("/start/register",{username:username,password:password},{timeout:1000})
            .then(res=>{
                if(res.data.code==1){
                    this.$emit('login')
                }
                else{
                    this.$refs.register.changeErrorAndShow(res.data.msg)
                }
            })
            .catch(()=>{
                this.$refs.register.changeErrorAndShow("服务器访问错误")
            })
        }
    },
    components:{
        RegisterFormVue,
        LoginFormVue
    }
}
</script>

<style scoped>
#form{
    position: absolute;
    top: 300px;
    left: 1150px;
    height: 500px;
    width: 200px;
}
#formDiv{
    height: 900px;
    position: relative;
    /* 加载背景图 */
    background-image: url(../../assets/startBackground.png);
    /* 背景图垂直、水平均居中 */
    background-position: center center;
    /* 背景图不平铺 */
    background-repeat: no-repeat;
    /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
    background-attachment: fixed;
    /* 让背景图基于容器大小伸缩 */
    background-size: cover;
    /* 设置背景颜色，背景图加载过程中会显示背景色 */
    background-color: #464646;
}
</style>