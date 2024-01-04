<template>
<div>
<div id="app">
    <div id="mainWindow">
      <MainWindowVue :areas="areas" @changeArea="changeArea"/>
    </div>
    <div id="edl">
      <EditList
        :emps="emps"
        :posts="posts"
        :areas="areas"
        :curArea="curArea"
      ></EditList>
    </div>
  </div>
</div>
</template>

<script>
import EditList from "../EditList/EditList.vue";
import MainWindowVue from '../Mainwindow/MainWindow.vue';
export default {
  data(){
    return{
      areas:[],
      emps:[],
      posts:[],
      curArea:{},
    }
  },
  name: "ManagePage",
  components: {
    EditList,
    MainWindowVue
  },
  mounted(){
    this.getBaseInfo()
  },
  methods:{
    getBaseInfo(){
      this.$http.get("/manage/infos",{timeout:2000})
      .then(res=>{
        if(res.data.code==0){
          this.$message.error(res.data.msg)
        }
        else{
          this.emps = res.data.data.empNames;
          this.posts = res.data.data.posts;
          this.areas = res.data.data.areas;
        }
      })
      .catch(()=>{
        this.$message("服务器访问异常")
      })
    },
    changeArea(area){
      this.curArea = area
    }
  }
};
</script>

<style scoped>
#edl {
  /* position: absolute;
  top: 34px;
  left: 1210px; */
  height: 100%;
  width: 328px;
  flex-shrink: 0;
  margin-left: 10px;
  padding-bottom: 10px;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);
}
#mainWindow{
  /* position: absolute;
  top: 15px;
  left: 115px; */
  width: 100%;
  height: 100%;
}
#app{
  display: flex;
  width: 99.5%;
  height: 100%;
}
</style>
