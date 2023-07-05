<template>
  <div id="teamPage">
    <div id="header">
      <img src="@/assets/tea.png" id="teamAvatar" />
      <h1>阿帕茶特供店</h1>
      <div id="search">
        <el-input
          placeholder="请输入内容"
          v-model="searchMsg"
          class="input-with-select"
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
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div id="addEmp">
        <el-button @click="isAdd = true" type="primary" icon="el-icon-plus" circle></el-button>
      </div>
    </div>
    <div id="baseInfo">
      <div class="infoText" style="top: 35px">图标：</div>
      <img src="@/assets/tea.png" id="timg" />
      <div  class="infoText" style="top: 105px">团队号：</div>
      <div class="itemDiv" style="top: 130px">
        <el-input  disabled v-model="tid" id="tid" size="mini"></el-input>
      </div>
      <div :class="styleObject[0]" class="infoText" style="top: 175px">团队名：</div>
      <div class="itemDiv" style="top: 200px">
        <el-input @focus="focused(0)" v-model="nameNew" id="tname" size="mini"></el-input>
      </div>
      <div :class="styleObject[1]" class="infoText" style="top: 245px">办公地：</div>
      <div class="itemDiv" style="top: 270px">
        <el-input @focus="focused(1)" v-model="place" id="place" size="mini"></el-input>
      </div>
      <div class="infoText" style="top: 315px">CEO：</div>
      <div class="itemDiv" style="top: 340px">
        <el-input disabled v-model="ceo" id="ceo" size="mini"></el-input>
      </div>
      <div :class="styleObject[2]" class="infoText" style="top: 390px">简介：</div>
      <div class="itemDiv" style="left:13px;top: 415px">
        <el-input
          @focus="focused(2)"
          @blur="unfocused"
          maxlength="60"
          show-word-limit
          v-model="profile"
          id="eprofile"
          type="textarea"
          :rows="6"
          placeholder="请输入内容"
        ></el-input>
      </div>
    </div>
	<div id="searchBox">
		<el-table :row-style="tableStyle" :data="tableData" height="700" stripe style="width: 100%">
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
				@click="handleEdit(scope.row.wid)">编辑</el-button>
			</template>
			</el-table-column>
		</el-table>
	</div>
	<!-- 编辑对话框 -->
	<el-dialog title="区域修改" :visible.sync="isEdit">
		<el-table :data="gridData">
			<el-table-column property="date" label="日期" width="150"></el-table-column>
			<el-table-column property="name" label="姓名" width="200"></el-table-column>
			<el-table-column property="address" label="地址"></el-table-column>
		</el-table>
	</el-dialog>
	<!-- 添加对话框 -->
	<el-dialog title="区域修改" :visible.sync="isAdd">
		<el-table :data="gridData">
			<el-table-column property="date" label="日期" width="150"></el-table-column>
			<el-table-column property="name" label="姓名" width="200"></el-table-column>
			<el-table-column property="address" label="地址"></el-table-column>
		</el-table>
	</el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      team:null,
      emps:[],
      searchMsg: "",
      select: "1",
      tid: 6666666666666,
      nameNew: "阿帕茶特供店",
      place: "北京市海淀区",
      ceo: "胡桃",
      isEdit:false,
	    isAdd:false,
      styleObject: [],
      profile: "阿帕茶特供店是一家以茶叶为主的公司，主要经营茶叶的种植、加工、销售等业务。",
      tableData:[
      {
        url:require('@/assets/cat.jpg'),
        name:'张三',
        post:'前端工程师',
        wid:123456789,
        type:0
      },
      {
        url:require('@/assets/cat.jpg'),
        name:'李四',
        post:'前端工程师',
        wid:123456789,
        type:0
      },
      {
        url:require('@/assets/cat.jpg'),
        name:'张三',
        post:'前端工程师',
        wid:123456789,
        type:0
      },
      {
        url:require('@/assets/cat.jpg'),
        name:'张三',
        post:'前端工程师',
        wid:123456789,
        type:1
      },
      {
        url:require('@/assets/cat.jpg'),
        name:'张三',
        post:'前端工程师',
        wid:123456789,
        type:0
      },
      {
        url:require('@/assets/cat.jpg'),
        name:'张三',
        post:'前端工程师',
        wid:123456789,
        type:0
      },
      {
        url:require('@/assets/cat.jpg'),
        name:'张三',
        post:'前端工程师',
        wid:123456789,
        type:0
      },
      {
        url:require('@/assets/cat.jpg'),
        name:'张三',
        post:'前端工程师',
        wid:123456789,
        type:0
      },
      {
        url:require('@/assets/cat.jpg'),
        name:'张三',
        post:'前端工程师',
        wid:123456789,
        type:0
      }
      ],
      tableStyle:{
      'font-size': '18px'
      }
    };
  },
  methods:{
    focused(target){
        this.styleObject = new Array(3);
        this.styleObject.splice(target, 1, "focusStyle");
      },
      unfocused() {
        this.styleObject = new Array(3);
    },
    handleEdit(wid){
		    this.isEdit = true;
      	console.log(wid);
    },
    baseInfoSearch(){
        this.$http.get('/teams/info',{timeout:3000})
        .then(res=>{
          if(res.data.code==1){
            this.team = res.data.data.team;
            this.emps = res.data.data.emps;
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
    }
  }
};
</script>

<style lang="scss" scoped>
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
</style>
