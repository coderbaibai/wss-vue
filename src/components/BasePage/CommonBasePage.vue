<template>
<div id="basePage">
  <div class="top-guide">
        <span id="links">{{pageName}}</span>
        <span id="name">Tom</span>
        <span id="avatar"><a href="#"><img src="../../assets/sleepCat.jpg" alt="user's avatar"></a></span>
        <span id="help"><a href="#">帮助</a></span>
        <span id="helpImg"><a href="#"><img class="question" src="../../assets/问号.png" alt="help"></a></span>
    </div>
    <div id="left-guide">
        <ul>
            <li><img src="../../assets/HIT.png" alt="" style="width:185px;"></li>
            <li :class="liObject[0]" @click ="turnToUser(0)"><div class="left-div"></div><div class="textDiv" href="#">工位预约</div></li>
            <li :class="liObject[1]" @click ="turnToUser(1)"><div class="left-div"></div><div class="textDiv" href="#">个人主页</div></li>
        </ul>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            pageName : '导航',
            liObject:[]
        }
    },
    methods:{
        turnToUser(target){
            this.liObject = new Array(7)
            this.liObject.splice(target,1,"curPage")
            switch(target){
                case 0:
                    this.pageName = '工位预约'
                    this.$router.push({path:"/base/reservation"},()=>{},()=>{})
                    break;
                case 1:
                    this.pageName = '个人主页'
                    this.$router.push({path:"/base/user"},()=>{},()=>{})
                    break;
            }
        }
    },
    props:{
        url:String
    }
}
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
    font-family:微软雅黑;
}
#basePage{
    height: 900px;
    width: 1544px;
    background-color: rgb(215, 215, 215);
}
a{
    text-decoration: none;
}
.curPage{
    background-color: rgb(16,141,233,0.6) !important;
}
/* 以下为左侧导航栏 */
#left-guide{
    position: absolute;
    left: 0;
    height: 890px;
    width: 224px;
    background-color: rgb(63, 63, 63);
}
#left-guide li{
    list-style-type: none;
    margin-top: 25px;
    margin-bottom: 10px;
    text-align: center;
    font-size: 12px;
}
#left-guide ul>li:nth-of-type(n+2){
    position:relative;
    display: inline-block;
    margin: 0px;
    width: 100%;
    height: 42px;
    background-color: rgb(63, 63, 63);
    line-height: 42px;
    text-align: left;
    font-size: 15px;
    font-family: Microsoft YaHei;
    color: rgb(255,255,255);
}
#left-guide ul>li:nth-of-type(n+2):hover{
    cursor:pointer;
}
.left-div{
    position: absolute;
    height: 11px;
    width: 11px;
    top: 16px;
    left: 18px;
    background-color: rgb(126, 126, 126);
    border: 1px;
    border-color: rgb(149, 149, 149);
}
.textDiv{
    height: 100%;
    width: 78%;
    display: block;
    color:gray;
    padding-left: 40px;
}

/* 以下为顶部导航栏 */
.top-guide{
    position:absolute;
    top:0;
    width: 1544px;
    height: 64px;
    background-color: rgb(255,255,255);
}

.top-guide>span{
    float: right;
    margin-top: 20px;
}
#links{
    float: none;
    display: inline-block;
    font-size: large;
    font-weight: 700;
    color: rgb(101,101,101);
    margin-left: 250px;
    margin-top: 30px;
}
/* #links>a{
    font-size: medium;
    color: rgb(153, 153, 153);
}
#links>a:last-of-type{
    font-size: large;
    font-weight: 700;
    color: rgb(101,101,101);
} */
#name,#help{
    margin-right: 100px;
    margin-top: 25px;
    font-size: medium;
    color: rgb(153, 153, 153);
}
#avatar{
    margin-right: 15px;
    height: 36px;
    width: 36px;
    border-radius: 18px;
    overflow: hidden;
    text-align: center center;
}
#avatar img{
    height: 36px;
    width: 36px;
}
#help{
    margin-right: 24px;
}
#help>a{
    color: rgb(153, 153, 153);
}
#helpImg{
    margin-top: 28px;
    margin-right: 15px;
}
.question{
    width: 20px;
    height: 20px;
}
</style>