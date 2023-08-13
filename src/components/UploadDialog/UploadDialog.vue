<template>
  <el-dialog @closed="cancel" :visible.sync="innerIsEdit" title="上传头像" width="40%">
      <div>
        <el-upload
          class="avatar-uploader"
          :action="pre+target+suf"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-error="handleAvatarError"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" style="object-fit: cover;object-position: center;">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div slot="footer">
        <el-button @click="change" type="primary" :disabled="!imageUrl">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-dialog>
</template>

<script>
export default {
    data(){
        return{
            imageUrl:'',
            isSave:false,
            innerIsEdit:false,
            pre:'http://localhost:8080/api/',
            suf:'/image',
        }
    },
    props:{
        isEdit:{
            type:Boolean,
            default:false
        },
        target:{
            type:String,
            default:'#'
        }
    },
    methods:{
        handleAvatarSuccess(res) {
            if(res.code==1){
            this.imageUrl = res.data
            }
            else{
            this.$message.error('图片上传失败')
            return
            }
        },
        handleAvatarError(res){
        this.$message.error(res.msg)
        },
        beforeAvatarUpload(file) {
        const isTypeOk = file.type === 'image/jpeg'||file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 4;
        if (!isTypeOk){
            this.$message.error('上传头像图片格式应为jpg或png');
        }
        if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 4MB!');
        }
        return isTypeOk && isLt2M;
        },
        async change(){
            await this.$http.put("/"+this.target+this.suf,{avatarUrl:this.imageUrl},{timeout:1000})
            .then((res)=>{
                if(res.data.code!=1)
                this.$message.error(res.data.msg)
                else
                this.$message.success("保存成功")
            })
            .catch(()=>{
                this.$message.error("服务器访问错误")
            })
            this.isSave = true;
            this.$emit("updateUrl",this.imageUrl)
            this.imageUrl = ""
            this.$emit("close")
        },
        async cancel(){
            if(this.imageUrl==""){
                this.$emit("close")
                return
            }
            await this.$http.get("/"+this.target+this.suf+"?url="+this.imageUrl,{timeout:1000})
            .then((res)=>{
                if(res.data.code!=1)
                this.$message.error(res.data.msg)
                this.$emit("close")
            })
            .catch(()=>{
                this.$message.error("服务器访问错误")
            })
            this.imageUrl = ""
            if(this.isSave){
                this.isSave = false
                return
            }
        }
    },
    watch:{
        isEdit(value){
            if(this.innerIsEdit!=value)
                this.innerIsEdit = value;
        },
        innerIsEdit(value){
            if(value==false)
                this.$emit("close")
        }
    }
}
</script>

<style lang="scss" scoped>
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
/deep/.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
/deep/.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>