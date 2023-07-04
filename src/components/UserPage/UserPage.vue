<template>
<div>
    <div id="UserPage">
        <div id="UserAvatarDiv"><UserAvatarVue/></div>
        <div id="UsernameTextDiv"><UsernameTextVue/></div>
        <div id="InfoBoxDiv"><InfoBoxVue/></div>
        <div id="ReservationBoxDiv"><ReservationBoxVue/></div>
    </div>
</div>
</template>

<script>

import InfoBoxVue from './InfoBox.vue'
import ReservationBoxVue from './ReservationBox.vue'
import UserAvatarVue from './UserAvatar.vue'
import UsernameTextVue from './UsernameText.vue'
export default {
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
    top: 30px;
    left: 235px;
    width: 1280px;
    height: 815px;
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