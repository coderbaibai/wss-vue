<template>
  <div id="teamPage">
    <div id="header">
      <img :src="team.avatarUrl" id="teamAvatar" />
      <h1 style="position:relative;top:10px">阿帕茶特供店</h1>
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
          <el-button @click="filterMethod" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div id="addEmp">
        <el-button @click="isAdd = true" type="primary" icon="el-icon-plus" circle></el-button>
      </div>
    </div>
    <div id="baseInfo">
      <div id="saveButton" v-if="isChange"><el-button type="primary" size="small" @click="saveAllChange">保存</el-button></div>
      <div id="cancelButton" v-if="isChange"><el-button size="small" @click="cancelAllChange" >取消</el-button></div>
      <div class="infoText" style="top: 35px">图标：</div>
      <img :src="team.avatarUrl" id="timg" />
      <div  class="infoText" style="top: 105px">团队号：</div>
      <div class="itemDiv" style="top: 130px">
        <el-input  disabled v-model.trim="team.tid" id="tid" size="mini"></el-input>
      </div>
      <div :class="styleObject[0]" class="infoText" style="top: 175px">团队名：</div>
      <div class="itemDiv" style="top: 200px">
        <el-input @focus="focused(0)" v-model.trim="nameNew" id="tname" size="mini"></el-input>
      </div>
      <div :class="styleObject[1]" class="infoText" style="top: 245px">办公地：</div>
      <div class="itemDiv" style="top: 270px">
        <el-input @focus="focused(1)" v-model.trim="placeNew" id="place" size="mini"></el-input>
      </div>
      <div class="infoText" style="top: 315px">CEO：</div>
      <div class="itemDiv" style="top: 340px">
        <el-input disabled v-model.trim="ceo" id="ceo" size="mini"></el-input>
      </div>
      <div :class="styleObject[2]" class="infoText" style="top: 390px">简介：</div>
      <div class="itemDiv" style="left:13px;top: 415px">
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
		<el-table row-key="wid" :row-style="tableStyle" :data="curEmps" height="700" stripe style="width: 100%">
			<el-table-column label="姓名" width="200">
			<template slot-scope="scope">
				<img :src="scope.row.url" style="width:50px;height:50px;border-radius:25px;position:relative;top:5px">
				<span style="margin-left: 20px;position:relative;top:-16px">{{ scope.row.name }}</span>
			</template>
			</el-table-column>
			<el-table-column prop="post" label="职位" width="200">
			</el-table-column>
			<el-table-column prop="wid" label="工号"> 
			</el-table-column>
			<el-table-column align="center" label="是否为管理员"> 
			<template slot-scope="scope">
				<span>{{ scope.row.type===1?'是':'否' }}</span>
			</template>
			</el-table-column>
			<el-table-column align="center" label="操作">
			<template slot-scope="scope">
				<el-button
				size="mini"
        type="primary"
				@click="handleEdit(scope.row.username)">编辑</el-button>
			</template>
			</el-table-column>
		</el-table>
	</div>
	<!-- 编辑对话框 -->
	<el-dialog @closed="clearUserChange()" title="员工管理" :visible.sync="isEdit">
    <el-form>
      <el-form-item>
        <el-col :span="3" style="text-align:center"><img :src="curImgUrl" style="width:60px;height:60px;border-radius:30px;position:relative;top:10px"></el-col>
        <el-col :span="5"><h1>{{curName}}</h1></el-col>
      </el-form-item>
      <el-form-item label="职位" :label-width="formLabelWidth">
        <el-input v-model="newPost"></el-input>
      </el-form-item>
      <el-form-item label="工号" :label-width="formLabelWidth">
        <el-input v-model="newWid"></el-input>
      </el-form-item>
      <el-form-item label="是否为管理员" :label-width="formLabelWidth">
        <el-radio-group v-model="newType">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button :disabled="!editChange" @click="employeePut" type="primary">保存</el-button>
      <el-button @click="isEdit = false">取消</el-button>
      <el-button type="danger">辞退</el-button>
    </div>
	</el-dialog>
	<!-- 添加对话框 -->
	<el-dialog @closed="searchName='';empty = true" width='450px' :visible.sync="isAdd">
    <el-form>
      <el-form-item style="text-align: center;margin-bottom:0px">
        <img :src="inviteUrl" alt="" height="40px" width="40px">
      </el-form-item>
      <el-form-item style="text-align: center">
        <span id="inviteSpan">邀请一个员工加入<strong>{{team.name}}</strong></span>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchName" @change="searchUser" width='400px' placeholder="请输入用户名或姓名" class="input-with-select">
          <el-button slot="prepend" icon="el-icon-search" @click="searchUser"></el-button>
        </el-input>
      </el-form-item>
      <el-form-item v-if="!empty">
      <el-table :show-header='false' row-key="wid" :cell-style="{padding: '3px'}"
 :row-style="inviteStyle" :data="searchResult" height="100px" stripe style="width: 100%">
        <el-table-column width="300">
        <template slot-scope="scope">
          <img :src="scope.row.avatarUrl" style="width:30px;height:30px;border-radius:15px;position:relative;top:5px">
          <span style="margin-left: 20px;position:relative;top:-5px">{{ scope.row.name==''?scope.row.username:(scope.row.name+'('+scope.row.username+')') }}</span>
        </template>
        </el-table-column>
			  <el-table-column align="right">
          <template slot-scope="scope">
          <el-button :disabled="userChange" type="primary" size="mini" style="width:50px;padding-left:12px" @click="addEmp(scope.row.username,scope.row)">邀请</el-button>
          </template>
        </el-table-column>
		  </el-table>
      </el-form-item>
    </el-form>
	</el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      team:null,
      emps:[],
      curEmps:[],
      ceo:'',
      nameNew: "",
      placeNew: "",
      profileNew:"",
      searchMsg: "",
      select: null,
      searchName:'',
      searchResult:[],
      isEdit:false,
	    isAdd:false,
      isChange: false,
      empty:true,
      curUserName:'',
      curName:'',
      curImgUrl:'',
      curPost:'',
      curType:'',
      curWid:'',
      newPost:'',
      newType:'',
      newWid:'',
      editChange:false,
      userChange:false,
      inviteUrl:require('@/assets/invite.png'),
      styleObject: [],
      tableStyle:{
        'font-size': '18px'
      },
      inviteStyle:{
        'font-size': '16px',
        "height":"40px"
      }
    };
  },
  beforeMount(){
    this.baseInfoSearch()
  },
  methods:{
    clearUserChange(){
      this.curUserName=''
      this.curName=''
      this.curImgUrl=''
      this.curPost=''
      this.curType=''
      this.curWid=''
      this.newPost=''
      this.newType=''
      this.newWid=''
    },
    focused(target){
        this.styleObject = new Array(3);
        this.styleObject.splice(target, 1, "focusStyle");
      },
      unfocused() {
        this.styleObject = new Array(3);
    },
    diffUser(){
      return this.newPost === this.curPost&&
            this.newType === this.curType&&
            this.newWid === this.curWid
    },
    handleEdit(username){
		    this.isEdit = true;
        this.emps.forEach(item=>{
          if(item.username==username){
            this.curUserName = item.username
            this.curName = item.name==''?item.username:item.name
            this.curImgUrl = item.url
            this.newPost = this.curPost = item.post
            this.newType = this.curType = item.type
            this.newWid = this.curWid = item.wid
          }
        })
    },
    filterMethod(){
      this.curEmps = this.emps.filter((item)=>{
        // 过滤职位
        if(this.select==1){
          return item.post.search(this.searchMsg)!=-1
        }
        // 过滤姓名
        else if(this.select==2){
          return item.name.search(this.searchMsg)!=-1
        }
        // 过滤工号
        else if(this.select==3){
          return item.wid.search(this.searchMsg)!=-1
        }
      })
    },
    diff(){
      return this.nameNew === this.team.name&&
        this.placeNew === this.team.place&&
        this.profileNew === this.team.profile
    },
    cancelAllChange(){
      this.nameNew = this.team.name
      this.placeNew = this.team.place
      this.profileNew = this.team.profile
    },
    saveAllChange(){
      this.$http.put('/teams/info',{name:this.nameNew,place:this.placeNew,profile:this.profileNew},{timeout:1000})
            .then((res)=>{
                if(res.data.code==1){
                    this.team.name = this.nameNew
                    this.team.gender = this.placeNew
                    this.team.profile = this.profileNew
                    this.diff()
                    this.$message({
                        message:"保存成功",
                        type:"success"
                    })
                }
                else{
                    this.$message({
                        message:res.data.msg,
                        type:"error"
                    })
                    this.cancelAllChange()
                }
            })
            .catch(()=>{
                this.$message({
                    message:'服务器访问错误',
                    type:"error"
                })
                this.cancelAllChange()
            })
    },
    baseInfoSearch(){
      // var res= {
      //   data:{
      //     data:{
      //       ceo:'胡桃',
      //       team:{
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
        this.$http.get('/teams/info',{timeout:3000})
        .then(res=>{
          if(res.data.code==1){
            this.team = res.data.data.team;
            this.emps = res.data.data.emps;
            this.ceo = res.data.data.ceo;
            this.nameNew = this.team.name;
            this.profileNew = this.team.profile
            this.placeNew = this.team.place
            this.curEmps = this.emps
          }
          else{
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
        })
        .catch(()=>{
          this.$message({
            type:'error',
            message:'服务器访问错误'
          })
        })
    },
    searchUser(){
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
      this.$http.get('/teams/user',{timeout:1000,params:{
        name:this.searchName
      }})
      .then(res=>{
        if(res.data.code==1){
          this.empty = false;
          this.searchResult = res.data.data;
          this.searchResult.forEach(()=>{
            this.searchResult.isDisabled = false;
          })
        }
        else{
          this.$message({
            type:'error',
            message:res.data.msg
          })
        }
      })
      .catch(()=>{
          this.$message({
            type:'error',
            message:'服务器访问错误'
          })
      })
    },
    addEmp(username,row){
      row.isDisabled = true;
      this.empty = true;
      this.empty = false;
      this.$http.post('/teams/invites',{username:username,teamId:this.team.tid},{timeout:1000})
      .then(res=>{
        if(res.data.code==1){
          this.$message({
            type:'success',
            message:'已发送邀请'
          })
        }
        else{
          this.$message({
            type:'error',
            message:res.data.msg
          })
          row.isDisabled = false;
          this.empty = true;
          this.empty = false;
        }
      })
      .catch(()=>{
          this.$message({
            type:'error',
            message:"服务器连接错误"
          })
          row.isDisabled = false;
          this.empty = true;
          this.empty = false;
      })
    },
    employeePut(){
      this.$http.put('/teams/info',{
      user:{
        username:this.curUserName,
        post:this.newPost,
        wid:this.newWid
      },
      type:this.newType},{timeout:1000})
      .then((res)=>{
          if(res.data.code==1){
              this.emps.forEach((item)=>{
                if(item.username==this.curUserName){
                  item.post = this.newPost
                  item.wid = this.newWid
                  item.type = this.newType
                }
              })
              this.isEdit = false
              this.$message({
                  message:"修改成功",
                  type:"success"
              })
          }
          else{
              this.$message({
                  message:res.data.msg,
                  type:"error"
              })
          }
      })
      .catch(()=>{
          this.$message({
              message:'服务器访问错误',
              type:"error"
          })
      })
    }
  },
  watch:{
    nameNew(){
      this.isChange = !this.diff()
    },
    placeNew(){
      this.isChange = !this.diff()
    },
    profileNew(){
      this.isChange = !this.diff()
    },
    newPost(){
      this.editChange = !this.diffUser()
    },
    newType(){
      this.editChange = !this.diffUser()
    },
    newWid(){
      this.editChange = !this.diffUser()
    },
  }
};
</script>

<style lang="scss" scoped>
.el-form-item{
    margin-bottom: 10px;
}
.fontStyle{
	font-size: 25px;
}
.focusStyle{
  color: #409eff !important;
}
#teamPage {
  position: absolute;
  top: 30px;
  left: 235px;
  width: 1300px;
  height: 825px;
  /* background-color: white; */
  border-radius: 5px;
  border-width: 3px;
}
#header {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 1306px;
  height: 70px;
  background-color: rgb(250, 250, 250);
  border-radius: 5px 5px 0px 0px;
  border-width: 3px;
}
#teamAvatar {
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
  left: 500px;
  width: 600px;
  height: 30px;
}
#addEmp {
  position: absolute;
  top: 15px;
  left: 1125px;
  width: 100px;
  height: 30px;
}
#baseInfo {
  background-color: white;
  position: absolute;
  top: 70px;
  left: 0px;
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
  position: absolute;
  top: 10px;
  left: 160px;
  width: 90px;
  height: 90px;
  border-radius: 5px;
  border-width: 2px;
  border-color: rgb(215, 215, 215);
  border-style: solid;
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
#searchBox{
	position: absolute;
	top: 70px;
	left: 400px;
	width: 905px;
	height: 755px;
	background-color: white;
}
/deep/#eprofile{
    padding-left: 3px;
    font-family: Arial;
}
#saveButton{
  position: absolute;
  left: 260px;
  top: 590px;
}
#cancelButton{
  position: absolute;
  left: 325px;
  top: 590px;
}
/deep/#inviteSpan{
  font-size: 28px !important;
}
/deep/.el-table__body-wrapper::-webkit-scrollbar{
    /*width: 0;宽度为0隐藏*/
  width: 4px;
}
/deep/.el-table__body-wrapper::-webkit-scrollbar-thumb{
  border-radius: 2px;
  height: 50px;
  background: rgba(0, 0, 0,0.4);
}
/deep/.el-table__body-wrapper::-webkit-scrollbar-track{
  box-shadow: inset 0 0 5px #eee;
  border-radius: 2px;
  background: #eee;
}
</style>
