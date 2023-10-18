<template>
<div>
  <div id="teamPage">
    <div id="header">
      <img :src="computedTeamUrl" id="teamAvatar" />
      <h1 style="position: relative; top: 10px">{{teamInfo.name}}</h1>
      <div id="search">
        <el-input
          placeholder="查找员工"
          v-model.trim="searchMsg"
          class="input-with-select"
          @change="filterMethod"
        >
          <el-select
            style="width: 130px"
            v-model="select"
            slot="prepend"
            placeholder="请选择"
          >
            <el-option label="职位号" value="1"></el-option>
            <el-option label="姓名" value="2"></el-option>
            <el-option label="工号" value="3"></el-option>
          </el-select>
          <el-button
            @click="filterMethod"
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
      </div>
      <div id="addEmp">
        <el-button
          @click="isAdd = true"
          type="primary"
          icon="el-icon-plus"
          circle
        ></el-button>
      </div>
    </div>
    <div id="mainFrame">
      <div id="baseInfo">
        <div id="saveButton" v-if="isChange">
          <el-button type="primary" size="small" @click="saveAllChange"
            >保存</el-button
          >
        </div>
        <div id="cancelButton" v-if="isChange">
          <el-button size="small" @click="cancelAllChange">取消</el-button>
        </div>
        <div class="infoText" style="top: 35px">图标：</div>
        <div @mouseenter="mouseIn" @mouseleave="mouseOut" id="avatarBox">
          <img :src="computedTeamUrl" id="timg"/>
          <img v-show="isShowEdit" @click="beginEdit" id="changeImg" src="@/assets/change.svg"/>
        </div>
        <UploadDialogVue @close="close" @updateUrl="updateUrl" :isEdit="isBeginEdit" target="teams"/>
        <div class="infoText" style="top: 105px">团队号：</div>
        <div class="itemDiv" style="top: 130px">
          <el-input
            disabled
            v-model.trim="teamInfo.id"
            id="tid"
            size="mini"
          ></el-input>
        </div>
        <div :class="styleObject[0]" class="infoText" style="top: 175px">
          团队名：
        </div>
        <div class="itemDiv" style="top: 200px">
          <el-input
            @focus="focused(0)"
            @blur="unfocused"
            v-model.trim="nameNew"
            id="tname"
            size="mini"
          ></el-input>
        </div>
        <div :class="styleObject[1]" class="infoText" style="top: 245px">
          办公地：
        </div>
        <div class="itemDiv" style="top: 270px">
          <el-input
            @focus="focused(1)"
            @blur="unfocused"
            v-model.trim="placeNew"
            id="place"
            size="mini"
          ></el-input>
        </div>
        <div class="infoText" style="top: 315px">CEO：</div>
        <div class="itemDiv" style="top: 340px">
          <el-input disabled v-model.trim="ceo" id="ceo" size="mini"></el-input>
        </div>
        <div :class="styleObject[2]" class="infoText" style="top: 390px">
          简介：
        </div>
        <div class="itemDiv" style="left: 13px; top: 415px">
          <el-input
            @focus="focused(2)"
            @blur="unfocused"
            maxlength="60"
            show-word-limit
            v-model.trim="profileNew"
            id="eprofile"
            type="textarea"
            :rows="6"
            placeholder="请输入内容"
          ></el-input>
        </div>
      </div>
      <div id="searchBox">
        <el-table
          row-key="wid"
          :row-style="tableStyle"
          :data="curEmps"
          height="700"
          stripe
          style="width: 100%"
        >
          <el-table-column label="姓名" width="250">
            <template slot-scope="scope">
              <img
                :src="computeUrl(scope.row.avatar_url,scope.row.name)"
                style="
                  width: 50px;
                  height: 50px;
                  border-radius: 25px;
                  position: relative;
                  top: 5px;
                "
              />
              <span style="margin-left: 20px; position: relative; top: -16px">{{
                scope.row.name
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="post" label="职位" width="200">
          </el-table-column>
          <el-table-column prop="wid" label="工号" width="200"> </el-table-column>
          <el-table-column align="center" width="150" label="是否为管理员">
            <template slot-scope="scope">
              <span>{{ scope.row.type? "是" : "否" }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="100px">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.row.username)"
                >编辑</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 编辑对话框 -->
  </div>
    <el-dialog
      @closed="clearUserChange()"
      title="员工管理"
      :visible.sync="isEdit"
    >
      <el-form>
        <el-form-item>
          <el-col :span="3" style="text-align: center"
            ><img
              :src="curImgUrl"
              style="
                width: 60px;
                height: 60px;
                border-radius: 30px;
                position: relative;
                top: 10px;
              "
          /></el-col>
          <el-col :span="20"
            ><h1>{{ `${curName}(${curUserName})` }}</h1></el-col
          >
        </el-form-item>
        <el-form-item label="职位">
          <el-input v-model="newPost"></el-input>
        </el-form-item>
        <el-form-item label="工号">
          <el-input v-model="newWid"></el-input>
        </el-form-item>
        <el-form-item label="是否为管理员">
          <el-radio-group v-model="newType">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button :disabled="!editChange" @click="employeePut" type="primary"
          >保存</el-button
        >
        <el-button @click="isEdit = false">取消</el-button>
        <el-button @click="employeeDelete" type="danger">辞退</el-button>
      </div>
    </el-dialog>
    <!-- 添加对话框邀请员工 -->
    <el-dialog
      @closed="
        searchName = '';
        empty = true;
      "
      width="650px"
      :visible.sync="isAdd"
    >
      <el-form>
        <el-form-item style="text-align: center; margin-bottom: 0px">
          <img :src="inviteUrl" alt="" height="40px" width="40px" />
        </el-form-item>
        <el-form-item style="text-align: center">
          <span id="inviteSpan"
            >邀请一个员工加入<strong>{{ teamInfo.name }}</strong></span
          >
        </el-form-item>
        <el-form-item>
          <el-input
            v-model.trim="searchName"
            @change="searchUser"
            width="400px"
            placeholder="请输入用户名或姓名"
            class="input-with-select"
          >
            <el-button
              slot="prepend"
              icon="el-icon-search"
              @click="searchUser"
            ></el-button>
          </el-input>
        </el-form-item>
        <el-form-item v-if="!empty">
          <el-table
            :show-header="false"
            row-key="wid"
            :cell-style="{ padding: '3px' }"
            :row-style="inviteStyle"
            :data="searchResult"
            max-height="300px"
            stripe
            style="width: 100%"
          >
            <el-table-column width="500">
              <template slot-scope="scope">
                <img
                  :src="computeUrl(scope.row.avatarUrl,scope.row.name?scope.row.name:scope.row.username)"
                  style="
                    width: 30px;
                    height: 30px;
                    border-radius: 15px;
                    position: relative;
                    top: 5px;
                  "
                />
                <span
                  style="margin-left: 20px; position: relative; top: -5px"
                  >{{
                    scope.row.name == ""
                      ? scope.row.username
                      : scope.row.name + "(" + scope.row.username + ")"
                  }}</span
                >
              </template>
            </el-table-column>
            <el-table-column align="right">
              <template slot-scope="scope">
                <el-button
                  :disabled="userChange"
                  type="primary"
                  size="mini"
                  style="width: 50px; padding-left: 12px"
                  @click="addEmp(scope.row.username, scope.row)"
                  >邀请</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
    </el-dialog>
</div>
</template>

<script>
import UploadDialogVue from '../UploadDialog/UploadDialog.vue';
export default {
  name:"TeamPage",
  data() {
    return {
      teamInfo: {},
      emps: [],
      curEmps: [],
      ceo: "",
      nameNew: "",
      placeNew: "",
      profileNew: "",
      searchMsg: "",
      select: "1",
      searchName: "",
      searchResult: [],
      isEdit: false,
      isAdd: false,
      isChange: false,
      isShowEdit:false,
      isBeginEdit:false,
      avatarUrl:'',
      empty: true,
      curUserName: "",
      curName: "",
      curImgUrl: "",
      curPost: "",
      curType: "",
      curWid: "",
      newPost: "",
      newType: Boolean,
      newWid: "",
      editChange: false,
      userChange: false,
      inviteUrl: require("@/assets/invite.png"),
      styleObject: [],
      tableStyle: {
        "font-size": "18px",
      },
      inviteStyle: {
        "font-size": "16px",
        height: "40px",
      },
    };
  },
  mounted() {
    this.baseInfoSearch();
  },
  methods: {
    computeUrl(url,name){
      if(name){
          if (/[\u4E00-\u9FA5\uFE30-\uFFA0]/.test(name)&&name.length>=2) {
              return url==''||!url?"https://ui-avatars.com/api/?size=512&&font-size=0.33&&background=0088fe&&name="+name.slice(-2):url
          }//包含中文且长度大于等于2
          return url==''||!url?"https://ui-avatars.com/api/?size=512&&font-size=0.33&&background=0088fe&&name="+name.slice(0,1):url
      }
      else
          return ''
    },
    mouseIn() {
      this.isShowEdit = true;
    },
    mouseOut() {
      this.isShowEdit = false;
    },
    beginEdit(){
      this.isBeginEdit = true
    },
    close(){
      this.isBeginEdit = false
    },
    updateUrl(url){
      this.teamInfo.avatarUrl = url
    },
    clearUserChange() {
      this.curUserName = "";
      this.curName = "";
      this.curImgUrl = "";
      this.curPost = "";
      this.curType = "";
      this.curWid = "";
      this.newPost = "";
      this.newType = null;
      this.newWid = "";
    },
    focused(target) {
      this.styleObject = new Array(3);
      this.styleObject.splice(target, 1, "focusStyle");
    },
    unfocused() {
      this.styleObject = new Array(3);
    },
    diffUser() {
      return (
        this.newPost == this.curPost &&
        this.newType == this.curType &&
        this.newWid == this.curWid
      );
    },
    handleEdit(username) {
      this.isEdit = true;
      this.emps.forEach((item) => {
        if (item.username == username) {
          this.curUserName = item.username;
          this.curName = item.name;
          this.curImgUrl = this.computeUrl(item.avatar_url,item.name);
          this.newPost = this.curPost = item.post;
          this.newType = this.curType = item.type;
          this.newWid = this.curWid = item.wid;
        }
      });
    },
    filterMethod() {
      this.curEmps = this.emps.filter((item) => {
        // 过滤职位
        if (this.select == 1) {
          return item.post.search(this.searchMsg) != -1;
        }
        // 过滤姓名
        else if (this.select == 2) {
          return item.name.search(this.searchMsg) != -1;
        }
        // 过滤工号
        else if (this.select == 3) {
          return item.wid.search(this.searchMsg) != -1;
        }
      });
    },
    diff() {
      return (
        this.nameNew == this.teamInfo.name &&
        this.placeNew == this.teamInfo.place &&
        this.profileNew == this.teamInfo.profile
      );
    },
    cancelAllChange() {
      this.nameNew = this.teamInfo.name;
      this.placeNew = this.teamInfo.place;
      this.profileNew = this.teamInfo.profile;
    },
    saveAllChange() {
      this.$http
        .put(
          "/teams/info",
          {
            name: this.nameNew,
            place: this.placeNew,
            profile: this.profileNew,
          },
          { timeout: 1000 }
        )
        .then((res) => {
          if (res.data.code == 1) {
            this.teamInfo.name = this.nameNew;
            this.teamInfo.place = this.placeNew;
            this.teamInfo.profile = this.profileNew;
            this.isChange = !this.diff();
            this.$message({
              message: "保存成功",
              type: "success",
            });
          } else {
            this.$message({
              message: res.data.msg,
              type: "error",
            });
            this.cancelAllChange();
          }
        })
        .catch(() => {
          this.$message({
            message: "服务器访问错误",
            type: "error",
          });
          this.cancelAllChange();
        });
    },
    baseInfoSearch() {
      // var res= {
      //   data:{
      //     data:{
      //       ceo:'胡桃',
      //       teamInfo:{
      //         avatarUrl:require('@/assets/cat.jpg'),
      //         tid:123456,
      //         place:'北京',
      //         name:'往生堂',
      //         profile:'往生堂是一家很好的公司'
      //       },
      //       emps:[
      //         {
      //         url:require('@/assets/cat.jpg'),
      //         name:'张三',
      //         username:'张三',
      //         post:'前端工程师',
      //         wid:123456789,
      //         type:0
      //       },
      //       {
      //         url:require('@/assets/cat.jpg'),
      //         name:'李四',
      //         username:'李四',
      //         post:'前端工程师',
      //         wid:123456789,
      //         type:0
      //       },
      //       {
      //         url:require('@/assets/cat.jpg'),
      //         name:'张三',
      //         username:'张三',
      //         post:'前端工程师',
      //         wid:123456789,
      //         type:0
      //       },
      //       {
      //         url:require('@/assets/cat.jpg'),
      //         name:'张三',
      //         username:'张三',
      //         post:'前端工程师',
      //         wid:123456789,
      //         type:1
      //       },
      //       {
      //         url:require('@/assets/cat.jpg'),
      //         name:'张三',
      //         username:'张三',
      //         post:'前端工程师',
      //         wid:123456789,
      //         type:0
      //       },
      //       {
      //         url:require('@/assets/cat.jpg'),
      //         name:'张三',
      //         username:'张三',
      //         post:'前端工程师',
      //         wid:123456789,
      //         type:0
      //       },
      //       {
      //         url:require('@/assets/cat.jpg'),
      //         name:'张三',
      //         username:'张三',
      //         post:'前端工程师',
      //         wid:123456789,
      //         type:0
      //       },
      //       {
      //         url:require('@/assets/cat.jpg'),
      //         name:'张三',
      //         username:'张三',
      //         post:'前端工程师',
      //         wid:123456789,
      //         type:0
      //       },
      //       {
      //         url:require('@/assets/cat.jpg'),
      //         name:'张三',
      //         username:'张三',
      //         post:'前端工程师',
      //         wid:123456789,
      //         type:0
      //       }],
      //     }
      //   }
      // }
      this.$http
        .get("/teams/info", { timeout: 3000 })
        .then((res) => {
          if (res.data.code == 1) {
            this.teamInfo = res.data.data.teamInfo;
            this.emps = res.data.data.emps;
            this.emps.forEach(item=>{
              if(item.name==''||!item.name){
                item.name = item.username
              }
            })
            this.ceo = res.data.data.founder;
            this.nameNew = this.teamInfo.name;
            this.profileNew = this.teamInfo.profile;
            this.placeNew = this.teamInfo.place;
            this.curEmps = this.emps;
          } else {
            this.$message({
              type: "error",
              message: res.data.msg,
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "服务器访问错误",
          });
        });
    },
    searchUser() {
      // var res = {
      //   data:{
      //     data:[{
      //       avatarUrl:require('@/assets/cat.jpg'),
      //       name:'张三',
      //       username:'1273698633',
      //     },
      //     {
      //       avatarUrl:require('@/assets/cat.jpg'),
      //       name:'',
      //       username:'31234567',
      //     },
      //     {
      //       avatarUrl:require('@/assets/cat.jpg'),
      //       name:'张三',
      //       username:'1273698633',
      //     }]
      //   }
      // }
      this.$http
        .get("/teams/user", {
          timeout: 1000,
          params: {
            name: this.searchName,
          },
        })
        .then((res) => {
          if (res.data.code == 1) {
            if(res.data.data==null)
              return
            this.empty = false;
            this.searchResult = res.data.data;
            this.searchResult.forEach(() => {
              this.searchResult.isDisabled = false;
            });
          } else {
            this.empty = true;
            this.searchResult = {};
            this.$message({
              type: "warning",
              message: res.data.msg,
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "服务器访问错误",
          });
        });
    },
    addEmp(username, row) {
      row.isDisabled = true;
      this.empty = true;
      this.empty = false;
      this.$http
        .post(
          "/teams/invites",
          { username: username, teamId: this.teamInfo.id },
          { timeout: 1000 }
        )
        .then((res) => {
          if (res.data.code == 1) {
            this.$message({
              type: "success",
              message: "已发送邀请",
            });
          } else {
            this.$message({
              type: "error",
              message: res.data.msg,
            });
            row.isDisabled = false;
            this.empty = true;
            this.empty = false;
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "服务器连接错误",
          });
          row.isDisabled = false;
          this.empty = true;
          this.empty = false;
        });
    },
    employeePut() {
      this.$http
        .put(
          "/teams/employee",
          {
            user: {
              username: this.curUserName,
              post: this.newPost,
              wid: this.newWid,
            },
            type: this.newType,
          },
          { timeout: 1000 }
        )
        .then((res) => {
          if (res.data.code == 1) {
            this.emps.forEach((item) => {
              if (item.username == this.curUserName) {
                item.post = this.newPost;
                item.wid = this.newWid;
                item.type = this.newType;
              }
            });
            this.isEdit = false;
            this.$message({
              message: "修改成功",
              type: "success",
            });
          } else {
            this.$message({
              message: res.data.msg,
              type: "error",
            });
          }
        })
        .catch(() => {
          this.$message({
            message: "服务器访问错误",
            type: "error",
          });
        });
    },
    employeeDelete(){
        this.$http
        .delete(
          "/teams/employee",
          {
            params:{
              username: this.curUserName,
            }
          },
          { timeout: 1000 }
        )
        .then((res) => {
          if (res.data.code == 1) {
            this.emps.forEach((item,index) => {
              if (item.username == this.curUserName) {
                this.emps.splice(index,1)
              }
            });
            this.isEdit = false;
            this.$message({
              message: "修改成功",
              type: "success",
            });
          } else {
            this.$message({
              message: res.data.msg,
              type: "error",
            });
          }
        })
        .catch(() => {
          this.$message({
            message: "服务器访问错误",
            type: "error",
          });
        });
    }
  },
  watch: {
    nameNew() {
      this.isChange = !this.diff();
    },
    placeNew() {
      this.isChange = !this.diff();
    },
    profileNew() {
      this.isChange = !this.diff();
    },
    newPost() {
      this.editChange = !this.diffUser();
    },
    newType() {
      this.editChange = !this.diffUser();
    },
    newWid() {
      this.editChange = !this.diffUser();
    },
    select(){
      this.filterMethod()
    },
    searchMsg(){
      this.filterMethod()
    }
  },
  computed:{
    computedTeamUrl(){
      if(this.teamInfo.name){
        if (/[\u4E00-\u9FA5\uFE30-\uFFA0]/.test(this.teamInfo.name)&&this.teamInfo.name.length>=2) {
            return this.teamInfo.avatarUrl==''||!this.teamInfo.avatarUrl?"https://ui-avatars.com/api/?size=512&&font-size=0.33&&background=f7f7f7&&name="+this.teamInfo.name.slice(-2):this.teamInfo.avatarUrl
        }//包含中文且长度大于等于2
        return this.teamInfo.avatarUrl==''||!this.teamInfo.avatarUrl?"https://ui-avatars.com/api/?size=512&&font-size=0.33&&background=f7f7f7&&name="+this.teamInfo.name.slice(0,1):this.teamInfo.avatarUrl
      }
      else
        return ''
    },
  },
  components:{
    UploadDialogVue
  }
};
</script>infoText

<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 10px;
}
.fontStyle {
  font-size: 25px;
}
.focusStyle {
  color: #409eff !important;
}
#teamPage {
  width: 100%;
  height: 100%;
  background-color: white; 
  border-radius: 5px;
  border-width: 3px;
}
#header {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 70px;
  background-color: rgb(250, 250, 250);
  border-radius: 5px 5px 0px 0px;
  border-width: 3px;
}
#teamAvatar {
  object-fit: cover;
  object-position: center;
  position: absolute;
  top: 10px;
  left: 60px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border-width: 0.5px;
  border-color: #797979;
  border-style: solid;
}
#header > h1 {
  position: absolute;
  top: 20px;
  left: 130px;
  width: 200px;
  height: 30px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  color: rgb(51, 51, 51);
}
#search {
  position: absolute;
  top: 15px;
  right: 200px;
  width: 600px;
  height: 30px;
}
#addEmp {
  position: absolute;
  top: 15px;
  right: 50px;
  width: 100px;
  height: 30px;
}
#mainFrame{
  display: flex;
  position: absolute;
  top: 70px;
  left: 0px;
  justify-content: space-around;
  width: 100%;
}
#baseInfo {
  background-color: white;
  width: 400px;
  height: 755px;
}
.infoText {
  color: rgb(102, 102, 102);
  position: absolute;
  left: 20px;
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
  left: 20px;
  width: 370px;
  height: 27px;
}
#timg {
  object-fit: cover;
  object-position: center;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 90px;
  height: 90px;
  border-radius: 5px;
  border-width: 2px;
  border-color: rgb(215, 215, 215);
  border-style: solid;
}
#avatarBox {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
  position: absolute;
  height: 95px;
  width: 120px;
  top: 10px;
  left: 160px;
}
#changeImg {
  position: absolute;
  top: 68px;
  left: 95px;
  height: 28px;
  width: 28px;
}
#changeImg:hover{
  cursor: pointer;
}
/deep/#tid {
  padding-left: 3px;
}
/deep/#tname {
  padding-left: 3px;
}
/deep/#place {
  padding-left: 3px;
}
/deep/#ceo {
  padding-left: 3px;
}
#searchBox {
  width: 905px;
  height: 755px;
  background-color: white;
}
/deep/#eprofile {
  padding-left: 3px;
  font-family: Arial;
}
#saveButton {
  position: absolute;
  left: 260px;
  top: 590px;
}
#cancelButton {
  position: absolute;
  left: 325px;
  top: 590px;
}
/deep/#inviteSpan {
  font-size: 28px !important;
}
/deep/.el-table__body-wrapper::-webkit-scrollbar {
  /*width: 0;宽度为0隐藏*/
  width: 4px;
}
/deep/.el-table__body-wrapper::-webkit-scrollbar-thumb {
  border-radius: 2px;
  height: 50px;
  background: rgba(0, 0, 0, 0.4);
}
/deep/.el-table__body-wrapper::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #eee;
  border-radius: 2px;
  background: #eee;
}

</style>
