<template>
  <div id="staticsPage">
    <div id="headerItems">
      <div class="headerItem">
        <div class="innerItem" style="background-color: rgb(52, 142, 238)">
          <img class="innerImg" src="../../assets/Statics/data_1.svg" />
        </div>
        <div class="innerNumber">803</div>
        <div class="innerExt" style="left: 86%">总工位数量</div>
      </div>
      <div class="headerItem">
        <div class="innerItem" style="background-color: rgb(57, 174, 106)">
          <img class="innerImg" src="../../assets/Statics/data_2.svg" />
        </div>
        <div class="innerNumber">232</div>
        <div class="innerExt">预约类工位数量</div>
      </div>
      <div class="headerItem">
        <div class="innerItem" style="background-color: rgb(236, 146, 44)">
          <img class="innerImg" src="../../assets/Statics/data_3.svg" />
        </div>
        <div class="innerNumber">142</div>
        <div class="innerExt">分配类工位数量</div>
      </div>
      <div class="headerItem">
        <div class="innerItem" style="background-color: rgb(221, 64, 32)">
          <img class="innerImg" src="../../assets/Statics/people.svg" />
        </div>
        <div class="innerNumber">657</div>
        <div class="innerExt" style="left: 86%">总区域数量</div>
      </div>
      <div class="headerItem">
        <div class="innerItem" style="background-color: rgb(220, 108, 171)">
          <img class="innerImg" src="../../assets/Statics/seats.svg" />
        </div>
        <div class="innerNumber">12</div>
        <div class="innerExt">总员工数量</div>
      </div>
      <div class="headerItem">
        <div class="innerItem" style="background-color: rgb(150, 101, 219)">
          <img class="innerImg" src="../../assets/Statics/distract.svg" />
        </div>
        <div class="innerNumber">14</div>
        <div class="innerExt">总预约数量</div>
      </div>
    </div>
    <div id="leftItem"></div>
    <div id="rightItem"></div>
    <div id="bottomItem"></div>
  </div>
</template>

<script>
require("echarts/theme/shine");
export default {
  mounted() {
    this.drawLine();
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
            data: [
              {
                name: "前端工程师",
                value: 35,
              },
              {
                name: "后端工程师",
                value: 50,
              },
              {
                name: "系统架构师",
                value: 5,
              },
              {
                name: "产品经理",
                value: 10,
              },
            ],
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
          data: ["研究院", "明学楼", "宁学楼"],
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["1月", "2月", "3月", "4月", "5月", "6月"],
        },
        yAxis: {
          type: "value",
          min(value) {
            return value.min - 5;
          },
        },
        series: [
          {
            name: "研究院",
            data: [80, 91, 70, 75, 84, 68],
            type: "line",
          },
          {
            name: "明学楼",
            data: [90, 86, 76, 82, 79, 87],
            type: "line",
          },
          {
            name: "宁学楼",
            data: [82, 79, 85, 86, 83, 90],
            type: "line",
          },
        ],
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
			data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月","8月","9月","10月","11月","12月"],
		},
		  yAxis: {
			type: 'value'
		},
		series:[
			{
				data: [120, 200, 150, 80, 70, 110, 120, 200, 150, 80, 70, 110],
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
  position: absolute;
  left: 261px;
  top: 20px;
  width: 1228px;
  height: 835px;
  border-radius: 5px;
}
#staticsPage::-webkit-scrollbar {
  width: 0px;
}
#headerItems {
  position: absolute;
  top: 10px;
  width: 1238px;
  height: 160px;
  /* background-color: white; */
}
.headerItem {
  display: inline-block;
  position: relative;
  width: 200px;
  height: 160px;
  background-color: white;
  border-radius: 5px;
  margin-left: 5px;
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
#leftItem {
  position: absolute;
  background-color: #fff;
  height: 400px;
  width: 400px;
  top: 180px;
  border-radius: 5px;
}
#rightItem {
  position: absolute;
  background-color: #fff;
  height: 400px;
  width: 820px;
  top: 180px;
  left: 410px;
  border-radius: 5px;
}
#bottomItem {
  position: absolute;
  background-color: #fff;
  height: 400px;
  width: 1230px;
  top: 590px;
  border-radius: 5px;
}
</style>
