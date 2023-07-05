<template>
	<div id="app">
		<div v-if="this.infoType===0">
			<StartPageVue @login="changeInfoType"/>
		</div>
		<div v-else-if="this.infoType===1">
			<BasePageVue/>
			<div id="container"><router-view @logout="logout"></router-view></div>
		</div>
		<div v-else-if="this.infoType===2">
			<CommonBasePageVue/>
			<div id="container"><router-view @logout="logout"></router-view></div>
		</div>
	</div>
</template>

<script>
import StartPageVue from './components/StartPage/StartPage.vue'
import BasePageVue from './components/BasePage/BasePage.vue'
import CommonBasePageVue from './components/BasePage/CommonBasePage.vue'
export default {
	data(){
		return{
			infoType:0
		}
	},
	mounted(){
		console.log(this.infoType);
	},
	methods:{
		changeInfoType(t){
			this.$router.push('/',()=>{},()=>{})
			if(!t)
				this.infoType=2
			else
				this.infoType = t
			console.log(this.infoType);
		},
		logout(){
			this.infoType = 0
		}
	},
 	name:'App',
  	components:{
		BasePageVue,
		StartPageVue,
		CommonBasePageVue
  	}
}
</script>

<style>
#container{
	position: relative;
	top: -858px;
}
</style>