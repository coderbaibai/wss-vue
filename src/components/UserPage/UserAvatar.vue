<template>
  <div @mouseenter="mouseIn" @mouseleave="mouseOut" id="avatarBox">
    <img
      @click="beginEdit"
      v-show="isShowEdit"
      id="changeImg"
      src="../../assets/change.svg"
    />
    <img id="avatarImg" src="../../assets/cat.jpg" alt="user's avatar">
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowEdit: false,
      circleUrl: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
    };
  },
  methods: {
    mouseIn() {
      this.isShowEdit = true;
    },
    mouseOut() {
      this.isShowEdit = false;
    },
    beginEdit() {
      console.log("beginEdit");
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
#avatarImg{
  height: 200px;
  width: 200px;
  border-radius: 100px;
  object-fit: cover;
  flex: 1;
}
#avatarBox {
  position: relative;
  height: 200px;
  width: 200px;
  top: 0;
  left: 0;

}
#changeImg {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 28px;
  width: 28px;
}
#changeImg:hover {
  cursor: pointer;
}
</style>
