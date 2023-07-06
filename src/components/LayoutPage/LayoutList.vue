<template>
  <div id="edit">
    <!-- -----------------------head------------------------- -->
    <div id="head">
      <div id="layoutHead">
        <div id="headName">元件列表</div>
        <div id="editItem">
          <img src="../../assets/seat.svg" />
          <h1>明学楼F5-519-001</h1>
          <p>
            父元件：IKEA家具真皮沙发<br />
            长度：30cm &nbsp;&nbsp;&nbsp;宽度：60cm<br />
            x轴坐标：&nbsp;&nbsp;<input
              type="text"
              style="position: relative; left: 0.5px"
              class="lineInput"
            /><br />
            y轴坐标：&nbsp;&nbsp;<input type="text" class="lineInput" /><br />
            旋转角度：<input
              type="text"
              style="position: relative; left: 1.8px"
              class="lineInput"
            /><br />
          </p>
        </div>
      </div>
    </div>
    <!-- -----------------------canvas------------------------- -->
    <div id="blackLine"></div>
    <div id="items">
        <canvas ref="layoutCanvas" id="layoutCanvas" width="328px" height="589px">
        </canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditList",
  data() {
    return {
        ctx:null,
        canvas:null,
        images:{},
        rects:[],
        imgNum:0
    };
  },
  props: {
  },
  methods: {
    // initCompoments(){
    //     var k = 0
    //     var arr = Object.keys(this.images)
    //     console.log(arr)
    //     for(var j=10;j<=500;j+=100){
    //         for(var i=10;i<=250;i+=100){
    //             this.rects.push(new Rect(k,this.images[arr[k]],new Point(i,j),60,60,0))
    //             k++
    //             if(k===this.imgNum){
    //                 redrawAll(this.ctx,this.canvas,this.rects)
    //                 return
    //             }
    //         }
    //     }
    // },
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
#layoutHead{
    position:relative;
}
#headName{
    box-sizing:border-box;
    position: absolute;
    top: 0;
    left:1px;
    height: 32px;
    width: 326px;
    font-family: microsoft yahei;
    line-height: 29px;
    font-size: 12px;
    color: rgb(102, 102, 102);
    background-color: rgb(249, 249, 249);
    outline: 1px solid rgb(235, 235, 235);
    padding: 2px 16px 2px 24px;
}
#editItem{
    position: absolute;
    top: 27px;
    left: 0px;
    height: 148px;
    width: 328px;
}
#editItem>img{
  position: absolute;
  top: 12px;
  left: 13px;
  height: 30px;
  width: 30px;
  border-radius: 12.5px;
}
#editItem > h1 {
  position: absolute;
  top: 13px;
  left: 51px;
  width: 200px;
  height: 26px;
  font-family: microsoft yahei;
  color: rgb(101, 101, 101);
  font-size: 18px;
  line-height: 29px;
  font-weight: 700;
}
#editItem > p {
  position: absolute;
  box-sizing: border-box;
  top: 40px;
  left: 0;
  bottom: 0;
  width: 100%;
  padding-left: 40px;
  font-family: microsoft yahei;
  color: rgb(153, 153, 153);
  font-size: 14px;
  line-height: 1.5;
}
.lineInput{
    padding-left: 3px;
    border-bottom:#666 1px solid;
    border-left-width:0px;
    border-right-width:0px;
    border-top-width:0px;
}
.lineInput:focus{
    outline:none;
    border-bottom:deepskyblue 1px solid;
}
#blackLine {
  position: absolute;
  top: 177px;
  z-index: 10;
  width: 100%;
  height: 2px;
  background-color: rgb(121, 121, 121);
}
#edit {
  position: relative;
  display: inline-block;
  background-color: white;
  height: 775px;
  width: 328px;
  top: 0;
  left: 0;
  border-radius: 4px;
}
#items {
  position: absolute;
  top: 179px;
  height: 589px;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: white;
  border-radius: 4px;
}
#items::-webkit-scrollbar {
  display: none;
}
#empty {
  position: absolute;
  height: 47px;
  width: 328px;
  background-color: white;
}
</style>
