<template>
  <div @mouseenter="mouseIn" @mouseleave="mouseOut" id="avatarBox">
    <img
      @click="beginEdit"
      v-show="isShowEdit"
      id="changeImg"
      src="@/assets/change.svg"
    />
    <img id="avatarImg" :src="url" alt="user's avatar">
    <UploadDialogVue @close="close" @updateUrl="updateUrl" :isEdit="isEdit" target="users"/>
  </div>
</template>

<script>
import UploadDialogVue from '../UploadDialog/UploadDialog.vue';
export default {
  data() {
    return {
      isShowEdit: false,
      isEdit:false,
    };
  },
  props:['url'],
  components:{
    UploadDialogVue
  },
  methods: {
    mouseIn() {
      this.isShowEdit = true;
    },
    mouseOut() {
      this.isShowEdit = false;
    },
    beginEdit() {
      this.isEdit = true
    },
    close(){
      this.isEdit = false
    },
    updateUrl(url){
      this.$emit("updateUrl",url)
    }
  },
};
</script>

<style lang="scss" scoped>

#avatarImg{
  object-fit: cover;
  object-position: center;
  height: 200px;
  width: 200px;
  border-radius: 100px;
  object-fit: cover;
  flex: 1;
}
#avatarBox {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
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
