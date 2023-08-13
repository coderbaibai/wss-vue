<template>
  <div id="editHead">
    <div id="headName">工位编辑列表</div>
    <div class="serchInfo">
      <p>工位号:</p>
      <el-cascader
        size="small"
        class="selectText"
        v-model="seat"
        clearable
        placeholder="请选择"
        :options="cascadeAreas"
      >
      </el-cascader>
    </div>
    <div class="serchInfo">
      <p>员工姓名:</p>
      <el-select
        size="small"
        class="selectText"
        v-model="emp"
        clearable
        filterable
        placeholder="请选择"
      >
        <el-option
          v-for="(item, index) in emps"
          :key="index"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </div>
    <div class="serchInfo">
      <p>员工职位:</p>
      <el-select
        size="small"
        class="selectText"
        v-model="post"
        clearable
        filterable
        placeholder="请选择"
      >
        <el-option
          v-for="(item, index) in posts"
          :key="index"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectArea: "",
      seat: "",
      emp: "",
      post: "",
      cascadeAreas: [],
    };
  },
  props: {
    areas: [],
    emps: [],
    posts: [],
  },
  watch: {
    selectArea() {
      this.seats = [];
      this.$http
        .get("/manage/number", { timeout: 2000 })
        .then((res) => {
          if (res.data.code == 1) {
            var temp;
            for (let i = 1; i <= res.data.data; i++) {
              temp = i + "";
              for (let j = 0; j < 3 - temp.length; j++) {
                temp = "0" + temp;
              }
              this.seats.push(temp);
            }
          } else {
            this.$message.error(res.data.data);
          }
        })
        .catch(() => {
          this.$message.error("服务器访问异常");
        });
    },
    areas(){
        this.transformAreaToCascade()
    }
  },
  methods: {
    transformAreaToCascade() {
      for (const area of this.areas) {
        var isBuildingContain = false;
        for (const building of this.cascadeAreas) {
          if (area.buildingName == building.label) {
            isBuildingContain = true
            var isFloorContain = false
            for(const floor of building.children){
                if(area.floorName==floor.label){
                    isFloorContain = true
                    floor.children.push({
                        value:area.name,
                        label:area.name
                    })
                    break;
                }
            }
            if(!isFloorContain){
                building.children.push({
                    value: area.floorName,
                    label: area.floorName,
                    children: [{ value: area.name, label: area.name }],
                })
            }
            break;
          }
        }
        if (!isBuildingContain)
          this.cascadeAreas.push({
            value: area.buildingName,
            label: area.buildingName,
            children: [
              {
                value: area.floorName,
                label: area.floorName,
                children: [{ value: area.name, label: area.name }],
              },
            ],
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0px;
}
#editHead {
  box-sizing: border-box;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: white;
}
#headName {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 1px;
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
.serchInfo {
  position: absolute;
  left: 16px;
  height: 29px;
  width: 297px;
}
#editHead > div:nth-child(2) {
  top: 46px;
}
#editHead > div:nth-child(3) {
  top: 86px;
}
#editHead > div:nth-child(4) {
  top: 126px;
}
.serchInfo > p {
  position: absolute;
  top: 0;
  left: 0;
  font-family: microsoft yahei;
  font-size: 14px;
  line-height: 30px;
  color: rgb(102, 102, 102);
}
.serchInfo > .selectText {
  position: absolute;
  left: 122px;
  right: 0;
  height: 30px;
}
</style>
