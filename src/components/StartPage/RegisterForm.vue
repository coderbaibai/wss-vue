<template>
<form :style="formStyle">
    <div id="username">
        <el-input v-model.trim="username" id="usernameInput" placeholder="Username" clearable></el-input>
    </div>
    <div id="password">
        <el-input show-password v-model.trim="password" id="passwordInput" placeholder="password" clearable></el-input>
    </div>
    <div id="repassword">
        <el-input show-password v-model.trim="repassword" id="repasswordInput" placeholder="Confirm Password" clearable></el-input>
    </div>
    <div id="policy">
        <el-checkbox v-model="checked" id="policyInput"></el-checkbox>
        <div id="policis"> By signing up, you accept our Terms of Service and Privacy <a href="https://www.bilibili.com/">Policy</a>.</div>
    </div>
    <div id="sign" @click="signVerify">
        <el-button id="signButton" type="primary">Sign up</el-button>
    </div>
    <div id="error" v-show="isShow">
        <el-button id="errorButton" type="danger" disabled>{{errMessage}}</el-button>
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
            repassword: '',
            checked:false,
            errMessage:'',
            isShow : false,
            formStyle:null
        }
    },
    methods:{
        showError(){
            this.isShow = true;
            this.formStyle={
                height: "392px"
            }
        },
        changeErrorAndShow(msg){
            this.errMessage = msg
            this.isShow = true;
            this.formStyle={
                height: "392px"
            }
        },
        hideError(){
            this.isShow = false;
            this.formStyle=null
        },
        signVerify(){
            var userNameReg = /^[A-Za-z0-9]{2,15}$/
            var passwordReg = /^[A-Za-z0-9]{2,15}$/
            if(this.username==''||this.password==''||this.repassword==''){
                this.errMessage = '用户名或密码不应为空'
                this.showError()
            }
            else if(!userNameReg.test(this.username)){
                this.errMessage = '用户名应为2-15位英文或数字'
                this.showError()
            }
            else if(!passwordReg.test(this.password)){
                this.errMessage = '密码应为2-15位英文或数字'
                this.showError()
            }
            else if(this.password!=this.repassword){
                this.errMessage = '两次输入的密码不符'
                this.showError()
            }
            else if(!this.checked){
                this.errMessage = '请同意用户协议'
                this.showError()
            }
            else{
                this.hideError()
                this.$emit('register',this.username,this.password)
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
    height: 315px;
    background-color: rgb(215, 215, 215);
    padding: 0;
    margin: 0;
}
a:link,a:visited,a:hover,a:active{
    color: rgb(64, 158, 255);
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
#repassword{
    position: absolute;
    top: 162px;
    left: 7px;
    width: 275px;
    height: 49px;
}
#policy{
    position: absolute;
    top: 221px;
    left: 11px;
    width: 275px;
    height: 24px;
}
#policis{
    top:-3px;
    left: 23px;
    position: absolute;
    font-size: 6px;
}
#sign{
    position: absolute;
    top: 260px;
    left: 11px;
    width: 269px;
    height: 42px;
}
#error{
    position: absolute;
    top: 322px;
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
/deep/#repasswordInput{
    width: 275px;
    height: 49px;
    font-size: 18px;
    border-radius: 10px;
}
/deep/#policyInput{
    zoom: 135%;
}
/deep/#signButton{
    width: 269px;
    height: 42px;
    font-size: 18px;
    border-radius: 10px;
}
/deep/#errorButton{
    width: 275px;
    height: 48px;
    font-size: 18px;
    font-style: italic;
    border-radius: 10px;
    padding-left: 7px;
}
</style>