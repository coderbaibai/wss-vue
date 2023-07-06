<template>
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
            <el-popconfirm title="确定删除当前页面及其布局吗" @confirm="deletePage">
                <el-button slot="reference" icon="el-icon-delete" class="innerText" type="danger"></el-button>
            </el-popconfirm>
        </div>
        <canvas id="canvasBox">
        </canvas>
    </div>
</template>

<script>
export default {
    data() {
        return {
            areas:[],
            buildings:[],
            floors:[],
            rooms:[],
            selectBuilding:'',
            selectFloor:'',
            selectRoom:'',
            floorDisabled :true,
            areaDisabled :true
        }
    },
    created() {
        var res ={
            data:{
                data:{
                    areas:[{buildingName:'明学楼',floorName:'5F',areaName:'501'},
                    {buildingName:'明学楼',floorName:'3F',areaName:'502'},
                    {buildingName:'明学楼',floorName:'4F',areaName:'503'},
                    {buildingName:'功学楼',floorName:'6F',areaName:'504'}]
                }
            }
        }
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
    watch:{
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
        }
    },
    methods: {
        addPage() {
            this.$emit('addPage');
        },
        changePage() {
            this.$emit('changePage');
        },
        deletePage() {
            this.$emit('deletePage');
        }
    }
}

</script>

<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
}

#mainWindow {
    position: relative;
    height: 770px;
    width: 970px;
    background-color: white;
    border-radius: 4px;
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