<template>
<div>
  <div id="staticsPage">
    <div id="headerItems">
      <div class="headerItem">
        <div class="innerItem" style="background-color: rgb(52, 142, 238)">
          <img class="innerImg" src="../../assets/Statics/data_1.svg" />
        </div>
        <div class="innerNumber">{{seats}}</div>
        <div class="innerExt" style="left: 86%">总工位数量</div>
      </div>
      <div class="headerItem">
        <div class="innerItem" style="background-color: rgb(57, 174, 106)">
          <img class="innerImg" src="../../assets/Statics/data_2.svg" />
        </div>
        <div class="innerNumber">{{reservationSeats}}</div>
        <div class="innerExt">预约类工位数量</div>
      </div>
      <div class="headerItem">
        <div class="innerItem" style="background-color: rgb(236, 146, 44)">
          <img class="innerImg" src="../../assets/Statics/data_3.svg" />
        </div>
        <div class="innerNumber">{{allocatedSeats}}</div>
        <div class="innerExt">分配类工位数量</div>
      </div>
      <div class="headerItem">
        <div class="innerItem" style="background-color: rgb(221, 64, 32)">
          <img class="innerImg" src="../../assets/Statics/people.svg" />
        </div>
        <div class="innerNumber">{{areas}}</div>
        <div class="innerExt" style="left: 86%">总区域数量</div>
      </div>
      <div class="headerItem">
        <div class="innerItem" style="background-color: rgb(220, 108, 171)">
          <img class="innerImg" src="../../assets/Statics/seats.svg" />
        </div>
        <div class="innerNumber">{{emps}}</div>
        <div class="innerExt">总员工数量</div>
      </div>
      <div class="headerItem">
        <div class="innerItem" style="background-color: rgb(150, 101, 219)">
          <img class="innerImg" src="../../assets/Statics/distract.svg" />
        </div>
        <div class="innerNumber">{{reservations}}</div>
        <div class="innerExt">总预约数量</div>
      </div>
    </div>
    <div id="middle">
      <div id="leftItem"></div>
      <div id="rightItem"></div>
    </div>
    <div id="bottomItem"></div>
  </div>
</div>
</template>

<script>
require("echarts/theme/shine");
export default {
  data(){
    return{
      curMonth:new Date().getMonth()+1,
      ratesObject:[
        {
          name:"十二公寓4楼竹贤书院",
          type:"line",
          data:[0.1,0.5,0.6,0.4,0.8,0.6]
        },
        {
          name:"1号楼8楼A区域",
          type:"line",
          data:[0.2,0.3,0.6,0.5,0.4,0.7]
        },
        {
          name:"3号楼3楼H区域",
          type:"line",
          data:[0.4,0.5,0.7,0.3,0.2,0.6]
        },
        {
          name:"4号楼5楼I区域",
          type:"line",
          data:[0.5,0.4,0.6,0.8,0.4,0.2]
        },
        {
          name:"1号楼4楼K区域",
          type:"line",
          data:[0.8,0.4,0.5,0.2,0.6,0.3]
        },
      ],
      ns:[],
      averageTimes:[101,56,87,92,15,76,35,96,15,68,45,49],
      members:[],
      seats:0,
      reservationSeats:0,
      allocatedSeats:0,
      areas:0,
      emps:0,
      reservations:0,
    }
  },
  mounted() {
    // var res= {data:{
    //     code:1,
    //     data:{
    //         ratesObject:[{
    //           area:{
    //             buildingName:'明学楼',
    //             floorName:'5F',
    //             areaName:'501'
    //           },
    //           rates:[86,85,84,88,93,92]
    //         },
    //         {
    //           area:{
    //             buildingName:'宁学楼',
    //             floorName:'5F',
    //             areaName:'501'
    //           },
    //           rates:[91,89,79,85,84,88]
    //         }],
    //         averageTimes:[101,56,87,92,15,76,35,96,15,68,45,49],
    //         members:[{
    //           post:'前端',
    //           number:10
    //         },
    //         {
    //           post:'后端',
    //           number:20
    //         },
    //         {
    //           post:'测试',
    //           number:30
    //         },
    //         {
    //           post:'产品',
    //           number:40
    //         },
    //         {
    //           post:'运维',
    //           number:50
    //         },
    //         {
    //           post:'设计',
    //           number:60
    //         }],
    //         seats:12,
    //         reservationSeats:45,
    //         allocatedSeats:67,
    //         areas:78,
    //         emps:97,
    //         reservations:545,
    //       }
    //     }
    // }
    this.$http.get('/statics/info',{timeout:5000})
    .then(res => {
      if(res.data.code==1){
        // 查询上座率
        // this.ratesObject = res.data.data.ratesObject;
        // for(let i =0;i<this.ratesObject.length,i<5;i++){
        //   this.ratesObject[i].name = this.ns[i] = this.ratesObject[i].building_name+this.ratesObject[i].floor_name+this.ratesObject[i].name;
        //   this.ratesObject[i].type = 'line';
        //   this.ratesObject[i].data = this.ratesObject[i].rates
        // }
        // 查询人均打卡时长
        // this.averageTimes = res.data.data.averageTimes;
        this.members = res.data.data.members
        for(let i =0;i<res.data.data.members.length;i++){
          this.members[i].name = res.data.data.members[i].post;
          this.members[i].value = res.data.data.members[i].number;
        }

        this.seats = res.data.data.seats,
        this.reservationSeats = res.data.data.reservationSeats
        this.allocatedSeats=res.data.data.allocatedSeats,
        this.areas=res.data.data.areas,
        this.emps=res.data.data.emps,
        this.reservations=res.data.data.reservations,
        this.drawLine();
      }
      else{
        this.$message({
          message: res.data.msg,
          type: 'error'
        });
      }
    })
    .catch(err => {
      this.$message({
				message: "服务器访问错误",
				type: 'error'
			});
    })
  },
  methods: {
    drawLine() {
      let myChart = this.$echarts.init(
        document.getElementById("leftItem"),
        "shine"
      );
      myChart.setOption({
        title: {
          textStyle: {
            fontSize: 14,
            fontWeight: "normal",
            color: "rgb(102,102,102)",
          },
          text: "员工职位比例",
        },
        series: [
          {
            type: "pie",
            data: this.members,
            radius: "50%",
          },
        ],
      });
      myChart = this.$echarts.init(
        document.getElementById("bottomItem"),
        "shine"
      );
      myChart.setOption({
        title: {
          textStyle: {
            fontSize: 14,
            fontWeight: "normal",
            color: "rgb(102,102,102)",
          },
          text: "工位上座率",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        tooltip: {
          showContent: true,
          trigger: "axis",
          backgroundColor: "rgb(255,255,255)",
          axisPointer: {
            axis: "auto",
            snap:true,
          },
        },
        legend: {
          tooltip: {
            show: true,
          },
          data: this.ns,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [(this.curMonth-5)%12+1+'月',(this.curMonth-4)%12+1+'月',(this.curMonth-3)%12+1+'月',(this.curMonth-2)%12+1+'月',(this.curMonth-1)%12+1+'月',this.curMonth%12+1+'月'],
        },
        yAxis: {
          type: "value",
          min(value) {
            return 0;
          },
          max(value){
            return 1
          }
        },
        series: this.ratesObject,
      });
	  myChart = this.$echarts.init(
        document.getElementById("rightItem"),
        "shine"
      );
	  myChart.setOption({
		title: {
          textStyle: {
            fontSize: 14,
            fontWeight: "normal",
            color: "rgb(102,102,102)",
          },
          text: "人均打卡时长",
	  	},
		grid: {
		  left: "3%",
		  right: "4%",
		  bottom: "3%",
		  containLabel: true,
		},
		tooltip: {
		  showContent: true,
		  backgroundColor: "rgb(255,255,255)",
		  axisPointer: {
			axis: "auto",
			snap:true,
		  },
		},
		xAxis:{
			type: "category",
			data: [(this.curMonth-11)%12+1+'月', (this.curMonth-10)%12+1+'月', (this.curMonth-9)%12+1+'月', (this.curMonth-8)%12+1+'月', (this.curMonth-7)%12+1+'月', (this.curMonth-6)%12+1+'月', (this.curMonth-5)%12+1+'月',(this.curMonth-4)%12+1+'月',(this.curMonth-3)%12+1+'月',(this.curMonth-2)%12+1+'月',(this.curMonth-1)%12+1+'月',this.curMonth%12+1+'月'],
		},
		yAxis:{
			type: 'value'
		},
		series:[
			{
				data: this.averageTimes,
				type: 'bar',
				showBackground: true,
				backgroundStyle: {
					color: 'rgba(180, 180, 180, 0.2)'
				}
			}
        ]
	})
	},
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
#staticsPage {
  overflow-y: scroll;
  overflow-x: hidden;
  /* background-color: white; */
  width: 100%;
  height: 100%;
  border-radius: 5px;
  position: relative;
}
#staticsPage::-webkit-scrollbar {
  width: 0px;
}
#headerItems {
  position: absolute;
  top: 10px;
  width: 96%;
  height: 160px;
  display: flex;
  justify-content: space-between;
  /* background-color: white; */
}
.headerItem {
  display: inline-block;
  position: relative;
  min-width: 200px;
  max-width: 280px;
  width: 100%;
  height: 160px;
  background-color: white;
  border-radius: 5px;
  margin-left: 10px;
}
.innerItem {
  display: inline-block;
  height: 100%;
  width: 75px;
  border-radius: 5px 0 0 5px;
}
.innerImg {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 30px;
  width: 30px;
}
.innerNumber {
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 65%;
  width: 70px;
  height: 80px;
  transform: translate(-50%, -50%);
  font-family: "微软雅黑";
  font-size: 45px;
  color: rgb(102, 102, 102);
}
.innerExt {
  display: inline-block;
  position: absolute;
  top: 75%;
  left: 81%;
  width: 150px;
  transform: translate(-50%, -50%);
  font-family: "微软雅黑";
  font-size: 15px;
  color: rgb(102, 102, 102);
}
#middle{
  position: absolute;
  top: 180px;
  display: flex;
  height: 400px;
  width: 96%;
}
#leftItem {
  background-color: #fff;
  height: 100%;
  width: 100%;
  min-width: 400px;
  max-width: 500px;
  border-radius: 5px;
  margin-left: 10px;
}
#rightItem {
  margin-left: 10px;
  background-color: #fff;
  height: 100%;
  width: 100%;
  min-width: 700px;
  border-radius: 5px;
}
#bottomItem {
  position: absolute;
  background-color: #fff;
  height: 400px;
  width: calc(96% - 10px);
  width:-webkit-calc(96% - 10px);
  width:-moz-calc(96% - 10px);
  top: 590px;
  left: 10px;
  border-radius: 5px;
}
</style>