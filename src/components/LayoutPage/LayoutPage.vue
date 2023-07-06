<template>
    <div id="layout">
        <div id="layoutList">
            <LayoutListVue></LayoutListVue>
        </div>
        <div id="layoutWindow">
            <MainWindowVue @addPage="addPage" @changePage="changePage" @deletePage="deletePage" />
        </div>
        <el-dialog title="区域修改" :visible.sync="isChange">
            <el-form label-position="right" :model="area" label-width="60px" :inline="true">
                <el-row :gutter="10">
                    <el-form-item label="办公楼">
                        <el-input v-model="area.buildingNameNew"></el-input>
                    </el-form-item>
                    <el-form-item label="楼层">
                        <el-input v-model="area.floorNameOld"></el-input>
                    </el-form-item>
                    <el-form-item label="区域名">
                        <el-input v-model="area.areaNameNew"></el-input>
                    </el-form-item>
                </el-row>
                <el-row :gutter="10">
                    <el-form-item label="宽度">
                        <el-input v-model="area.width"></el-input>
                    </el-form-item>
                    <el-form-item label="高度">
                        <el-input v-model="area.height"></el-input>
                    </el-form-item>
                </el-row>
            </el-form>
            <div slot="footer">
                <el-button type="primary">修改</el-button>
                <el-button @click="isChange = false">取消</el-button>
            </div>
        </el-dialog>

        <el-dialog title="增添区域" :visible.sync="isAdd">
            <!-- <el-table :data="gridData">
                <el-table-column property="date" label="日期" width="150"></el-table-column>
                <el-table-column property="name" label="姓名" width="200"></el-table-column>
                <el-table-column property="address" label="地址"></el-table-column>
            </el-table> -->
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
                        <el-input v-model="new_area.width" placeholder="0"></el-input>
                    </el-form-item>
                    <el-form-item label="区域高">
                        <el-input v-model="new_area.height" placeholder="0"></el-input>
                    </el-form-item>
                </el-row>
            </el-form>
            <div slot="footer">
                <el-button type="primary">修改</el-button>
                <el-button @click="isChange = false">取消</el-button>
            </div>
        </el-dialog>
        <!-- <el-dialog title="增添区域" :visible.sync="isDelete">
            <el-table :data="gridData">
                <el-table-column property="date" label="日期" width="150"></el-table-column>
                <el-table-column property="name" label="姓名" width="200"></el-table-column>
                <el-table-column property="address" label="地址"></el-table-column>
            </el-table>
        </el-dialog> -->
    </div>
</template>

<script>
import MainWindowVue from '../LayoutPage/MainWindow.vue'
import LayoutListVue from './LayoutList.vue'
export default {
    components: {
        MainWindowVue,
        LayoutListVue
    },
    data() {
        return {
            isAdd: false,
            isChange: false,
            isDelete: false,
            area: {
                buildingNameOld: '',
                floorNameOld: '',
                areaNameOld: '',
                buildingNameNew: '',
                floorNameNew: '',
                areaNameNew: '',
                width: 0,
                height: 0
            },
            // 添加区域
            new_area: {
                buildingName: '',
                floorName: '',
                areaName: '',
                width: '',
                hight: ''
            }
            },
            components: [],
        }
    },
    created(){
        this.getLayoutInfo()
    },
    methods: {
        getLayoutInfo(buildingName,floorName,areaName){
            if(buildingName&&floorName&&areaName){
                this.$http.get('/layout/info',{timeout:3000,params:{
                    buildingName:buildingName,
                    floorName:floorName,
                    areaName:areaName
                }})
                .then(res=>{
                    if(res.code==1){
                        this.area.buildingNameOld = res.data.data.area.buildingName
                        this.area.floorNameOld = res.data.data.area.floorName
                        this.area.areaNameOld = res.data.data.area.areaName
                        this.area.width = res.data.data.area.width
                        this.area.height = res.data.data.area.height
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
                        this.area.buildingNameOld = res.data.data.area.buildingName
                        this.area.floorNameOld = res.data.data.area.floorName
                        this.area.areaNameOld = res.data.data.area.areaName
                        this.area.width = res.data.data.area.width
                        this.area.height = res.data.data.area.height
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
        addPage() {
            this.isAdd = true
        },
        changePage() {
            this.isChange = true
        },
        deletePage() {
            this.isDelete = true
        }
    }
}
</script>

<style>
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
</style>