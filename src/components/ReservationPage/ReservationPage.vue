<template>
  <div>
    <div id="reservationPage">
      <div id="mainWindow">
        <div id="statusItems">
          <div class="statusItem">
            <StatusItemVue busy :statusNumber="busyNumber"/>
          </div>
          <div class="statusItem">
            <StatusItemVue free :statusNumber="freeNumber"/>
          </div>
          <div class="statusItem">
            <StatusItemVue reserved :statusNumber="reservedNumber"/>
          </div>
          <div class="statusItem">
            <StatusItemVue allocated :statusNumber="allowcatedNumber"/>
          </div>
          <div class="statusItem" style="margin-right: 0">
            <StatusItemVue error :statusNumber="errorNumber"/>
          </div>
        </div>
        <div id="mw">
          <MainWindowVue :areas="areas" @reserve="reserveWorkPlace" />
        </div>
      </div>
      <div id="nl">
        <NoticeListVue />
      </div>
    </div>
    <el-dialog
      title="预约工位"
      :visible.sync="isReserved"
      @closed="reserveClose"
    >
      <el-form
        :inline="true"
        :model="reservation"
        class="demo-form-inline"
        label-position="top"
      >
        <el-row :gutter="10">
          <el-col :span="10"
            ><el-form-item label="工位号">
              <el-input
                v-model="reservation.sid"
                disabled
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="10"
            ><el-form-item label="预约日期">
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="reservation.date"
                type="date"
                placeholder="Pick a date"
                clearable
              /> </el-form-item
          ></el-col>
        </el-row>
        <el-row :gutter="10" v-if="reservation.date">
          <el-col :span="10"
            ><el-select
              v-model="reservation.startTime"
              :placeholder="startPieces.length!=0?'请选择开始时间':'暂无可用时间'"
              :disabled="!startPieces.length!=0"
            >
              <el-option
                v-for="(item, index) in startPieces"
                :key="index"
                :label="item.value"
                :value="item.value"
              ></el-option> </el-select
          ></el-col>
          <el-col :span="10"
            ><el-select
              v-model="reservation.endTime"
              :placeholder="startPieces.length!=0?'请选择开始时间':'暂无可用时间'"
              :disabled="!reservation.startTime"
            >
              <el-option
                v-for="(item, index) in selectableEnd"
                :key="index"
                :label="item"
                :value="item"
              ></el-option> </el-select
          ></el-col>
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
import MainWindowVue from "../Mainwindow/MainWindow.vue";
import NoticeListVue from "./NoticeList.vue";
import StatusItemVue from "./StatusItem.vue";
export default {
  name: "ReservationPage",
  data() {
    return {
      isReserved: false,
      reservation: {
        sid: "",
        date: "",
        startTime: "",
        endTime: "",
        area: {},
      },
      timeTokens: [],
      areas: [],
      startPieces: [],
      endPieces: [],
      selectableEnd: [],
      busyNumber:0,
      freeNumber:0,
      reservedNumber:0,
      allowcatedNumber:0,
      errorNumber:0,
    };
  },
  components: {
    StatusItemVue,
    MainWindowVue,
    NoticeListVue,
  },
  mounted() {
    this.getAllAreas();
    this.getAllInfo();
  },
  methods: {
    reserveWorkPlace(area, sid) {
      this.reservation.sid = sid;
      this.reservation.area = area;
      this.isReserved = true;
    },
    reserveClose() {
      this.reservation.sid = "";
      this.reservation.date = "";
      this.reservation.startTime = "";
      this.reservation.endTime = "";
      this.reservation.area = {};
      (this.timeTokens = []),
        (this.startPieces = []),
        (this.endPieces = []),
        (this.selectableEnd = []);
    },
    // 获取被点击座位的id属性
    getId() {
      const id = this.getAttribute("id");
      this.userId = id;
    },
    // 预约座位
    reserveOnePlace() {
      this.$http
        .post("/reservations/seat", this.reservation, { timeout: 1000 })
        .then((res) => {
          if (res.data.code == 1) {
            this.$message({
              message: "预约成功",
              type: "success",
            });
            this.isReserved = false;
          } else {
            this.$message({
              message: "预约失败:" + res.data.data.msg,
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
    getAllAreas() {
      this.$http
        .get("/reservations/areas", { timeout: 2000 })
        .then((res) => {
          if (res.data.code == 0) {
            this.$message.error(res.data.msg);
          } else {
            this.areas = res.data.data;
          }
        })
        .catch(() => {
          this.$message.error("服务器访问异常");
        });
    },
    getAllInfo(){
      this.$http
        .get("/reservations/info", { timeout: 2000 })
        .then((res) => {
          if (res.data.code == 1) {
            this.busyNumber = res.data.data.busyNumber;
            this.freeNumber = res.data.data.freeNumber;
            this.reservedNumber = res.data.data.reservedNumber;
            this.allowcatedNumber = res.data.data.allowcatedNumber;
            this.errorNumber = res.data.data.errorNumber;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(() => {
          this.$message.error("服务器访问异常");
        });
    },
    spliceTokenToPieces(token) {
      var res = [];
      var startDate = new Date(0);
      startDate.setHours(Number(token.start.substring(0, 2)));
      startDate.setMinutes(Number(token.start.substring(3, 5)));
      var endDate = new Date(0);
      endDate.setHours(Number(token.end.substring(0, 2)));
      endDate.setMinutes(Number(token.end.substring(3, 5)));
      var current = startDate.getTime();
      var end = endDate.getTime();
      if (end < current) {
        end += 1000 * 60 * 60 * 24;
      }
      while (current <= end) {
        startDate = new Date(current);
        res.push(
          startDate.toTimeString().substring(0, 5) == "00:00" && current == end
            ? "24:00"
            : startDate.toTimeString().substring(0, 5)
        );
        current += 1000 * 60 * 30;
      }
      return res;
    },
    setStartsAndEnds(tokens) {
      this.startPieces = []
      this.endPieces = []
      this.selectableEnd = []
      for (var i = 0; i < tokens.length; i++) {
        var curPieces = this.spliceTokenToPieces(tokens[i]);
        for (var j = 0; j < curPieces.length; j++) {
          if (j != curPieces.length - 1)
            this.startPieces.push({
              value: curPieces[j],
              prefix: i,
              suffix: j,
            });
          if (j != 0)
            this.endPieces.push({ value: curPieces[j], prefix: i, suffix: j });
        }
      }
    },
  },
  watch: {
    "reservation.date": {
      handler() {
        if (this.reservation.date == ""||this.reservation.date==null) return;
        this.$http
          .get(
            `/reservations/seat?sid=${this.reservation.sid}&date=${this.reservation.date}&buildingName=${this.reservation.area.buildingName}&floorName=${this.reservation.area.floorName}&name=${this.reservation.area.name}`
          )
          .then((res) => {
            if (res.data.code == 1) {
              this.timeTokens = res.data.data;
              this.setStartsAndEnds(this.timeTokens);
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch((res) => {
            this.$message.error("服务器访问异常");
          });
      },
    },
    "reservation.startTime": {
      handler() {
        this.reservation.endTime = "";
        this.selectableEnd = [];
        var pre;
        var suf;
        // 找到当前选择的前缀组
        for (var cur of this.startPieces) {
          if (this.reservation.startTime == cur.value) {
            pre = cur.prefix;
            suf = cur.suffix;
          }
        }
        // 找到可供选择的时间段
        for (var end of this.endPieces) {
          if (end.prefix == pre && end.suffix > suf) {
            this.selectableEnd.push(end.value);
          }
        }
      },
    },
  },
};
</script>

<style scoped>
#mw {
  height: calc(100% - 110px);
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
  min-width: 942px;
  width: 100%;
  height: 100px;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
}
.statusItem {
  height: 100%;
  width: 100%;
  min-width: 180px;
  margin-right: 1%;
}
#mainWindow {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
#nl {
  height: 100%;
  width: 328px;
  flex-shrink: 0;
  margin-left: 10px;
  padding-bottom: 10px;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);
}
</style>
