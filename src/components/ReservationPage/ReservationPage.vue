<template>
    <div id="reservationPage">
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
            <div class="statusItem">
                <StatusItemVue error />
            </div>
        </div>
        <div id="mw">
            <MainWindowVue @reserveWorkPlace="reserveWorkPlace" />
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
import MainWindowVue from './MainWindow.vue'
import StatusItemVue from './StatusItem.vue'
export default {
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
        MainWindowVue
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
    position: absolute;
    top: 135px;
    left: 239px;
}

#reservationPage {
    position: relative;
}

#statusItems {
    position: absolute;
    top: 35px;
    left: 268px;
    width: 1111px;
}

.statusItem {
    display: inline-block;
    margin-right: 12px;
}
</style>