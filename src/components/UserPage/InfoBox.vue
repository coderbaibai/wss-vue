<template>
  <div id="InfoBox" @mouseenter="isFocus = true" @mouseleave="isFocus = false">
    <div :class="{'focusHighlight':isFocus}" id="info">资料</div>
    <div class="itemShow" :class="styleObject[0]" id="username">用户名</div>
    <div id="saveButton" v-if="isChange"><el-button type="primary" size="small" @click="saveAllChange">保存</el-button></div>
    <div id="cancelButton" v-if="isChange"><el-button size="small" @click="cancelAllChange" >取消</el-button></div>
    <div class="itemDiv" id="irealName">
      <el-input
        v-model.trim="username"
        id="erealName"
        size="mini"
        @focus="focused(0)"
        @blur="unfocused"
      ></el-input>
    </div>
    <div class="itemShow" id="wid">工号</div>
    <div class="itemDiv" id="iwid">
      <el-input disabled v-model.trim="wid" id="ewid" size="mini"></el-input>
    </div>
    <div class="itemShow" :class="styleObject[1]" id="gender">性别</div>
    <div class="itemDiv" id="igender">
      <el-select
        id="egender"
        size="mini"
        @focus="focused(1)"
        @blur="unfocused"
        v-model.trim="gender"
        clearable
        placeholder="请选择"
      >
        <el-option
          v-for="(item, index) in genders"
          :key="index"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
      <!-- <el-input maxlength='1' v-model.trim="gender" id="egender" size="mini" @focus="focused(1)" @blur="unfocused"></el-input> -->
    </div>
    <div class="itemShow" id="post">职务</div>
    <div class="itemDiv" id="ipost">
      <el-input disabled v-model.trim="post" id="epost" size="mini"></el-input>
    </div>
    <div class="itemShow" id="team">团队</div>
    <div class="itemDiv" id="iteam">
      <el-input disabled v-model.trim="team" id="eteam" size="mini"></el-input>
    </div>
    <div class="itemShow" :class="styleObject[2]" id="profile">简介</div>
    <div class="itemDiv" id="iprofile">
      <el-input
        @focus="focused(2)"
        @blur="unfocused"
        maxlength="30"
        show-word-limit
        v-model.trim="profile"
        id="eprofile"
        type="textarea"
        :rows="3"
        placeholder="请输入内容"
      ></el-input>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: this.userInfo.username,
      wid: this.userInfo.wid,
      gender: this.userInfo.gender,
      post: this.userInfo.post,
      team: this.userInfo.team,
      profile: this.userInfo.profile,
      styleObject: [],
      genders: ["男", "女"],
      isFocus : false,
      isChange :false
    };
  },
  props:{
    userInfo:Object
  },
  methods: {
    focused(target) {
      this.styleObject = new Array(3);
      this.styleObject.splice(target, 1, "focusStyle");
    },
    unfocused() {
      this.styleObject = new Array(3);
    },
    diff(){
      return this.username === this.userInfo.username&&
        this.gender === this.userInfo.gender&&
        this.profile === this.userInfo.profile
    },
    saveAllChange(){
      this.$emit('save',this.username,this.gender,this.profile)
    },
    cancelAllChange(){
      this.username = this.userInfo.username
      this.gender = this.userInfo.gender
      this.profile = this.userInfo.profile
    },
    successfulSave(){
      this.isChange = this.diff()
    }
  },
  watch:{
    username(){
      this.isChange = !this.diff()
    },
    gender(){
      this.isChange = !this.diff()
    },
    profile(){
      this.isChange = !this.diff()
    }
  }
};
</script>

<style lang="scss" scoped>
.focusStyle {
  color: #409eff !important;
}
#InfoBox {
  background-color: white;
  position: relative;
  width: 303px;
  height: 530px;
}
#saveButton{
  position: absolute;
  left: 185px;
  top: 550px;
}
#cancelButton{
  position: absolute;
  left: 250px;
  top: 550px;
}
#info {
  width: 100px;
  height: 40px;
  line-height: 40px;
  position: absolute;
  font-family: Negreta;
  font-size: 17px;
  text-align: center;
  font-weight: 700;
  color: rgb(102, 102, 102);
  border-bottom: 3px solid rgb(102, 102, 102);
  transition: color 0.5s, background-color 0.5s, border-bottom 0.5s;
}
#info:hover{
  color: #409eff;
  background-color: rgb(236, 245, 255);
  border-bottom: 3px solid #409eff;
}
.focusHighlight{
  color: #409eff !important ;
  background-color: rgb(236, 245, 255) !important;
  border-bottom: 3px solid #409eff !important;
}
.itemShow {
  color: rgb(102, 102, 102);
  position: absolute;
  left: 3px;
  font-family: Negreta;
  font-size: 15px;
  width: 102px;
  height: 22px;
  font-weight: 600;
  line-height: 22px;
  margin-bottom: 5px;
  transition: color 0.5s;
}
.itemDiv {
  position: absolute;
  left: 3px;
  width: 300px;
  height: 27px;
}
#username {
  top: 60px;
}
#irealName {
  top: 87px;
}
/deep/#erealName {
  padding-left: 3px;
}
#wid {
  top: 131px;
}
#iwid {
  top: 158px;
}
/deep/#ewid {
  padding-left: 3px;
}
#gender {
  top: 203px;
}
#igender {
  top: 229px;
}
/deep/#egender {
  padding-left: 3px;
  width: 300px;
}
#post {
  top: 274px;
}
#ipost {
  top: 300px;
}
/deep/#epost {
  padding-left: 3px;
}
#team {
  top: 346px;
}
#iteam {
  top: 372px;
}
/deep/#eteam {
  padding-left: 3px;
}
#profile {
  top: 416px;
}
#iprofile {
  top: 443px;
}
/deep/#eprofile {
  padding-left: 3px;
  font-family: Arial;
}
/deep/.el-select-dropdown__item{
    padding-left: 10px !important;
}
</style>
