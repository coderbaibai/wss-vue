<template>
<div>
    <div id="UserPage">
        <div id="UserAvatarDiv"><UserAvatarVue @updateUrl="updateUrl" :url="computedUrl"/></div>
        <div id="UsernameTextDiv"><UsernameTextVue :name="userInfo.name" @changeName="saveName" ref="name"/></div>
        <div id="InfoBoxDiv"><InfoBoxVue v-if="someShow" :userInfo="userInfo" @save="saveInfoBox" ref="infoBox"/><ReservationBoxVue :inCompany="inCompany" :reservations="reservations" @changeStatus="changeStatus" @renewReservation="renewReservation" @addTeam="searchTeam"/></div>
    </div>
    <el-dialog :visible.sync="isAdd" id="teamDialog" title="我的团队">   
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">加入团队</el-menu-item>
        <el-menu-item index="2">创建团队</el-menu-item>
        </el-menu>
		<el-table v-if="activeIndex=='1'" :data="teams">
			<el-table-column align="center" property="name" label="团队名" width="250">
                <template slot-scope="scope">
				    <img :src="scope.row.image" style="width:30px;height:30px;border-radius:15px;position:relative;top:3px">
				    <span style="margin-left: 20px;position:relative;top:-7px">{{ scope.row.name }}</span>
			    </template>
            </el-table-column>
			<el-table-column align="center" property="id" label="团队id" width="350"></el-table-column>
			<el-table-column align="center" label="是否加入">
                <template slot-scope="scope">
                <el-button type="primary" size="mini" style="width:50px;padding-left:12px" @click="joinTeam(Number(scope.row.id))">加入</el-button>
                <el-button type="danger" plain size="mini" style="width:50px;padding-left:12px" @click="refuseTeam(Number(scope.row.id))">拒绝</el-button>
                </template>
            </el-table-column>
		</el-table>
        <el-form v-if="activeIndex=='2'">
            <el-form-item label="团队名">
                <el-input v-model="newTeamName"></el-input>
            </el-form-item>
        </el-form>
        <div v-if="activeIndex=='2'" slot="footer">
            <el-button @click="createTeam" type="primary">创建</el-button>
            <el-button @click="cancelCreate">取消</el-button>
        </div>
	</el-dialog>
    <el-dialog v-if="reservations[0]" title="续约" :visible.sync="isRenew" width="800px">
        <el-form>
		<el-form-item label="请选择续约时间：">
            <el-col :span="7"> 
                <el-time-select
                    style="width:100%"
                    placeholder="起始时间"
                    v-model="reservations[0].startTime"
                    disabled>
                </el-time-select>
            </el-col>
            <el-col :span="1" style="text-align:center">-</el-col>
            <el-col :span="7">
                <el-time-select
                    style="width:100%"
                    placeholder="结束时间"
                    v-model="currentEndTime"
                    :picker-options="{
                    start: currentEndTime,
                    step: '00:30',
                    end: this.endTime
                    }"
                    >
                </el-time-select>
            </el-col>
        </el-form-item>
        </el-form>
        <div slot="footer">
                <el-button @click="renewPut" type="primary">保存</el-button>
                <el-button @click="isRenew = false">取消</el-button>
        </div>
	</el-dialog>
</div>
</template>

<script>
import InfoBoxVue from './InfoBox.vue'
import ReservationBoxVue from './ReservationBox.vue'
import UserAvatarVue from './UserAvatar.vue'
import UsernameTextVue from './NameText.vue'
export default {
    name:"UserPage",
    data(){
        return{
            isAdd:false,
            isRenew:false,
            endTime:'18:30',
            teams:null,
            currentEndTime:'',
            userInfo:{},
            reservations:[],
            activeIndex:'1',
            newTeamName:'',
            someShow:true
        }
    },
    mounted(){
        this.$http.get('/users/info',{timeout:3000})
        .then(res=>{
            if(res.data.code==1){
                this.userInfo = res.data.data.userInfo
                this.reservations = res.data.data.reservations
                this.initReservations();
                if(this.reservations[0])
                    this.currentEndTime=this.reservations[0].endTime
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
                message:"服务器访问错误",
                type:"error"
            })
        })
    },
    methods:{
        initReservations(){
            this.reservations.forEach(item=>{
                if(item.endTime=="00:00")
                    item.endTime = "24:00"
                item.druation = item.date+' '+item.startTime+'-'+item.endTime
                item.status = this.transStatus(item.status)
            })
        },
        transStatus(status){
            switch(status){
                case 0:
                    return '已预约'
                case 1:
                    return '进行中'
                case 2:
                    return '已完成'
                case 3:
                    return '已违约'
                case 4:
                    return '已结束'
            }
        },
        handleSelect(key){
            this.activeIndex = key
        },
        createTeam(){
            this.$http.post('/users/team',{name:this.newTeamName},{timeout:1000})
            .then((res)=>{
                if(res.data.code==1){
                    this.$message({
                        message:"创建成功,重新登录以进行团队管理",
                        type:"success"
                    })
                    this.isAdd = false
                    this.newTeamName = ''
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
                    message:"服务器访问错误",
                    type:"error"
                })
            })
        },
        cancelCreate(){
            this.newTeamName = ''
            this.isAdd = false
        },
        saveInfoBox(username,gender,profile){
            this.$http.put('/users/info',{username:username,gender:gender,profile:profile},{timeout:1000})
            .then((res)=>{
                if(res.data.code==1){
                    this.userInfo.username = username
                    this.userInfo.gender = gender
                    this.userInfo.profile = profile
                    this.someShow = false
                    this.someShow = true
                    this.$refs.infoBox.successfulSave()
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
                    this.$refs.infoBox.cancelAllChange()
                }
            })
            .catch(()=>{
                this.$message({
                    message:'服务器访问错误',
                    type:"error"
                })
                this.$refs.infoBox.cancelAllChange()
            })
        },
        saveName(newName){
            this.$http.put('/users/name',{name:newName},{timeout:1000})
            .then((res)=>{
                if(res.data.code==1){
                    this.userInfo.name = newName
                    this.$message({
                        message:"保存成功",
                        type:"success"
                    })
                    this.$emit('changeName',newName)
                }
                else{
                    this.$message({
                        message:res.data.msg,
                        type:"error"
                    })
                    this.$refs.name.cancelAllChange()
                }
            })
            .catch(()=>{
                this.$message({
                    message:'服务器访问错误',
                    type:"error"
                })
                this.$refs.name.cancelAllChange()
            })
        },
        renewReservation(endTime){
            this.isRenew = true
            this.endTime = endTime
        },
        renewPut(){
            this.$http.put('/users/renew',{endTime:this.currentEndTime},{timeout:1000})
            .then(e=>{
                    if(e.data.code==1){
                        this.$message({
                            message: '续约成功',
                            type: 'success'
                        });
                        this.isRenew = false
                    }
                    else{
                        this.$message({
                            message:e.data.msg,
                            type: 'error'
                        });
                        this.currentEndTime = this.reservations[0].endTime
                        this.isRenew = false
                    }
                })
                .catch(()=>{
                    this.$message({
                        message: '服务器访问错误',
                        type: 'error'
                    });
                    this.currentEndTime = this.reservations[0].endTime
                    this.isRenew = false
                })
        },
        changeStatus(e){
            this.reservations[0].status = this.transStatus(e)
        },
        searchTeam(){
            this.isAdd = true
            this.$http.get('/users/invites',{timeout:1000})
            .then(e=>{
                if(e.data.code==1){
                    this.teams = e.data.data
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
        joinTeam(tid){
            this.$http.post('/users/invites',{id:tid},{timeout:1000})
            .then(e=>{
                if(e.data.code==1){
                    this.$message({
                        message:'成功加入团队',
                        type: 'success'
                    });
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
        refuseTeam(tid){
            this.$http.delete('/users/invites',{data:{id:tid},timeout:1000})
            .then(e=>{
                if(e.data.code==1){
                    this.$message({
                        message:'已拒绝',
                        type: 'success'
                    });
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
        updateUrl(url){
          this.userInfo.url = url
          this.$emit('changeUrl',url)
        }
    },
    computed:{
        computedUrl(){
            if(this.userInfo.name){
                if (/[\u4E00-\u9FA5\uFE30-\uFFA0]/.test(this.userInfo.name)&&this.userInfo.name.length>=2) {
                    return this.userInfo.url==''||!this.userInfo.url?"https://ui-avatars.com/api/?size=512&&font-size=0.33&&background=random&&name="+this.userInfo.name.slice(-2):this.userInfo.url
                }//包含中文且长度大于等于2
                return this.userInfo.url==''||!this.userInfo.url?"https://ui-avatars.com/api/?size=512&&font-size=0.33&&background=random&&name="+this.userInfo.name.slice(0,1):this.userInfo.url
            }
            else
                return ''
        },
        inCompany(){
            if(this.userInfo.team!=""&&this.userInfo.team!=undefined&&this.userInfo.team!=null)
                return true
            else{
                return false
            }
        }
  },
    components:{
        InfoBoxVue,
        ReservationBoxVue,
        UserAvatarVue,
        UsernameTextVue
    }
}
</script>

<style lang="scss" scoped>
#UserPage{
    width: 100%;
    height: 100%;
    min-height: 800px;
    background-color: white;
    border-radius: 5px;
    border-width: 3px;
}
#UserAvatarDiv{
    position:absolute;
    left:123px;
    top: 39px;
}
#UsernameTextDiv{
    position:absolute;
    left:368px;
    top: 129px;
}
#InfoBoxDiv{
    position:absolute;
    left:26px;
    top: 239px;
    width: calc(100% - 26px);
    width:-webkit-calc(100% - 26px);
    width:-moz-calc(100% - 26px);
    display: flex;
    justify-content: start;
}
#ReservationBoxDiv{
    position:absolute;
    left:359px;
    top: 241px;
}
/deep/#teamDialog .el-dialog__body{
    padding-top: 10px;
}
</style>