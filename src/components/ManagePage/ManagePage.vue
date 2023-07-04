<template>
  <div id="app">
    <div id="edl">
      <EditList
        :itemInfos="itemInfos"
        :emps="emps"
        :posts="posts"
        :seats="seats"
      ></EditList>
    </div>
    <div id="mainWindow">
      <MainWindowVue/>
    </div>
  </div>
</template>

<script>
import EditList from "../EditList/EditList.vue";
import MainWindowVue from '../ManagePage/MainWindow.vue';
export default {
  name: "ManagePage",
  data() {
    return {
      itemInfos: [
        {
          name: "张三",
          url: "../assets/round_people.png",
          wid: 2367181912,
          sid: "A401",
          post: "高级开发工程师",
          begin: "2023-3-01",
          end: "2023-3-01",
        },
        {
          name: "张三",
          url: "../assets/round_people.png",
          wid: 2367181912,
          sid: "A401",
          post: "高级开发工程师",
          begin: "2023-3-01",
          end: "2023-3-01",
        },
        {
          name: "张三",
          url: "../assets/round_people.png",
          wid: 2367181912,
          sid: "A401",
          post: "高级开发工程师",
          begin: "2023-3-01",
          end: "2023-3-01",
        },
        {
          name: "张三",
          url: "../assets/round_people.png",
          wid: 2367181912,
          sid: "A401",
          post: "高级开发工程师",
          begin: "2023-3-01",
          end: "2023-3-01",
        },
      ],
      emps: ["张三", "李四", "王五"],
      posts: ["高级开发工程师", "中级开发工程师", "初级开发工程师"],
      seats: [
        12345678, 23456781, 34567812, 45678123, 56781234, 67812345, 78123456,
        81234567,
      ],
    };
  },
  components: {
    EditList,
    MainWindowVue
  },
};
</script>

<style scoped>
#edl {
  position: absolute;
  top: 34px;
  left: 1220px;
  height: 810px;
  width: 330px;
}
#mainWindow{
  position: absolute;
  top: 15px;
  left: 115px;
}
</style>
