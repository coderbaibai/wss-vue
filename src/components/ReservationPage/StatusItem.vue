<template>
<div style="position:relative">
	<div class="seatStatus" v-if="busy">
		<div class="innerStatus" id="busy" style="background-color: rgb(204, 204, 204)">
			<img class="statusImg" src="../../assets/use.png">
		</div>
		<p class="statusInfo">使用中</p>
		<p class="numberInfo">{{statusNumber}}</p>
	</div>
	<div class="seatStatus" v-else-if="free">
		<div class="innerStatus" id="free" style="background-color: rgb(51, 204, 0)">
			<img class="statusImg" src="../../assets/free.png">
		</div>
		<p class="statusInfo">空闲</p>
		<p class="numberInfo">{{statusNumber}}</p>
	</div>
	<div class="seatStatus" v-else-if="reserved">
		<div class="innerStatus" id="reserved" style="background-color: rgb(0, 170, 239)">
			<img class="statusImg" src="../../assets/book.png">
		</div>
		<p class="statusInfo">已预约</p>
		<p class="numberInfo">{{statusNumber}}</p>
	</div>
	<div class="seatStatus" v-else-if="allocated">
		<div class="innerStatus" id="allocated" style="background-color: rgb(255, 204, 0)">
			<img class="statusImg" src="../../assets/allocated.svg">
		</div>
		<p class="statusInfo">已分配</p>
		<p class="numberInfo">{{statusNumber}}</p>
	</div>
	<div class="seatStatus" v-else-if="error">
		<div class="innerStatus" id="error" style="background-color: rgb(255, 0, 0)">
			<img class="statusImg" src="../../assets/exception.png">
		</div>
		<p class="statusInfo">异常</p>
		<p class="numberInfo">{{statusNumber}}</p>
	</div>
</div>
<!-- <div class="seatStatus">
	<div class="StatusLeft" id = "usingLeft">
		<img class="StatusImg" src="imgs/use.png">
	</div>
	<p class="statusInfo">使用中</p>
	<p class="numberInfo">124</p>
</div> -->
</template>

<script>
export default {
	data(){
		return{
			statusNumber:128
		}
	},
    props:{
        busy:Boolean,
        free:Boolean,
        reserved:Boolean,
		allocated:Boolean,
		error:Boolean
    }
}
</script>

<style scoped>
*{
	margin: 0;
	padding: 0;
}
.seatStatus{
    background-color: white;
    position: relative;
    height: 94px;
    width: 210px;
    border-radius: 4px;
}
.innerStatus{
	position:absolute;
    top: 16px;
    left: 22px;
    height: 56px;
    width: 56px;
    border-radius: 28px;
}
.statusImg{
	margin: 15%;
    height: 70%;
    width: 70%;
}
.statusInfo{
	position: absolute;
    top: 19px;
    left: 79px;
    font-family: 'PingFang HK';
    font-size: 16px;
    color: rgb(152, 152, 152);
    padding-left: 24px
}
.numberInfo{
    position: absolute;
    top: 36px;
    left: 74px;
    font-family: 'Helvetica Neue';
	font-weight: 500;
    font-size: 36px;
    color: rgb(102, 102, 102);
    padding-left: 24px
}
</style>