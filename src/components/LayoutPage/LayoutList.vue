<template>
    <div id="edit">
        <div id="head">
            <LayoutHeadVue></LayoutHeadVue>
        </div>
        <div id="blackLine">
        </div>
        <div id="items">
            <LayoutItemVue :sources="this.sources"></LayoutItemVue>
        </div>
    </div>
</template>

<script>
import LayoutHeadVue from './LayoutHead.vue'
import LayoutItemVue from './LayoutCanvas.vue'
export default {
    name: 'EditList',
    data(){
        return{
            showSave:false,
            sources:{
                seat: require('@/assets/Layout/seat.png'),
                ws1:require('@/assets/Layout/ws.png'),
                ws2:require('@/assets/Layout/ws.png'),
                ws3:require('@/assets/Layout/ws.png'),
                ws4:require('@/assets/Layout/ws.png'),
                ws5:require('@/assets/Layout/ws.png'),
                ws6:require('@/assets/Layout/ws.png'),
                ws7:require('@/assets/Layout/ws.png'),
                ws8:require('@/assets/Layout/ws.png'),
                ws9:require('@/assets/Layout/ws.png'),
            },
        }
    },
    components:{
        LayoutHeadVue,
        LayoutItemVue
    },
    props:{
        itemInfos:[],
        seats:[],
        emps:[],
        posts:[]
    }
}
</script>

<style lang="scss" scoped>
*{
    margin: 0;
    padding: 0;
}
#blackLine{
    position: absolute;
    top: 177px;
    z-index: 10;
    width: 100%;
    height: 2px;
    background-color: rgb(121, 121, 121);
}
#edit{
    position: relative;
    display: inline-block;
    background-color: white;
    height: 775px;
    width: 328px;
    top: 0;
    left: 0;
    border-radius: 4px;
}
#items{
    position:absolute;
    top: 179px;
    height: 589px;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: white;
    border-radius: 4px;
}
#items::-webkit-scrollbar{
    display: none;
}
#empty{
    position: absolute;
    height: 47px;
    width: 328px;
    background-color: white;
}
</style>