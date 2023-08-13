<template>
    <div id="edit">
        <div id="head">
            <EditHeaderVue :areas="areas" :emps="emps" :posts="posts"/>
        </div>
        <div id="blackLine"></div>
        <div id="items">
            <EmpItemVue v-for="(itemInfo,index) in itemInfos" :key="index" :itemInfo="itemInfo"/>
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
            showSave:false
            //   itemInfo:{
            //     name: "张三",
            //     url: "../assets/round_people.png",
            //     wid:2367181912,
            //     sid:"A401",
            //     post:"高级开发工程师",
            //     begin:"2023-3-01",
            //     end:"2023-3-01"
            // }
        }
    },
    components: {
        EditHeaderVue,
        EmpItemVue
    },
    props:{
        itemInfos:[],
        emps:[],
        posts:[],
        areas:[]
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
    min-height: 177px;
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