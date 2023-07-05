<template>
<div>
    <div id="UserPage">
        <div id="UserAvatarDiv"><UserAvatarVue/></div>
        <div id="UsernameTextDiv"><UsernameTextVue/></div>
        <div id="InfoBoxDiv"><InfoBoxVue/></div>
        <div id="ReservationBoxDiv"><ReservationBoxVue @addTeam="isAdd=true"/></div>
    </div>
    <el-dialog title="区域修改" :visible.sync="isAdd">
		<el-table :data="gridData">
			<el-table-column property="date" label="日期" width="150"></el-table-column>
			<el-table-column property="name" label="姓名" width="200"></el-table-column>
			<el-table-column property="address" label="地址"></el-table-column>
		</el-table>
	</el-dialog>
</div>
</template>

<script>
import InfoBoxVue from './InfoBox.vue'
import ReservationBoxVue from './ReservationBox.vue'
import UserAvatarVue from './UserAvatar.vue'
import UsernameTextVue from './UsernameText.vue'
export default {
    data(){
        return{
            isAdd:false
        }
    },
    components:{
        InfoBoxVue,
        ReservationBoxVue,
        UserAvatarVue,
        UsernameTextVue
    }
}
</script>

<style scoped>
#UserPage{
    position: absolute;
    top: 25px;
    left: 230px;
    width: 1310px;
    height: 832px;
    background-color: white;
    border-radius: 5px;
    border-width: 3px;
}
#UserAvatarDiv{
    position:absolute;
    left:123px;
    top: 39px;
}
#UsernameTextDiv{
    position:absolute;
    left:368px;
    top: 129px;
}
#InfoBoxDiv{
    position:absolute;
    left:26px;
    top: 239px;
}
#ReservationBoxDiv{
    position:absolute;
    left:359px;
    top: 241px;
}
</style>