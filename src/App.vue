<template>
	<div id="app">
		<div v-if="infoType===0">
			<StartPageVue @login="changeInfoType"/>
		</div>
		<div v-else-if="infoType===1">
			<BasePageVue/>
			<div id="container"><router-view></router-view></div>
		</div>
	</div>
</template>

<script>
import StartPageVue from './components/StartPage/StartPage.vue'
import BasePageVue from './components/BasePage/BasePage.vue'
export default {
	data(){
		return{
			infoType : 0
		}
	},
	methods:{
		changeInfoType(t){
			this.$router.push('/',()=>{},()=>{})
			this.infoType = t
		}
	},
 	name:'App',
  	components:{
		BasePageVue,
		StartPageVue
  	}
}
</script>

<style>
#container{
	position: relative;
	top: -858px;
}
</style>