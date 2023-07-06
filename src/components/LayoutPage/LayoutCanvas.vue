<template>
    <canvas ref="layoutCanvas" id="layoutCanvas" width="328px" height="589px">
		
    </canvas>
</template>

<script>
import {isPointInRotate,RoratePoint,Corner,isPointInRect,redrawAll,isPointInAnyRect,Point,Rect,canvasStatus,getDistance,rotatePoint, detectRectsConflict} from '../../canvas/domain.js'
export default {
	data(){
		return{
			ctx:null,
			canvas:null,
			images:{},
			rects:[],
			imgNum:0
		}
	},
	props:{
	},
	mounted(){
	},
	methods:{
		initCompoments(){
			var k = 0
			var arr = Object.keys(this.images)
			console.log(arr)
			for(var j=10;j<=500;j+=100){
				for(var i=10;i<=250;i+=100){
					this.rects.push(new Rect(k,this.images[arr[k]],new Point(i,j),60,60,0))
					k++
					if(k===this.imgNum){
						redrawAll(this.ctx,this.canvas,this.rects)
						return
					}
				}
			}
		},
		//实现一系列图片的预加载
		//参数sources:图片信息关联数组
		//参数callback:回调函数——图片预加载完成后立即执行此函数。
		loadImages(sources, callback){
			var count = 0;
			for(var src in sources){
				this.imgNum++;  
			}  
			for(let src in sources){  
				this.images[src] = new Image();  
				this.images[src].onload = ()=>{
					console.log('count:',count,'imgNum:',this.imgNum);
					if(++count >= this.imgNum){
						callback(this.images);
					}
				}
				this.images[src].src = sources[src];  
			}
		}
	}
}
</script>

<style scoped>
*{
	margin: 0;
	padding: 0;
	font-family:微软雅黑;
}
</style>