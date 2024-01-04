<template>
  <div id="editHead">
    <div id="headName">工位编辑列表</div>
    <div class="serchInfo">
      <p>区域:</p>
      <el-cascader
        size="small"
        class="selectText"
        v-model="selectArea"
        clearable
        placeholder="请选择"
        :options="cascadeAreas"
      >
      </el-cascader>
    </div>
    <div class="serchInfo">
      <p>工位号:</p>
      <el-select
        size="small"
        class="selectText"
        v-model="seat"
        clearable
        filterable
        placeholder="请选择"
        :disabled="!seats.length"
      >
        <el-option
          v-for="(item, index) in seats"
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
import { watch } from 'vue';
export default {
  data() {
    return {
      selectArea: [],
      seat: "",
      emp: "",
      post: "",
      cascadeAreas: [],
      seats:[]
    };
  },
  props: {
    areas: [],
    emps: [],
    posts: [],
    curArea:{}
  },
  mounted(){
    this.searchReservations()
  },
  watch: {
    selectArea:{
      deep:true,
      handler(){
        this.seats = [];
        if(this.selectArea.length!=3)
          return
        this.$http
          .get(`/manage/number?buildingName=${this.selectArea[0]}&floorName=${this.selectArea[1]}&name=${this.selectArea[2]}`, { timeout: 2000 })
          .then((res) => {
            if (res.data.code == 1) {
              var temp;
              var len;
              for (let i = 1; i <= res.data.data; i++) {
                temp = i + "";
                len = temp.length
                for (let j = 0; j < 3 - len; j++) {
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
          this.searchReservations()
      }
    } ,
    seat(){
      this.searchReservations()
    },
    emp(){
      this.searchReservations()
    },
    post(){
      this.searchReservations()
    },
    areas(){
        this.transformAreaToCascade()
    },
    curArea(){
      // if(this.selectArea.length==0){
      //     this.selectArea[0]=(this.curArea.buildingName);
      //     this.selectArea[1]=(this.curArea.floorName);
      //     this.selectArea[2]=(this.curArea.name);
      // }
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
    searchReservations(){
      // if(this.selectArea.length!=0||this.seat!=""||this.emp!=""||this.post!=""){
        this.$http.post("/reservations/search",{
          buildingName:this.selectArea[0],
          floorName:this.selectArea[1],
          name:this.selectArea[2],
          workstationSid:this.seat,
          username:this.emp,
          post: this.post
        }).then(res=>{
          if(res.data.data==null)
            res.data.data = []
          this.$emit("changeItems",res.data.data);
        })
        .catch(e=>{
          this.$message.error("服务器访问异常")
        })
      // }
    }
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
#editHead > div:nth-child(5) {
  top: 166px;
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
