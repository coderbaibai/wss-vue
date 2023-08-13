<template>
  <div v-loading="loading" id="mainWindow" ref="mainWindow">
    <div id="header" ref="header">
      <div id="areaItems">
        <div id="infoItems" v-show="isInfoShow" ref="items">
          <div class="infoItem">
            <div class="colorItem" style="background-color: #c8c9cd"></div>
            <span class="innerSpan">使用中</span>
          </div>
          <div class="infoItem">
            <div class="colorItem" style="background-color: #33cc00"></div>
            <span class="innerSpan">空闲</span>
          </div>
          <div class="infoItem">
            <div class="colorItem" style="background-color: #00aaef"></div>
            <span class="innerSpan">已预约</span>
          </div>
          <div class="infoItem">
            <div class="colorItem" style="background-color: #ffcc00"></div>
            <span class="innerSpan">已分配</span>
          </div>
          <div class="infoItem">
            <div class="colorItem" style="background-color: #ff0000"></div>
            <span class="innerSpan">故障维修</span>
          </div>
        </div>
        <div class="space" v-show="!isInfoShow"></div>
        <div id="floorItems">
          <span class="floorInfo">办公楼:</span>
          <div style="width: 93px" class="selectItem">
            <el-select clearable size="mini" id="ffs" v-model="selectBuilding"
              ><el-option
                v-for="building in buildings"
                :key="building"
                :label="building"
                :value="building"
              ></el-option
            ></el-select>
          </div>
          <span class="floorInfo">楼层:</span>
          <div class="selectItem">
            <el-select
              clearable
              id="sfs"
              size="mini"
              v-model="selectFloor"
              :disabled="floorDisabled"
              ><el-option
                v-for="floor in floors"
                :key="floor"
                :label="floor"
                :value="floor"
              ></el-option
            ></el-select>
          </div>
          <span class="floorInfo">房间号:</span>
          <div class="selectItem">
            <el-select
              clearable
              id="tfs"
              size="mini"
              v-model="selectRoom"
              :disabled="areaDisabled"
              ><el-option
                v-for="room in rooms"
                :key="room"
                :label="room"
                :value="room"
              ></el-option
            ></el-select>
          </div>
        </div>
      </div>
      <div id="refreshDiv">
        <span id="refreshInfo">刷新</span>
        <el-button id="refresh" type="primary"></el-button>
      </div>
    </div>
    <canvas id="canvasBox" :style="canvasStyle" :width="canvasWidth+'px'" :height="canvasHeight+'px'" ref="canvas" @mousedown="mainMouseDown" @mousemove="mainMouseMove" @mouseleave="mainMouseLeave"> </canvas>
  </div>
</template>

<script>
import {setRectAbove,isPointInRotate,RoratePoint,Corner,isPointInRect,redrawAll,isPointInAnyRect,Point,Rect,canvasStatus,getDistance,rotatePoint, detectRectsConflict} from '../../canvas/domain.js'
export default {
  data() {
    return {
		buildings: [],
		floors: [],
		rooms: [],
		//正在选择中的区域，用于区域框更新算法
		selectBuilding: "",
		selectFloor: "",
		selectRoom: "",
		floorDisabled: true,
		areaDisabled: true,
		area: {},
		// 私有组件库
		privateComponents:{},
		sources:{},
		imgNum:0,
		images:{},
		isImgOk:false,
		isAreaOk:false,
    isInfoShow:true,
		// 画布信息
		canvas:{},
		canvasWidth:0,
		canvasHeight:0,
		ctx:{},
		targetId:-1,
		rects:[],
		ratio:0,
		windowObserve:{},
    headerObserve:{},
		isOrigin :true,
    isNew:false,
    items:{},
    header:{},
    loading:true
    };
  },
  props: ["areas"],
  watch: {
    areas() {
      this.areas.forEach((item) => {
        if (!this.buildings.includes(item.buildingName))
          this.buildings.push(item.buildingName);
      });
	  this.isAreaOk = true
    },
    selectBuilding() {
      this.areaDisabled = true;
      this.selectRoom = "";
      this.selectFloor = "";
      this.floors = [];
      if (this.selectBuilding == "") this.floorDisabled = true;
      else {
        this.floorDisabled = false;
      }
      this.areas.forEach((item) => {
        if (
          this.selectBuilding == item.buildingName &&
          !this.floors.includes(item.floorName)
        )
          this.floors.push(item.floorName);
      });
    },
    selectFloor(value) {
      if (this.selectFloor == "") this.areaDisabled = true;
      else {
        this.areaDisabled = false;
      }
      this.selectRoom = "";
      this.rooms = [];
      this.areas.forEach((item) => {
        if (
          this.selectBuilding == item.buildingName &&
          this.selectFloor == item.floorName &&
          !this.rooms.includes(item.name)
        )
          this.rooms.push(item.name);
      });
    },
    selectRoom(value) {
      if (
        this.selectBuilding != "" &&
        this.selectFloor != "" &&
        this.selectRoom != ""
      ) {
        this.areas.forEach((item) => {
          if (
            item.buildingName == this.selectBuilding &&
            item.floorName == this.selectFloor &&
            item.name == this.selectRoom
          ) {
            this.area = this.copyArea(item);
          }
        });
        this.loading = true
        this.getLayoutInfo(this.selectBuilding,this.selectFloor,this.selectRoom)
      } else return;
    },
    isImgOk(){
      if(this.isImgOk&&this.isAreaOk)
        this.autoSelectArea()
    },
    isAreaOk(){
      if(this.isImgOk&&this.isAreaOk)
        this.autoSelectArea()
    }
  },
  computed:{
	canvasStyle(){
		if(this.isOrigin)
			return null
		else{
			return {
				height:this.canvasHeight+'px',
				width:this.canvasWidth+'px'
			}
		}
	}
  },
  methods: {
    copyArea(area) {
      return {
        buildingName: area.buildingName,
        floorName: area.floorName,
        name: area.name,
        width: area.width,
        height: area.height,
      };
    },
    async getPrivateCompoments() {
      await this.$http
        .get("/layout/pc", { timeout: 1000 })
        .then((res) => {
          if (res.data.code == 1) {
            res.data.data.forEach((item) => {
              this.privateComponents[item.id] = item;
            });
            Object.values(this.privateComponents).forEach((item) => {
              this.sources[item.componentImage.id] =
                item.componentImage.imageUrl;
            });
          } else {
            this.$message({
              message: res.data.msg,
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
    async loadImages(){
      await new Promise(resolve=>{
        var count = 0;
        for(var src in this.sources){
          this.imgNum++;  
        }  
        for(let src in this.sources){  
          this.images[src] = new Image();
          this.images[src].src = "api/"+this.sources[src];
          this.images[src].onload = ()=>{
            if(++count >= this.imgNum){
              this.isImgOk = true
              resolve()
            }
          }
        }
      })
    },
    autoSelectArea(){
      if(this.areas.length>0){
        this.area = this.copyArea(this.areas[0])
        this.syncSetSelects(this.area.buildingName,this.area.floorName,this.area.name)
      }
    },
    syncSetSelects(buildingName,floorName,name){
      this.selectBuilding = buildingName
      this.$nextTick(()=>{
        this.selectFloor = floorName
        this.$nextTick(()=>{
          this.selectRoom = name
        })
      })
    },
    getLayoutInfo(buildingName,floorName,name){
      //获取当前选中区域的区域信息，如果不选中，则后端默认返回一些信息
      this.$http.get('/layout/info',{timeout:2000,params:{
        buildingName:buildingName,
        floorName:floorName,
        areaName:name
      }})
      .then(res=>{
        if(res.data.code == 1){
          // 将获取到的组件信息赋值给components变量
          this.components = res.data.data.components
          this.isNew = true
          this.initMainCanvasData()
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
    initMainCanvasData(){
      //计算画布大小比例
      this.container = this.$refs.layout
      this.canvas = this.$refs.canvas
      this.ctx = this.canvas.getContext('2d')
      //计算画布大小比例
      this.mainCanvasRedraw()
      //开启尺寸监视，实时修改画布尺寸
      this.windowObserve = new ResizeObserver(()=>{
          if(this.canvas.height!=this.canvas.clientHeight||this.canvas.width!=this.canvas.clientWidth){
              this.isOrigin = true
              this.$nextTick(()=>{
                  try{
                      this.mainCanvasRedraw()
                  }
                  catch(e){
                      console.log(e)
                  }
              })
          }
      })
      this.windowObserve.observe(this.$refs.mainWindow)
    },
    mainCanvasRedraw(){
          var oldRatio = this.ratio
          this.canvasWidth=this.canvas.clientWidth
          this.canvasHeight=this.canvas.clientHeight
          this.ratio = Math.min(this.canvasWidth/this.area.width,this.canvasHeight/this.area.height)
          if(this.canvasWidth/this.area.width<this.canvasHeight/this.area.height){
              this.canvasHeight = this.area.height*this.ratio
              // this.canvas.clientHeight = this.canvasHeight
          }
          else{
              this.canvasWidth = this.area.width*this.ratio
              // this.canvas.clientWidth = this.canvasWidth
          }
          this.isOrigin = false
          //初始化先前画布信息
          if(this.rects.length==0||this.isNew){
              this.rects = []
              this.components.forEach((item,index)=>{
                  this.rects.push(new Rect(index,this.images[item.privateComponentId],new Point(item.x*this.ratio,item.y*this.ratio),this.privateComponents[item.privateComponentId].width*this.ratio,this.privateComponents[item.privateComponentId].height*this.ratio,item.rotate*Math.PI/180,item.privateComponentId))
              })
          }
          else{
              this.rects.forEach((item,index)=>{
                  item.anchor.x=item.anchor.x*this.ratio/oldRatio;
                  item.anchor.y=item.anchor.y*this.ratio/oldRatio;
                  item.width = item.width*this.ratio/oldRatio;
                  item.height = item.height*this.ratio/oldRatio;
              })
          }
          this.$nextTick(()=>{
              this.ctx.clearRect(0,0,this.canvas.clientWidth+10,this.canvas.clientHeight+10)
              detectRectsConflict(this.rects)
              redrawAll(this.ctx,this.canvas,this.rects)
              this.loading = false
          })
    },
    mainMouseDown(e){
      var mouse = new Point(e.offsetX,e.offsetY)
      var targetIndex = isPointInAnyRect(mouse,this.rects)
      this.rects.forEach((item)=>{
        item.isSelected = false
      })
      if(Number.isFinite(targetIndex)){
        this.targetId = this.rects[targetIndex].id
        this.rects[targetIndex].isSelected = true
      }
      //判断是选中还是拖拽，如果在死区内就是选中
      redrawAll(this.ctx,this.canvas,this.rects)
    },
    mainMouseMove(e){
      var mouse = new Point(e.offsetX,e.offsetY)
      // 安全性检查
      if(mouse.x<0||mouse.x>=this.canvas.clientWidth||mouse.y<0||mouse.y>=this.canvas.clientHeight)
        return
      // 设置鼠标样式
      if(Number.isFinite(isPointInAnyRect(mouse,this.rects))){
        document.querySelector("body").style.cursor = "pointer"
      }
      else{
        document.querySelector("body").style.cursor = "default"
      }
    },
    mainMouseLeave(e){
      document.querySelector("body").style.cursor = "default"
    },
    initHeaderObserve(){
      this.items = this.$refs.items
      this.header = this.$refs.header
      this.headerObserve = new ResizeObserver(()=>{
        console.log(this.$refs.header.clientWidth)
        if(this.header.clientWidth<960)
          this.isInfoShow = false
        else
          this.isInfoShow = true
      })
      this.headerObserve.observe(this.$refs.header)
    }
  },
  async created(){
    try{
      await this.getPrivateCompoments()
      await this.loadImages()
    }catch(e){
      this.$message.error(e)
    }
  },
  mounted(){
    this.initHeaderObserve()
  }
};
</script>
<style lang="scss" scoped>
#mainWindow {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    background-color: white;
    border-radius: 4px;
}
#header{
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    padding-top: 14px;
    display: flex;
    justify-content: space-between;
}
#areaItems{
    display: flex;
    width: calc(100% - 90px);
    // min-width: 920px;
}
#infoItems{
  // width: 470px;
}
#floorItems{
  margin-left: 10px;
  width: 420px;
}
.infoItem {
  display: inline-block;
  line-height: 22px;
  margin-left: 25px;
}
.colorItem {
  display: inline-block;
  width: 22px;
  height: 22px;
}
.innerSpan {
  font-family: "微软雅黑";
  font-size: 13px;
  position: relative;
  top: -6px;
  left: 4px;
  color: rgb(51, 51, 51);
}
.floorInfo {
  display: inline-block;
  height: 23px;
  font-size: 14px;
  font-family: "微软雅黑";
  color: rgb(51, 51, 51);
  margin-left: 10px;
}
.selectItem {
  display: inline-block;
  margin-left: 5px;
}
/deep/#sfs {
  padding-left: 4px;
  width: 75px;
  height: 25px;
}
/deep/#tfs {
  padding-left: 4px;
  width: 75px;
  height: 25px;
}
/deep/#ffs {
  padding-left: 4px;
  width: 93px;
  height: 25px;
}
#refresh {
  position: relative;
  top: -5px;
  height: 23px;
  width: 60px;
}
#refreshDiv {
    position: relative;
    right: 20px;
}
#refreshInfo {
  position: absolute;
  top: 2px;
  left: 15px;
  font-size: 15px;
  font-family: PingFang SC;
  z-index: 10;
  color: white;
  pointer-events: none;
}
#canvasBox {
    width: 90%;
    height: calc(100% - 70px);
    margin-left: 5%;
    margin-top: 20px;
    box-sizing: border-box;
    border: 1px solid #C8C9CD;
    border-radius: 4px;
}
.space{
  flex: 3;
  height: 100%;
}
</style>
