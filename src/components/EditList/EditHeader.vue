<template>
<div id="editHead">
    <div id="headName">工位编辑列表</div>
    <div class="serchInfo">
        <p>工位号:</p>
        <el-select size="small" class="selectText" v-model="seat" clearable filterable placeholder="请选择">
            <el-option
            v-for="(item,index) in seats"
            :key="index"
            :label="item"
            :value="item">
            </el-option>
        </el-select>
    </div>
    <div class="serchInfo">
        <p>员工姓名:</p>
        <el-select size="small" class="selectText" v-model="emp" clearable filterable placeholder="请选择">
            <el-option
            v-for="(item,index) in emps"
            :key="index"
            :label="item"
            :value="item">
            </el-option>
        </el-select>
    </div>
    <div class="serchInfo">
        <p>员工职位:</p>
        <el-select size="small" class="selectText" v-model="post" clearable filterable placeholder="请选择">
        <el-option
            v-for="(item,index) in posts"
            :key="index"
            :label="item"
            :value="item">
            </el-option>
        </el-select>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            seat:'',
            emp:'',
            post:''
        }
    },
    props:{
        seats:[],
        emps:[],
        posts:[]
    }
}
</script>

<style lang="scss" scoped>
*{
    margin: 0px;
}
#editHead{
    box-sizing:border-box;
    position: absolute;
    top: 0;
    height: 177px;
    width: 328px;
    background-color: white;
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
.serchInfo{
    position: absolute;
    left: 16px;
    height: 29px;
    width: 297px;
}
#editHead>div:nth-child(2){
    top:46px;
}
#editHead>div:nth-child(3){
    top:86px;
}
#editHead>div:nth-child(4){
    top:126px;
}
.serchInfo>p{
    position:absolute;
    top:0;
    left: 0;
    font-family: microsoft yahei;
    font-size: 14px;
    line-height: 30px;
    color: rgb(102, 102, 102);
}
.serchInfo>.selectText{
    position:absolute;
    left: 122px;
    right: 0;
    height: 30px;
}
</style>