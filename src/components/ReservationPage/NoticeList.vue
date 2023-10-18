<template>
  <div id="noticeList">
    <div id="headName">公告信息</div>
    <div id="reservation">{{announcement}}</div>
    <i class="el-icon-edit" id="edit" @click="beginEdit"></i>
    <el-dialog title="修改公告" :visible.sync="isEdit" @close="announcementClose">
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        maxlength="350"
        show-word-limit
        v-model="curAnnouncement">
      </el-input>
      <div slot="footer">
        <el-button type="primary" @click="changeAnnouncement">确认</el-button>
        <el-button @click="isEdit = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return{
      announcement:'',
      isEdit :false,
      curAnnouncement:''
    }
  },
  mounted(){
    this.$http.get("/teams/announcement")
    .then((res)=>{
      if(res.data.code==1){
        this.announcement = res.data.data
      }
      else{
        this.$message.error(res.data.msg)
      }
    })
    .catch(e=>{
      this.$message.error("服务器访问异常")
    })
  },
  methods:{
    beginEdit(){
      this.isEdit = true
      this.curAnnouncement = this.announcement
    },
    announcementClose(){
      this.curAnnouncement = ''
    },
    changeAnnouncement(){
      this.$http.post("/teams/announcement",{announcement:this.announcement})
      .then((res)=>{
        if(res.data.code==1){
          this.announcement = this.curAnnouncement
          this.isEdit = false
        }
        else{
          this.$message.error(res.data.msg)
        }
      })
      .catch(e=>{
        this.$message.error("服务器访问异常")
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#noticeList{
  position: relative;
    width: 100%;
    height: 100%;
}
#headName {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 1px;
  height: 32px;
  width: 326px;
  font-family: microsoft yahei;
  line-height: 29px;
  font-size: 12px;
  color: rgb(102, 102, 102);
  background-color: rgb(249, 249, 249);
  outline: 1px solid rgb(235, 235, 235);
  padding: 2px 16px 2px 24px;
}
#reservation{
  position:absolute;
  top: 40px;
  left: 10px;
  width: 300px;
  color: rgb(102, 102, 102);
  white-space: pre-wrap;
}
/deep/#edit{
  position: absolute;
  font-size: 22px;
  right: 19px;
  top: 4.5px;
  color: rgb(64, 158, 255);
}
#edit:hover{
  cursor: pointer;
}
</style>