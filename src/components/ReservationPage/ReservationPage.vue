<template>
    <div id="reservationPage">
        <div id="statusItems">
            <div class="statusItem"><StatusItemVue busy/></div>
            <div class="statusItem"><StatusItemVue free/></div>
            <div class="statusItem"><StatusItemVue reserved/></div>
            <div class="statusItem"><StatusItemVue allocated/></div>
            <div class="statusItem"><StatusItemVue error/></div>
        </div>
        <div id="mw">
            <MainWindowVue/>
        </div>
    </div>
</template>

<script>
import MainWindowVue from './MainWindow.vue'
import StatusItemVue from './StatusItem.vue'
export default {
    components:{
        StatusItemVue,
        MainWindowVue
    }
}
</script>

<style scoped>
#mw{
    position: absolute;
    top: 150px;
    left: 239px;
}
#reservationPage{
    position:relative;
}
#statusItems{
    position: absolute;
    top: 35px;
    left: 238px;
    width: 1111px;
}
.statusItem{
    display: inline-block;
    margin-right: 12px;
}
</style>