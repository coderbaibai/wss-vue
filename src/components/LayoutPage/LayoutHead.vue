<template>
    <div id="layoutHead">
        <div id="headName">元件列表</div>
        <div id="editItem">
            <img src="../../assets/seat.svg" />
            <h1>明学楼F5-519-001</h1>
            <p>
                父元件：IKEA家具真皮沙发<br>
                长度：30cm &nbsp;&nbsp;&nbsp;宽度：60cm<br>
                x轴坐标：&nbsp;&nbsp;<input type="text" style="position:relative;left:0.5px" class="lineInput"><br>
                y轴坐标：&nbsp;&nbsp;<input type="text" class="lineInput"><br>
                旋转角度：<input type="text" style="position:relative;left:1.8px" class="lineInput"><br>
            </p>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
*{
	margin: 0;
	padding: 0;
	font-family:微软雅黑;
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
</style>