<template>
    <div id="mainWindow">
        <div id="reservationHeader">
            <div id="infoItems">
                <div class="infoItem">
                    <div class="colorItem" style="background-color:#C8C9CD"></div><span class="innerSpan">使用中</span>
                </div>
                <div class="infoItem">
                    <div class="colorItem" style="background-color:#33CC00"></div><span class="innerSpan">空闲</span>
                </div>
                <div class="infoItem">
                    <div class="colorItem" style="background-color:#00AAEF"></div><span class="innerSpan">已预约</span>
                </div>
                <div class="infoItem">
                    <div class="colorItem" style="background-color:#FFCC00"></div><span class="innerSpan">已分配</span>
                </div>
                <div class="infoItem">
                    <div class="colorItem" style="background-color:#FF0000"></div><span class="innerSpan">故障维修</span>
                </div>
            </div>
            <div id="floorItems">
                <span class="floorInfo">办公楼:</span>
                <div style="width:93px" class="selectItem"><el-select size="mini" id="ffs"></el-select></div>
                <span class="floorInfo">楼层:</span>
                <div class="selectItem"><el-select id="sfs" size="mini"></el-select></div>
                <span class="floorInfo">房间号:</span>
                <div class="selectItem"><el-select id="tfs" size="mini"></el-select></div>
            </div>
            <div id="refreshDiv">
                <span id="refreshInfo">刷新</span>
                <el-button id="refresh" type="primary"></el-button>
            </div>
            <!-- 测试用预约按钮 -->
            <el-button size="small" round @click="reserve">预约</el-button>
        </div>
        <div id="canvasBox">
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        reserve() {
            this.$emit("reserveWorkPlace");
        },
    },
    // components: { AddComponent, AddComponent }
}
</script>
<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
}

#mainWindow {
    position: relative;
    height: 714px;
    width: 1170px;
    background-color: white;
    border-radius: 4px;
}

#infoItems {
    position: absolute;
    left: 41px;
    top: 14px;
}

.infoItem {
    display: inline-block;
    line-height: 22px;
    margin-right: 31px;
}

.colorItem {
    display: inline-block;
    width: 22px;
    height: 22px;
}

.innerSpan {
    font-family: '微软雅黑';
    font-size: 13px;
    position: relative;
    top: -6px;
    left: 4px;
    color: rgb(51, 51, 51);
}

#floorItems {
    position: absolute;
    top: 13px;
    left: 579px;
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

#refresh {
    position: relative;
    height: 23px;
    width: 60px;
}

#refreshDiv {
    position: absolute;
    left: 1016px;
    top: 12px;
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
    position: absolute;
    top: 50px;
    left: 41px;
    height: 650px;
    width: 1100px;
    border: 1px solid #C8C9CD;
    border-radius: 4px;
}
</style>