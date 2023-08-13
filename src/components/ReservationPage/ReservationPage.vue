<template>
<div>
    <div id="reservationPage">
        <div id="mainWindow">
            <div id="statusItems">
                <div class="statusItem">
                    <StatusItemVue busy />
                </div>
                <div class="statusItem">
                    <StatusItemVue free />
                </div>
                <div class="statusItem">
                    <StatusItemVue reserved />
                </div>
                <div class="statusItem">
                    <StatusItemVue allocated />
                </div>
                <div class="statusItem" style="margin-right:0">
                    <StatusItemVue error />
                </div>
            </div>
            <div id="mw">
                <MainWindowVue @reserveWorkPlace="reserveWorkPlace" />
            </div>
        </div>
        <div id="nl">
            <NoticeListVue/>
        </div>
    </div>
        <el-dialog title="预约工位" :visible.sync="isReserved">
            <el-form :inline="true" :model="reservation" class="demo-form-inline" label-position="top">
                <el-row :gutter="10">
                    <el-col :span="10"><el-form-item label="用户id">
                            <!-- <el-input v-model="a" placeholder="用户id" clearable  disabled/> -->
                            <el-text class="mx-1">{{ reservation.userId }}</el-text>
                        </el-form-item></el-col>
                    <el-col :span="10"><el-form-item label="预约日期">
                            <el-date-picker v-model="reservation.date" type="date" placeholder="Pick a date" clearable />
                        </el-form-item></el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="10"><el-time-select v-model="reservation.startTime" :max-time="endTime" class="mr-4"
                            placeholder="Start time" start="08:30" step="00:15" end="18:30" /></el-col>
                    <el-col :span="10"><el-time-select v-model="reservation.endTime" :min-time="startTime"
                            placeholder="End time" start="08:30" step="00:15" end="18:30" /></el-col>
                </el-row>
            </el-form>
            <div slot="footer">
                <el-button type="primary" @click="reserveOnePlace">确认</el-button>
                <el-button @click="isReserved = false">取消</el-button>
            </div>
        </el-dialog>
</div>
</template>

<script>
import MainWindowVue from '../Mainwindow/MainWindow.vue'
import NoticeListVue from './NoticeList.vue'
import StatusItemVue from './StatusItem.vue'
export default {
    name:"ReservationPage",
    data() {
        return {
            isReserved: false,
            reservation: {
                userId: 'default',
                date: '',
                startTime: '',
                endTime: '',
            }
        }
    },
    components: {
        StatusItemVue,
        MainWindowVue,
        NoticeListVue
    },
    methods: {
        reserveWorkPlace() {
            this.isReserved = true
        },
        // 获取被点击座位的id属性
        getId() {
            const id = this.getAttribute('id')
            this.userId = id
        },
        // 预约座位
         reserveOnePlace(userId, startTime, endTime, date) {
            // var res = {
            //     data:{
            //         code:'1',
            //         msg:'出大问题了',
            //         data:''
            //     }
            // }
            this.$http.post("/reservations/seat", { id: userId, startTime: startTime, endTime: endTime, date: date }, { timeout: 1000 })
                .then(res => {
                    if (res.data.code == 1) {
                        this.$message({
                            message: '预约成功',
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            message: '预约失败:' + res.data.data.msg,
                            type: 'error'
                        });
                    }
                })
                .catch(() => {
                    this.$message({
                        message: '服务器访问错误',
                        type: 'error'
                    });
                })
        }
    }
}
</script>

<style scoped>
#mw {
    height: 100%;
    width: 100%;
    margin-top: 5px;
}

#reservationPage {
    position: relative;
    display: flex;
    width: 99.5%;
    height: 100%;
}
#statusItems {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
}
.statusItem {
    height: 100%;
    width: 100%;
    min-width: 180px;
    margin-right: 1%;
}
#mainWindow{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}
#nl{
    height: 100%;
    width: 328px;
    flex-shrink: 0;
    margin-left: 10px;
    padding-bottom: 10px;
    box-sizing: border-box;
    background-color: rgb(255, 255, 255);
}
</style>