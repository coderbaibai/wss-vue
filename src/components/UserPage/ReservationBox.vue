<template>
  <div id="reservationBox" @mouseenter="isFocus = true" @mouseleave="isFocus = false">
	<div id="topItems">
	  <div id="record" :class="{'focusHighlight':isFocus}">预约记录</div>
	  <div class="iconItem" id="login">
		<el-button @click="check" class="eiconItem" type="primary" plain>签</el-button>
	  </div>
	  <div class="iconItem" id="leave">
		<el-button class="eiconItem" type="warning" plain>离</el-button>
	  </div>
	  <div class="iconItem" id="renew">
		<el-button @click="renewGet" class="eiconItem" type="success" plain>续</el-button>
	  </div>
	  <div class="iconItem" id="abandon">
		<el-button @click="leave" class="eiconItem" type="danger" plain>弃</el-button>
	  </div>
	  <div class="iconItem" id="logout">
		<el-button @click="logout" class="eiconItem" type="info" plain>销</el-button>
	  </div>
	  <div class="iconItem" id="add">
		<el-button id="addItem" class="eiconItem" plain @click="addTeam"></el-button
		><img id="addImg" src="../../assets/add.svg" />
	  </div>
	</div>
	<div id="bottomItems">
	  <el-table :data="reservations" height="470" stripe style="width: 100%">
		<el-table-column prop="workstation" label="地点" width="220">
		</el-table-column>
		<el-table-column prop="druation" label="预约时间" width="400">
		</el-table-column>
		<el-table-column prop="status" label="状态"> </el-table-column>
	  </el-table>
	</div>
  </div>
</template>

<script>
export default {
  data() {
	return {
	  isFocus:false,
	  tableData: [
		{
		  place: "明学楼2F301",
		  druation: "2020-12-12 12:00-18:00",
		  status: "已履约",
		},
		{
		  place: "明学楼2F301",
		  druation: "2020-12-12 12:00-18:00",
		  status: "已履约",
		},
		{
		  place: "明学楼2F301",
		  druation: "2020-12-12 12:00-18:00",
		  status: "已履约",
		},
		{
		  place: "明学楼2F301",
		  druation: "2020-12-12 12:00-18:00",
		  status: "已履约",
		},
		{
		  place: "明学楼2F301",
		  druation: "2020-12-12 12:00-18:00",
		  status: "已履约",
		},
		{
		  place: "明学楼2F301",
		  druation: "2020-12-12 12:00-18:00",
		  status: "已履约",
		},
		{
		  place: "明学楼2F301",
		  druation: "2020-12-12 12:00-18:00",
		  status: "已履约",
		},
		{
		  place: "明学楼2F301",
		  druation: "2020-12-12 12:00-18:00",
		  status: "已履约",
		},
		{
		  place: "明学楼2F301",
		  druation: "2020-12-12 12:00-18:00",
		  status: "已履约",
		},
		{
		  place: "明学楼2F301",
		  druation: "2020-12-12 12:00-18:00",
		  status: "已履约",
		},
		{
		  place: "明学楼2F301",
		  druation: "2020-12-12 12:00-18:00",
		  status: "已履约",
		},
		{
		  place: "明学楼2F301",
		  druation: "2020-12-12 12:00-18:00",
		  status: "已履约",
		},
	  ],
	};
  },
  methods:{
	addTeam(){
	  this.$emit('addTeam')
	},
	check(){
	  this.$http.put('/users/check',{},{timeout:1000})
	  .then(e=>{
		if(e.data.code==1){
		  this.$message({
			message: '签到成功',
			type: 'success'
		  });
		  this.$emit('changeStatus')
		}
		else{
		  this.$message({
			message: e.data.msg,
			type: 'error'
		  });
		}
	  })
	  .catch(()=>{
		  this.$message({
			message: '服务器访问错误',
			type: 'error'
		  });
	  })
	},
	renewGet(){
	  this.$http.get('/users/renew',{timeout:1000})
	  .then(e=>{
		if(e.data.code==1){
		  this.$emit('renewReservation',e.data.data.endTime)
		}
		else{
		  this.$message({
			message:e.data.msg,
			type: 'error'
		  });
		}
	  })
	  .catch(()=>{
		  this.$message({
			message: '服务器访问错误',
			type: 'error'
		  });
	  })
	},
	leave(){
		this.$http.put('/users/leave',null,{timeout:1000})
		.then(res=>{
			if(res.data.code==1){
				this.$message({
					message: '已结束使用',
					type: 'success'
				});
			}
			else{
				this.$message({
					message: res.data.msg,
					type: 'error'
				});
			}
		})
		.catch(()=>{
			this.$message({
				message: "服务器访问错误",
				type: 'error'
			});
		})
	},
	logout(){
	  	this.$http.delete('/users/logout',{timeout:1000})
		this.$message({
			message: '已退出登录',
			type: 'success'
		});
	  	this.$emit('logout')
	}
  },
  props:{
	reservations:Array
  }
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.focusHighlight{
  color: #409eff !important ;
  background-color: rgb(236, 245, 255) !important;
  border-bottom: 3px solid #409eff !important;
}
#reservationBox {
  background-color: white;
  position: relative;
  width: 853px;
  height: 530px;
}
#topItems {
  position: absolute;
  top: 0;
  left: 0;
  width: 853px;
  height: 40px;
  background-color: white;
}
#record {
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
#record:hover {
  color: #409eff;
  background-color: rgb(236, 245, 255);
  border-bottom: 3px solid #409eff;
}
.iconItem {
  position: absolute;
  top: 0;
  width: 40px;
  height: 40px;
}
#login {
  left: 113px;
}
.eiconItem {
  width: 40px;
  height: 40px;
}
#leave {
  left: 158px;
}
#renew {
  left: 203px;
}
#abandon {
  left: 248px;
}
#logout {
  left: 293px;
}
#add {
  left: 338px;
}
#addItem {
  height: 40px;
}
#addImg {
  position: absolute;
  z-index: 1;
  left: 8.5px;
  top: 8.5px;
  width: 23px;
  height: 23px;
  pointer-events: none;
}
#bottomItems {
  position: absolute;
  top: 50px;
  left: 20px;
  width: 833px;
  height: 470px;
}
/deep/.el-table__body-wrapper::-webkit-scrollbar{
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
