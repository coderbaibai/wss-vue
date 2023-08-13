<template>
<form :style="formStyle">
    <div id="username">
        <el-input v-model.trim="username" id="usernameInput" placeholder="Username" clearable></el-input>
    </div>
    <div id="password">
        <el-input show-password v-model.trim="password" id="passwordInput" placeholder="password" clearable></el-input>
    </div>
    <div id="login" @click="loginVerify">
        <el-button id="loginButton" type="primary">Login Now</el-button>
    </div>
    <div id="create" @click="changeToRegister">
        <el-button id="createButton" plain>Create Account</el-button>
    </div>
    <div id="error" v-show="isShow">
        <el-button style="text-Align:center" id="errorButton" type="danger" disabled>{{errMessage}}</el-button>
    </div>
</form>
</template>

<script>
export default {
    name: 'LoginForm',
    data(){
        return{
            username: '',
            password: '',
            errMessage:'',
            isShow : false,
            formStyle:null
        }
    },
    methods:{
        changeToRegister(){
            this.$emit('change')
        },
        showError(){
            this.isShow = true;
            this.formStyle={
                height: "301px"
            }
        },
        changeErrorAndShow(msg){
            this.errMessage = msg
            this.isShow = true;
            this.formStyle={
                height: "301px"
            }
        },
        hideError(){
            this.isShow = false;
            this.formStyle=null
        },
        loginVerify(){
            var userNameReg = /^[A-Za-z0-9]{2,15}$/
            var passwordReg = /^[A-Za-z0-9]{2,15}$/
            if(this.username==''||this.password==''){
                this.errMessage = '用户名或密码不应为空'
                this.showError()
            }
            // else if(!userNameReg.test(this.username)){
            //     this.errMessage = '用户名应为2-15位英文或数字'
            //     this.showError()
            // }
            // else if(!passwordReg.test(this.password)){
            //     this.errMessage = '密码应为2-15位英文或数字'
            //     this.showError()
            // }
            else{
                this.hideError()
                this.$emit('login',this.username,this.password)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
/* 外部表单样式 */
form{
    position:relative;
    width: 290px;
    height: 224px;
    background-color: rgb(215, 215, 215);
    padding: 0;
    margin: 0;
}
/* 内部div样式 */
#username{
    position: absolute;
    top: 16px;
    left: 7px;
    width: 275px;
    height: 49px;
}
#password{
    position: absolute;
    top: 89px;
    left: 7px;
    width: 275px;
    height: 49px;
}
#login{
    position: absolute;
    top: 163px;
    left: 7px;
    width: 132px;
    height: 42px;
}
#create{
    position: absolute;
    top: 163px;
    left: 150px;
    width: 132px;
    height: 42px;
}
#error{
    position: absolute;
    top: 230px;
    left: 7px;
    width: 275px;
    height: 48px;
}
/* div内部按钮、输入框样式 */
/deep/#usernameInput{
    width: 275px;
    height: 49px;
    font-size: 18px;
    border-radius: 10px;
}
/deep/#passwordInput{
    width: 275px;
    height: 49px;
    font-size: 18px;
    border-radius: 10px;
}
/deep/#loginButton{
    width: 132px;
    height: 42px;
    font-size: 18px;
    border-radius: 10px;
}
/deep/#createButton{
    color: #333333;
    width: 132px;
    height: 42px;
    font-size: 16px;
    border-radius: 10px;
    padding-left: 8px;
    padding-top: 13px;
}
/deep/#errorButton{
    width: 275px;
    height: 48px;
    font-size: 18px;
    font-style: italic;
    border-radius: 10px;
    padding-left: 5px;
}
</style>