<template>
    <div id="layout" ref="layout">
        <!-- ----------------------LayoutList-------------------------- -->
        <div id="layoutList">
            <div id="edit">
    <!-- -----------------------head------------------------- -->
            <div id="head">
                <div id="layoutHead">
                    <div id="headName">元件列表</div>
                    <div id="editItem">
                        <img src="../../assets/seat.svg" />
                        <h1>明学楼F5-519-001</h1>
                        <p>
                            父元件：IKEA家具真皮沙发<br />
                            长度：30cm &nbsp;&nbsp;&nbsp;宽度：60cm<br />
                            x轴坐标：&nbsp;&nbsp;<input
                            type="text"
                            style="position: relative; left: 0.5px"
                            class="lineInput"
                            /><br />
                            y轴坐标：&nbsp;&nbsp;<input type="text" class="lineInput" /><br />
                            旋转角度：<input
                            type="text"
                            style="position: relative; left: 1.8px"
                            class="lineInput"
                            /><br />
                        </p>
                    </div>
                </div>
            </div>
            <!-- -----------------------canvas------------------------- -->
                <div id="blackLine"></div>
                <div id="items">
                    <canvas ref="canvasServe" id="layoutCanvas" width="328px" height="589px">
                    </canvas>
                </div>
            </div>
        </div>
        <!-- ----------------------mainWindow-------------------------- -->
        <div id="layoutWindow">
            <div id="mainWindow">
        <div id="floorItems">
            <!-- 办公楼下拉框 -->
            <span class="floorInfo">办公楼:</span>
            <div style="width:93px" class="selectItem"><el-select clearable size="mini" id="ffs" v-model="selectBuilding"
                    > <el-option v-for="building in buildings" :key="building"
                        :label="building" :value="building"></el-option></el-select></div>
            <!-- 楼层下拉框 -->
            <span class="floorInfo">楼层:</span>
            <div class="selectItem"><el-select :disabled="floorDisabled" clearable id="sfs" size="mini" v-model="selectFloor"
                    ><el-option v-for="floor in floors" :key="floor"
                        :label="floor" :value="floor"></el-option></el-select></div>
            <!-- 房间下拉框 -->
            <span class="floorInfo">房间号:</span>
            <div class="selectItem"><el-select :disabled="areaDisabled" clearable id="tfs" size="mini" v-model="selectRoom">
                    <el-option v-for="room in rooms" :key="room" :label="room"
                        :value="room"></el-option></el-select></div>
        </div>
        <div id="refreshDiv">
            <span class="innerSpan">保存</span>
            <el-button id="saveText" type="primary"></el-button>
        </div>
        <div id="addDiv">
            <span class="innerSpan"></span>
            <el-button @click="addPage" icon="el-icon-circle-plus-outline" class="innerText" type="primary"></el-button>
        </div>
        <div id="changeDiv">
            <span class="innerSpan"></span>
            <el-button @click="changePage" icon="el-icon-edit" type="primary" class="innerText"></el-button>
        </div>
        <div id="deleteDiv">
            <span class="innerSpan"></span>
            <el-popconfirm title="确定删除当前页面及其布局吗" @confirm="deleteArea">
                <el-button slot="reference" icon="el-icon-delete" class="innerText" type="danger"></el-button>
            </el-popconfirm>
        </div>
        <canvas id="canvasBox" width="888px" height="700px" ref="canvas">
        </canvas>
    </div>
        </div>
        <!-- ---------------------------对话框------------------------------------ -->
        <el-dialog @closed="clearAreaChange" title="区域修改" :visible.sync="isChange">
            <el-form label-position="right" :model="area" label-width="60px" :inline="true">
                <el-row :gutter="10">
                    <el-form-item label="办公楼">
                        <el-input v-model="areaNew.buildingName"></el-input>
                    </el-form-item>
                    <el-form-item label="楼层">
                        <el-input v-model="areaNew.floorName"></el-input>
                    </el-form-item>
                    <el-form-item label="区域名">
                        <el-input v-model="areaNew.areaName"></el-input>
                    </el-form-item>
                </el-row>
                <el-row :gutter="10">
                    <el-form-item label="宽度">
                        <el-input v-model="areaNew.width"></el-input>
                    </el-form-item>
                    <el-form-item label="高度">
                        <el-input v-model="areaNew.height"></el-input>
                    </el-form-item>
                </el-row>
            </el-form>
            <div slot="footer">
                <el-button @click="changeArea" type="primary">修改</el-button>
                <el-button @click="isChange = false">取消</el-button>
            </div>
        </el-dialog>

        <el-dialog @closed="clearAreaAdd" title="增添区域" :visible.sync="isAdd">
            <el-form label-position="right" :model="new_area" label-width="60px" :inline="true">
                <el-row :gutter="10">
                    <el-form-item label="办公楼">
                        <el-input v-model="new_area.buildingName"></el-input>
                    </el-form-item>
                    <el-form-item label="楼层数">
                        <el-input v-model="new_area.floorName"></el-input>
                    </el-form-item>
                    <el-form-item label="区域号">
                        <el-input v-model="new_area.areaName"></el-input>
                    </el-form-item>
                </el-row>
                <el-row :gutter="10">
                    <el-form-item label="区域宽">
                        <el-input v-model="new_area.width" placeholder="0"></el-input>单位:米
                    </el-form-item>
                    <el-form-item label="区域高">
                        <el-input v-model="new_area.height" placeholder="0"></el-input>单位:米
                    </el-form-item>
                </el-row>
            </el-form>
            <div slot="footer">
                <el-button @click="addArea" type="primary">修改</el-button>
                <el-button @click="isAdd = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {isPointInRotate,RoratePoint,Corner,isPointInRect,redrawAll,isPointInAnyRect,Point,Rect,canvasStatus,getDistance,rotatePoint, detectRectsConflict} from '../../canvas/domain.js'
export default {
    data() {
        return {
            once:false,//once变量确保图片只加载一次
            isAdd: false,
            isChange: false,
            isDelete: false,
            sources:[],
            images:[],
            imgNum:0,
            areaOld: {
                buildingName: '',
                floorName: '',
                areaName: '',
                width: 0,
                height: 0
            },
            areaNew:{
                buildingName: '',
                floorName: '',
                areaName: '',
                width: 0,
                height: 0
            },
            privateCompoment:null,
            components: [],
            // 添加区域
            new_area: {
                buildingName: '',
                floorName: '',
                areaName: '',
                width: '',
                hight: ''
            },
            //主窗口数据
            ratio:0,
            areas:[],
            buildings:[],
            floors:[],
            rooms:[],
            selectBuilding:'',
            selectFloor:'',
            selectRoom:'',
            floorDisabled :true,
            areaDisabled :true,
            // 主窗口画布数据
            canvas:null,
            ctx:null,
            canvasInfo : {
                status: canvasStatus.IDLE,
                beginPoint: null,
                currentPoint:null,
                targetIndex :null
            }, 
            rotatePoint:null,
            rects:[],
            // 侧边栏画布数据
            ctxServe:null,
            canvasServe:null,
            rectsServe:[],
            // 全局画布数据
            container:null,
            globalRect:null,
            // 侧边栏数据
            wscs:null,
        }
    },
    // --------------------生命周期钩子函数-------------------
    mounted(){
        this.getLayoutInfo()
        this.getPrivateCompoments()
    },
    // --------------------------侦听器---------------------
    watch:{
        // 实现楼层下拉菜单搜索
        selectBuilding(value){
            if(value==''){
                this.floorDisabled = true
                this.selectFloor = ''
            }
            else
                this.floorDisabled = false
            this.floors = []
            this.areas.forEach((item)=>{
                if(this.selectBuilding==item.buildingName&&!this.floors.includes(item.floorName))
                    this.floors.push(item.floorName)
            })
        },
        selectFloor(value){
            if(value==''){
                this.areaDisabled = true
            }
            else
                this.areaDisabled = false
            this.rooms = []
            this.areas.forEach((item)=>{
                if(this.selectBuilding==item.buildingName&&this.selectRoom==item.selectRoom&&!this.rooms.includes(item.areaName))
                    this.rooms.push(item.areaName)
            })
        },
        selectRoom(value){
            if(this.selectBuilding!=''&&this.selectFloor!=''&&this.selectRoom!=''){
                this.getLayoutInfo(this.selectBuilding,this.selectFloor,this.selectRoom)
            }
            else
                return
        }
        // ---------------------------------------------------------
    },
    methods: {
        initAllCanvasData(){
            //计算画布大小比例
            this.ratio = Math.min(888/this.area.width,700/this.area.height)
            //初始化基本画布信息
            this.container = this.$refs.layout
            this.canvas = this.$refs.canvas
            this.ctx = this.canvas.getContext('2d')
            this.canvasServe = this.$refs.canvasServe
            this.ctxServe = this.canvasServe.getContext('2d')
            this.rotatePoint = new RoratePoint(this.images['rotate'],new Point(-100,-100))
            //初始化先前画布信息
            this.components.forEach((item,index)=>{
                this.rects.push(index,this.images[item.pid],new Point(item.x,item.y),item.width*this.ratio,item.height*this.ratio,item.rotate)
            })
            redrawAll(this.ctx,this.canvas,this.rects)
            //初始化右侧画布信息
            var k = 0
			var arr = Object.keys(this.images)
            for(var j=10;j<=500;j+=100){
				for(var i=10;i<=250;i+=100){
					this.rectsServe.push(new Rect(k,this.images[arr[k]],new Point(i,j),60,60,0))
					k++
					if(k===this.imgNum){
						redrawAll(this.ctxServe,this.canvasServe,this.rectsServe)
						return
					}
				}
			}
            //初始化事件回调函数
            this.canvas.addEventListener('mousemove',e=>{
                var mouse = new Point(e.offsetX,e.offsetY)
                // 安全性检查
                if(mouse.x<0||mouse.x>=this.canvas.clientWidth||mouse.y<0||mouse.y>=this.canvas.clientHeight)
                    return
                // 设置鼠标样式
                let body = document.querySelector("body")
                //旋转中鼠标形态不变
                if(this.canvasInfo.status===canvasStatus.ROTATING){
                    body.style.cursor= "url(../assets/rotatePointer.svg),auto"
                }
                else if(this.canvasInfo.status===canvasStatus.DRAGING)
                    body.style.cursor= "pointer"
                else{
                    if(isPointInRotate(mouse,this.rotatePoint)){
                        body.style.cursor= "url(../assets/rotatePointer.svg),auto"
                    }
                    else if(Number.isFinite(isPointInAnyRect(mouse,this.rects))){
                        body.style.cursor= "pointer"
                    }
                    else{  
                        body.style.cursor= "default"
                    }
                }
                // 旋转（绘制）
                if(this.canvasInfo.status===canvasStatus.ROTATING){
                    var theta = Math.acos((this.rects[this.canvasInfo.targetIndex].anchor.y-mouse.y)/getDistance(this.rects[this.canvasInfo.targetIndex].anchor,mouse))
                    if(mouse.x-this.rects[this.canvasInfo.targetIndex].anchor.x>0){
                        this.rects[this.canvasInfo.targetIndex].rotate = theta
                    }
                    else{
                        this.rects[this.canvasInfo.targetIndex].rotate = Math.PI*2-theta
                    }
                    this.rects[this.canvasInfo.targetIndex].rotate = Math.round(this.rects[this.canvasInfo.targetIndex].rotate*360/(2*Math.PI)/10)*10*Math.PI/180
                    console.log(this.rects[this.canvasInfo.targetIndex].rotate);
                    detectRectsConflict(this.rects)
                    redrawAll(this.ctx,this.canvas,this.rects,this.rotatePoint)
                }
                // 拖拽（死区限制）
                if(this.canvasInfo.status===canvasStatus.DRAG_START&&getDistance(this.canvasInfo.beginPoint,mouse)>5){
                    this.canvasInfo.status = canvasStatus.DRAGING
                    return
                }
                // 拖拽（绘制）
                if(this.canvasInfo.status===canvasStatus.DRAGING){
                    //鼠标跟踪
                    var deltaX = mouse.x-this.canvasInfo.currentPoint.x
                    var deltaY = mouse.y-this.canvasInfo.currentPoint.y
                    this.rects[this.canvasInfo.targetIndex].anchor.x+=deltaX
                    this.rects[this.canvasInfo.targetIndex].anchor.y+=deltaY
                    this.canvasInfo.currentPoint.x = mouse.x
                    this.canvasInfo.currentPoint.y = mouse.y
                    //重新绘制
                    detectRectsConflict(this.rects)
                    redrawAll(this.ctx,this.canvas,this.rects,this.rotatePoint)
                }
            })
            this.canvas.addEventListener('mousedown',e=>{
                var mouse = new Point(e.offsetX,e.offsetY)
                console.log(mouse);
                //安全性检查
                if(mouse.x<0||mouse.x>=this.canvas.clientWidth||mouse.y<0||mouse.y>=this.canvas.clientHeight)
                    return
                //如果按下时在旋转点内 旋转
                if(isPointInRotate(mouse,this.rotatePoint)){
                    this.rects.forEach((item,index)=>{
                        if(item.isSelected===true){
                            targetIndex = index
                        }
                    })
                    this.canvasInfo = {
                        status: canvasStatus.ROTATING,
                        beginPoint: null,
                        currentPoint:null,
                        targetIndex :targetIndex
                    }
                    return
                }
                //如果按下时在某个矩形内 拖拽（准备）
                var targetIndex = isPointInAnyRect(mouse,this.rects)
                if(Number.isFinite(targetIndex)){
                    this.canvasInfo = {
                        status: canvasStatus.DRAG_START,
                        beginPoint: mouse,
                        currentPoint:mouse,
                        targetIndex :targetIndex
                    }
                }
                //如果按下时在空白处
                else{
                    this.rects.forEach((item)=>{
                        if(item.isSelected===true){
                            item.isSelected = false
                            redrawAll(this.ctx,this.canvas,this.rects,this.rotatePoint)
                        }
                    })
                    this.canvasInfo = {
                        status: canvasStatus.IDLE,
                        beginPoint: null,
                        currentPoint:null,
                        targetIndex :null
                    }
                }
            })
            this.canvas.addEventListener("mouseenter",e=>{
                var mouse = new Point(e.offsetX,e.offsetY)
                //安全性检查
                if(mouse.x<0||mouse.x>=this.canvas.clientWidth||mouse.y<0||mouse.y>=this.canvas.clientHeight)
                    return
                if(!this.globalRect)
                    return
                var rect = this.globalRect.copy()
                rect.anchor.x = e.offsetX
                rect.anchor.y = e.offsetY
                this.rects.push(rect)
                this.canvasInfo = {
                    status: canvasStatus.DRAGING,
                    beginPoint: null,
                    currentPoint:{x:e.offsetX,y:e.offsetY},
                    targetIndex :this.rects.length-1
                }
            })
            this.canvas.addEventListener('mouseleave',e=>{
                if(this.canvasInfo.status===canvasStatus.DRAG_START){
                    this.rects.forEach((item)=>{
                        item.isSelected = false
                    })
                    this.rects[this.canvasInfo.targetIndex].isSelected = true
                    redrawAll(this.ctx,this.canvas,this.rects,this.rotatePoint)
                }
                this.canvasInfo = {
                    status: canvasStatus.IDLE,
                    beginPoint: null,
                    currentPoint:null,
                    targetIndex :null
                }
            })
            this.canvas.addEventListener('mouseup',e=>{
                //判断是选中还是拖拽，如果在死区内就是选中
                if(this.canvasInfo.status===canvasStatus.DRAG_START){
                    this.rects.forEach((item)=>{
                        item.isSelected = false
                    })
                    this.rects[this.canvasInfo.targetIndex].isSelected = true
                    redrawAll(this.ctx,this.canvas,this.rects,this.rotatePoint)
                }
                this.canvasInfo = {
                    status: canvasStatus.IDLE,
                    beginPoint: null,
                    currentPoint:null,
                    targetIndex :null
                }
            })
            this.canvas.addEventListener('keydown',e=>{
                if(e.key=="Delete"){
                    this.rects.forEach((item,index)=>{
                        if(item.isSelected===true){
                            this.rects.splice(index,1)
                        }
                    })
                    detectRectsConflict(this.rects)
                    redrawAll(this.ctx,this.canvas,this.rects,this.rotatePoint)
                }
            })
            this.canvasServe.addEventListener('mousemove',e=>{
                var mouse = new Point(e.offsetX,e.offsetY)
                // 安全性检查
                if(mouse.x<0||mouse.x>=this.canvasServe.clientWidth||mouse.y<0||mouse.y>=this.canvasServe.clientHeight)
                    return
                // 设置鼠标样式
                let body = document.querySelector("body")
                if(this.canvasServeInfo.status===canvasStatus.DRAGING||Number.isFinite(isPointInAnyRect(mouse,this.rectsServe)))
                    body.style.cursor= "pointer"
                else
                    body.style.cursor= "default"
                if(this.canvasServeInfo.status===canvasStatus.DRAGING){
                    //鼠标跟踪
                    var deltaX = mouse.x-this.canvasServeInfo.currentPoint.x
                    var deltaY = mouse.y-this.canvasServeInfo.currentPoint.y
                    this.canvasServeInfo.currentRect.anchor.x+=deltaX
                    this.canvasServeInfo.currentRect.anchor.y+=deltaY
                    this.canvasServeInfo.currentPoint.x = mouse.x
                    this.canvasServeInfo.currentPoint.y = mouse.y
                    //重新绘制
                    redrawAll(this.ctxServe,this.canvasServe,this.rectsServe)
                    this.canvasServeInfo.currentRect.drawAlphaImg(this.ctxServe)
                }
            })
            this.canvasServe.addEventListener('mousedown',e=>{
                var mouse = new Point(e.offsetX,e.offsetY)
                console.log(mouse);
                //安全性检查
                if(mouse.x<0||mouse.x>=this.canvasServe.clientWidth||mouse.y<0||mouse.y>=this.canvasServe.clientHeight)
                    return
                var targetIndex = isPointInAnyRect(mouse,this.rectsServe)
                if(Number.isFinite(targetIndex)){
                    this.canvasServeInfo = {
                        status: canvasStatus.DRAGING,
                        beginPoint: mouse,
                        currentPoint:mouse,
                        targetIndex :targetIndex,
                        currentRect:this.rectsServe[targetIndex].copy()
                    }
                }
            })
            this.canvasServe.addEventListener('mouseleave',e=>{
                if(this.canvasServeInfo.status===canvasStatus.DRAGING){
                    this.globalRect = this.canvasServeInfo.currentRect
                }
                this.canvasServeInfo = {
                    status: canvasStatus.IDLE,
                    beginPoint: null,
                    currentPoint:null,
                    targetIndex :null,
                    currentRect:null
                }
                redrawAll(this.ctxServe,this.canvasServe,this.rectsServe)
            })
            this.canvasServe.addEventListener('mouseup',e=>{
                this.canvasServeInfo = {
                    status: canvasStatus.IDLE,
                    beginPoint: null,
                    currentPoint:null,
                    targetIndex :null,
                    currentRect:null
                }
                redrawAll(this.ctxServe,this.canvasServe,this.rectsServe)
            })
            this.container.addEventListener('mouseup',e=>{
                this.globalRect = null
            })

        },
        loadImages(callback){
			var count = 0;
			for(var src in this.sources){
				this.imgNum++;  
			}  
			for(let src in this.sources){  
				this.images[src] = new Image();  
				this.images[src].onload = ()=>{
					if(++count >= this.imgNum){
						callback(this.images);
					}
				}
				this.images[src].src = this.sources[src];  
			}
		},
        getPrivateCompoments(){
            this.$http.get('/layout/pc',{timeout:1000})
            .then(res=>{
                if(res.data.code==1){
                    this.privateCompoment = res.data.data.privateCompoment
                    this.privateCompoment.forEach(item => {
                        this.sources[item.component.pid] = item.component.url
                    });
                    this.sources['rotate'] = require("@/assets/rotate.svg")
                    this.loadImages(this.initAllCanvasData)
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
        getLayoutInfo(buildingName,floorName,areaName){
            if(buildingName&&floorName&&areaName){
                this.$http.get('/layout/info',{timeout:2000,params:{
                    buildingName:buildingName,
                    floorName:floorName,
                    areaName:areaName
                }})
                .then(res=>{
                    if(res.code==1){
                        this.areaOld = res.data.data.area
                        this.areaNew.buildingName = this.areaOld.buildingName
                        this.areaNew.floorName = this.areaOld.floorName
                        this.areaNew.areaName = this.areaOld.areaName
                        this.areaNew.width = this.areaOld.width
                        this.areaNew.height = this.areaOld.height
                        this.components = res.data.data.components
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
            }
            else{
                this.$http.get('/layout/info',{timeout:3000})
                .then(res=>{
                    if(res.code==1){
                        this.areaOld = res.data.data.area
                        this.areaNew.buildingName = this.areaOld.buildingName
                        this.areaNew.floorName = this.areaOld.floorName
                        this.areaNew.areaName = this.areaOld.areaName
                        this.areaNew.width = this.areaOld.width
                        this.areaNew.height = this.areaOld.height
                        this.components = res.data.data.components
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
            }
        },
        getAllBuildingsInfo(){
            this.$http.get('/layout/area').then(res => {
                if(res.data.code === 1){
                    this.areas = res.data.data.areas
                    this.areas.forEach((item)=>{
                        if(!this.buildings.includes(item.buildingName))
                            this.buildings.push(item.buildingName)
                    })
                }
                else{
                    this.$message.error(res.data.msg)
                }
            }).catch(()=>{
                this.$message.error("服务器访问错误")
            });
        },
        // 一下为尚未实现
        getWscs(){
            this.$http.get('/layout/wsc').then(res => {
                if(res.data.code === 1){
                    this.wscs = res.data.data.wscs
                    this.areas.forEach((item)=>{
                        if(!this.buildings.includes(item.buildingName))
                            this.buildings.push(item.buildingName)
                    })
                }
                else{
                    this.$message.error(res.data.msg)
                }
            }).catch(()=>{
                this.$message.error("服务器访问错误")
            });
        },
        addPrivateCompoments(){
            
        },
        deletePrivateCompoments(){

        },
        addArea(){
            this.$http.post('/layout/area',{
                area:this.new_area
            },{timeout:1000})
            .then(res=>{
                if(res.data.code==1){
                    this.$message.success('添加成功')
                    this.areas.push(this.new_area)
                    this.areas.forEach((item)=>{
                        if(!this.buildings.includes(item.buildingName))
                            this.buildings.push(item.buildingName)
                    })
                    this.selectRoom = ''
                    this.selectFloor = ''
                    this.selectBuilding = ''
                    this.isAdd = false
                }
                else
                    this.$message.error(res.data.msg)
            })
            .catch(()=>{
                this.$message.error('服务器访问错误')
            })
        },
        deleteArea(){
            this.$http.delete('layout/area',{
                params:{
                    buildingName:this.areaOld.buildingName,
                    floorName:this.areaOld.floorName,
                    areaName:this.areaOld.areaName
                },
                timeout:1000
            })
            .then(res=>{
                if(res.data.code==1){
                    this.$message.success('删除成功')
                    this.areas.forEach((item,index)=>{
                        if(item.buildingName== this.areaOld.buildingName&&
                        item.floorName== this.areaOld.floorName&&
                        item.areaName== this.areaOld.areaName)
                            this.areas.splice(index,1)
                    })
                    this.buildings = []
                    this.areas.forEach((item)=>{
                        if(!this.buildings.includes(item.buildingName))
                            this.buildings.push(item.buildingName)
                    })
                    this.selectRoom = ''
                    this.selectFloor = ''
                    this.selectBuilding = ''
                }
                else
                    this.$message.error(res.data.msg)
            })
            .catch(()=>{
                this.$message.error('服务器访问错误')
            })
        },
        changeArea(){
            this.$http.put('/layout/area',{
                areaOld:{
                    buildingNameOld:this.areaOld.buildingName,
                    floorNameOld:this.areaOld.floorName,
                    areaNameOld:this.areaOld.areaName
                },
                areaNew:{
                    buildingNameNew:this.areaOld.buildingName,
                    floorNameNew:this.areaOld.floorName,
                    areaNameNew:this.areaOld.areaName
                },
            },{timeout:1000})
            .then(res=>{
                if(res.data.code==1){
                    this.$message.success('修改成功')
                    this.areas.push(this.areaNew)
                    this.areas.forEach((item,index)=>{
                        if(item.buildingName== this.areaOld.buildingName&&
                        item.floorName== this.areaOld.floorName&&
                        item.areaName== this.areaOld.areaName)
                            this.areas.splice(index,1)
                    })
                    this.buildings = []
                    this.areas.forEach((item)=>{
                        if(!this.buildings.includes(item.buildingName))
                            this.buildings.push(item.buildingName)
                    })
                    this.selectRoom = ''
                    this.selectFloor = ''
                    this.selectBuilding = ''
                    this.isChange = false
                }
                else
                    this.$message.error(res.data.msg)
            })
            .catch(()=>{
                this.$message.error('服务器访问错误')
            })
        },
        saveCompomentsInstances(){

        },
        clearAreaChange(){
            this.areaNew.buildingName = this.areaOld.buildingName
            this.areaNew.floorName = this.areaOld.floorName
            this.areaNew.areaName = this.areaOld.areaName
            this.areaNew.width = this.areaOld.width
            this.areaNew.height = this.areaOld.height
        },
        clearAreaAdd(){
            this.new_area.areaName=''
            this.new_area.floorName=''
            this.new_area.buildingName=''
            this.new_area.width=''
            this.new_area.hight=''
        },
        addPage() {
            this.isAdd = true
        },
        changePage() {
            this.isChange = true
        },
    }
}
</script>

<style lang="scss" scoped>
#layoutWindow {
    position: absolute;
    top: 32px;
    left: 231px;
}

#layoutList {
    position: absolute;
    top: 34px;
    left: 1210px;
    height: 810px;
    width: 330px;
}
#layoutHead{
    position:relative;
}
#headName{
    box-sizing:border-box;
    position: absolute;
    top: 0;
    left:1px;
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
#editItem{
    position: absolute;
    top: 27px;
    left: 0px;
    height: 148px;
    width: 328px;
}
#editItem>img{
  position: absolute;
  top: 12px;
  left: 13px;
  height: 30px;
  width: 30px;
  border-radius: 12.5px;
}
#editItem > h1 {
  position: absolute;
  top: -1px;
  left: 51px;
  width: 200px;
  height: 26px;
  font-family: microsoft yahei;
  color: rgb(101, 101, 101);
  font-size: 18px;
  line-height: 29px;
  font-weight: 700;
}
#editItem > p {
  position: absolute;
  box-sizing: border-box;
  top: 24px;
  left: 0;
  bottom: 0;
  width: 100%;
  padding-left: 40px;
  font-family: microsoft yahei;
  color: rgb(153, 153, 153);
  font-size: 14px;
  line-height: 1.5;
}
.lineInput{
    padding-left: 3px;
    border-bottom:#666 1px solid;
    border-left-width:0px;
    border-right-width:0px;
    border-top-width:0px;
}
.lineInput:focus{
    outline:none;
    border-bottom:deepskyblue 1px solid;
}
#blackLine {
  position: absolute;
  top: 177px;
  z-index: 10;
  width: 100%;
  height: 2px;
  background-color: rgb(121, 121, 121);
}
#edit {
  position: relative;
  display: inline-block;
  background-color: white;
  height: 775px;
  width: 328px;
  top: 0;
  left: 0;
  border-radius: 4px;
}
#items {
  position: absolute;
  top: 179px;
  height: 589px;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: white;
  border-radius: 4px;
}
#items::-webkit-scrollbar {
  display: none;
}
#empty {
  position: absolute;
  height: 47px;
  width: 328px;
  background-color: white;
}
#mainWindow {
    position: relative;
    height: 770px;
    width: 970px;
    background-color: white;
    border-radius: 4px;
}

/deep/#changeDiv .el-button{
    padding:0;
    margin: 0;
}
/deep/#refreshDiv .el-button{
    padding:0;
    margin: 0;
}
/deep/#deleteDiv .el-button{
    padding:0;
    margin: 0;
}
/deep/#addDiv .el-button{
    padding:0;
    margin: 0;
}
#floorItems {
    position: absolute;
    top: 13px;
    left: 20px;
}
.floorInfo {
    display: inline-block;
    height: 23px;
    font-size: 14px;
    font-family: '微软雅黑';
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

.innerText {
    position: relative;
    height: 30px;
    width: 37px;
}

#saveText {
    position: relative;
    height: 23px;
    width: 60px;
}

#refreshDiv {
    position: absolute;
    left: 850px;
    top: 14px;
}

#addDiv {
    position: absolute;
    left: 500px;
    top: 12px;
}

#changeDiv {
    position: absolute;
    left: 450px;
    top: 12px;
}

#deleteDiv {
    position: absolute;
    left: 550px;
    top: 12px;
}

.innerSpan {
    position: absolute;
    top: 2px;
    left: 15px;
    font-size: 14px;
    font-family: PingFang SC;
    z-index: 10;
    color: white;
    pointer-events: none;
}

#canvasBox {
    position: absolute;
    top: 50px;
    left: 41px;
    height: 700px;
    width: 888px;
    border: 1px solid #C8C9CD;
    border-radius: 4px;
}
ul>.el-select-dropdown__item{
    padding-left: 12px;
}
</style>