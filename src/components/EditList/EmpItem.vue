<template>
  <div class="editItem">
    <!-- <img :src="itemInfo.url"> -->
    <img src="../../assets/round_people.png" />
    <h1>张三</h1>
    <img src="../../assets/edit.png" />
    <p>
      人员编号：{{ itemInfo.wid }}<br />
      工位编号：{{ itemInfo.sid }}<br />
      职位：{{ itemInfo.post }}<br />
      工位使用开始时间：{{ itemInfo.begin }}<br />
      工位使用结束时间：{{ itemInfo.end }}<br />
    </p>
  </div>
</template>
<script>
// 输入样例
//   itemInfo:{
//         name: "张三",
//         url: "../assets/round_people.png",
//         wid:2367181912,
//         sid:"A401",
//         post:"高级开发工程师",
//         begin:"2023-3-01",
//         end:"2023-3-01"
//     }
export default {
  props: {
    itemInfo: {
      name: Number,
      url: String,
      wid: Number,
      sid: String,
      post: String,
      begin: String,
      end: String,
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
}
.editItem {
  position: relative;
  margin: 0 auto;
  width: 328px;
  height: 159px;
  background-color: white;
}
.editItem > img:first-of-type {
  position: absolute;
  top: 12px;
  left: 26px;
  height: 30px;
  width: 30px;
  border-radius: 12.5px;
}
.editItem > img:last-of-type {
  position: absolute;
  top: 12px;
  left: 286px;
  height: 25px;
  width: 25px;
}
.editItem > h1 {
  position: absolute;
  top: 12px;
  left: 63px;
  width: 38px;
  height: 26px;
  font-family: microsoft yahei;
  color: rgb(101, 101, 101);
  font-size: 18px;
  line-height: 29px;
  font-weight: 700;
}
.editItem > p {
  position: absolute;
  box-sizing: border-box;
  top: 44px;
  left: 0;
  bottom: 0;
  width: 100%;
  padding-left: 40px;
  font-family: microsoft yahei;
  color: rgb(153, 153, 153);
  font-size: 14px;
  line-height: 1.5;
}
.editItem:hover {
  z-index: 15;
  outline: 1.5px solid deepskyblue;
}
</style>
