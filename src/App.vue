<template>
	<div id="app">
		<RootPageVue/>
	</div>
</template>

<script>
import RootPageVue from './components/RootPage/RootPage.vue';
export default {
 	name:'App',
  	components:{
		RootPageVue
  	}
}
</script>

<style>
#container{
	position: relative;
	top: -858px;
}
</style>