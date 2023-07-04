<template>
    <div id="layout">
        <div id="layoutWindow">
            <MainWindowVue/>
        </div>
    </div>
</template>

<script>
import MainWindowVue from '../LayoutPage/MainWindow.vue'
export default {
    components:{
        MainWindowVue
    }
}
</script>

<style>
#layoutWindow{
  position: absolute;
  top: 28px;
  left: 231px;
}
</style>