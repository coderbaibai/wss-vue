<template>
    <div id="mainWindow">
        <div id="floorItems">
            <!-- 办公楼下拉框 -->
            <span class="floorInfo">办公楼:</span>
            <div style="width:93px" class="selectItem"><el-select clearable size="mini" id="ffs" v-model="buildingOption"
                    @change="updateFloorOption"> <el-option v-for="option in BuildingOptions" :key="option.value"
                        :label="option.label" :value="option.value"></el-option></el-select></div>
            <!-- 楼层下拉框 -->
            <span class="floorInfo">楼层:</span>
            <div class="selectItem"><el-select clearable id="sfs" size="mini" v-model="floorOption"
                    @change="updateRoomOption"><el-option v-for="option in FloorOptions" :key="option.value"
                        :label="option.label" :value="option.value"></el-option></el-select></div>
            <!-- 房间下拉框 -->
            <span class="floorInfo">房间号:</span>
            <div class="selectItem"><el-select clearable id="tfs" size="mini" v-model="roomOption">
                    <el-option v-for="option in RoomOptions" :key="option.value" :label="option.label"
                        :value="option.value"></el-option></el-select></div>
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
            buildingOption: '',
            floorOption: '',
            roomOption: '',
            BuildingOptions: [],
            FloorOptions: [],
            RoomOptions: [],
        }
    },
    created() {
        // this.$http.get('/manage/infos').then(response => {
        //     this.BuildingOptions = response.data.areas.map(area => area.buildingName);
        // }).catch(error => {
        //     console.log(error);
        // });
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
        },
        updateFloorOption() {
            // const area = this.$data.BuildingOptions.find(area => area.buildingName === this.buildingOption);
            // this.FloorOptions = area.floors.map(floor => floor.floorName);
            // this.floorOption = '';
            // this.roomOption = '';
        },
        updateRoomOption() {
            // const area = this.$data.BuildingOptions.find(area => area.buildingName === this.buildingOption);
            // const floor = area.floors.find(floor => floor.floorName === this.floorOption);
            // this.RoomOptions = floor.rooms.map(room => room.name);
            // this.roomOption = '';
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
</style>