<template>
    <div id="edit">
        <div id="head">
            <EditHeaderVue :curArea="curArea" @changeItems="changeItems" :areas="areas" :emps="emps" :posts="posts"/>
        </div>
        <div id="blackLine"></div>
        <div id="items">
            <template v-if="itemInfos.length>0">
                <EmpItemVue v-for="(itemInfo,index) in itemInfos" :key="index" :itemInfo="itemInfo"/>
            </template>
            <template v-else>
                <div id="noticeInfo">暂无记录</div>
            </template>
        </div>
    </div>
</template>

<script>
import EditHeaderVue from './EditHeader.vue';
import EmpItemVue from './EmpItem.vue';
export default {
    name: 'EditList',
    data(){
        return{
            showSave:false,
            itemInfos: [],
        }
    },
    components: {
        EditHeaderVue,
        EmpItemVue
    },
    props:{
        emps:[],
        posts:[],
        areas:[],
        curArea:{}
    },
    methods:{
        changeItems(data){
            console.log(data)
            this.itemInfos = data;
            data.forEach((val,index)=>{
                switch(this.itemInfos[index].status){
                    case 0:
                        this.itemInfos[index].status = "已预约"
                        return
                    case 1:
                        this.itemInfos[index].status = "使用中"
                        return
                    case 2:
                        this.itemInfos[index].status = "已完成"
                        return
                    case 3:
                        this.itemInfos[index].status = "已违约"
                        return
                    case 4:
                        this.itemInfos[index].status = "已取消"
                        return
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
*{
    margin: 0;
    padding: 0;
}
#blackLine{
    z-index: 10;
    width: 100%;
    min-height: 2px;
    background-color: rgb(121, 121, 121);
}
#edit{
    position: relative;
    background-color: white;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 4px;
}
#head{
    width: 100%;
    min-height: 140px;
}
#items{
    position:relative;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: white;
    border-radius: 4px;
}
#items::-webkit-scrollbar{
    display: none;
}
#noticeInfo{
    position: absolute;
    font-size: 20px;
    color: rgb(102, 102, 102);
    font-weight: 600;
    left: 40%;
    top: 50%;
}
// #empty{
//     position: absolute;
//     height: 47px;
//     width: 328px;
//     background-color: white;
// }
// #save{
//     position: absolute;
//     z-index: 20;
//     bottom: 0;
//     height: 47px;
//     width: 328px;
//     border-radius: 4px;
//     background-color: rgb(14,124,204);
//     font-family: microsoft yahei;
//     line-height: 44px;
//     color: white;
//     font-weight: 700;
//     text-align: center;
// }
</style>