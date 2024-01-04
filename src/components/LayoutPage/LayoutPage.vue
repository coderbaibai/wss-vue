<template>
  <div>
    <div id="layout" ref="layout" @mouseup="containerMouseUp">
      <div id="layoutWindow">
        <div id="mainWindow" ref="mainWindow">
          <div id="header">
            <div id="areaItems">
              <div id="floorItems">
                <!-- 办公楼下拉框 -->
                <span class="floorInfo">办公楼:</span>
                <div style="width: 93px" class="selectItem">
                  <el-select
                    clearable
                    size="mini"
                    id="ffs"
                    v-model="selectBuilding"
                  >
                    <el-option
                      v-for="building in buildings"
                      :key="building"
                      :label="building"
                      :value="building"
                    ></el-option
                  ></el-select>
                </div>
                <!-- 楼层下拉框 -->
                <span class="floorInfo">楼层:</span>
                <div class="selectItem">
                  <el-select
                    :disabled="floorDisabled"
                    clearable
                    id="sfs"
                    size="mini"
                    v-model="selectFloor"
                    ><el-option
                      v-for="floor in floors"
                      :key="floor"
                      :label="floor"
                      :value="floor"
                    ></el-option
                  ></el-select>
                </div>
                <!-- 房间下拉框 -->
                <span class="floorInfo">房间号:</span>
                <div class="selectItem">
                  <el-select
                    :disabled="areaDisabled"
                    clearable
                    id="tfs"
                    size="mini"
                    v-model="selectRoom"
                  >
                    <el-option
                      v-for="room in rooms"
                      :key="room"
                      :label="room"
                      :value="room"
                    ></el-option
                  ></el-select>
                </div>
              </div>
              <div id="addDiv">
                <span class="innerSpan"></span>
                <el-button
                  @click="addPage"
                  icon="el-icon-circle-plus-outline"
                  class="innerText"
                  type="primary"
                ></el-button>
              </div>
              <div id="changeDiv">
                <span class="innerSpan"></span>
                <el-button
                  @click="changePage"
                  icon="el-icon-edit"
                  type="primary"
                  class="innerText"
                ></el-button>
              </div>
              <div id="deleteDiv">
                <span class="innerSpan"></span>
                <el-popconfirm
                  title="确定删除当前页面及其布局吗"
                  @confirm="deleteArea"
                >
                  <el-button
                    slot="reference"
                    icon="el-icon-delete"
                    class="innerText"
                    type="danger"
                  ></el-button>
                </el-popconfirm>
              </div>
            </div>
            <div id="refreshDiv">
              <span class="innerSpan">保存</span>
              <el-button
                id="saveText"
                type="primary"
                @click="saveCompomentsInstances"
              ></el-button>
            </div>
          </div>
          <canvas
            tabindex="0"
            :style="canvasStyle"
            id="canvasBox"
            :width="canvasWidth + 'px'"
            :height="canvasHeight + 'px'"
            ref="canvas"
            @mousemove="mainMouseMove"
            @mousedown="mainMouseDown"
            @mouseup="mainMouseUp"
            @mouseleave="mainMouseLeave"
            @mouseenter="mainMouseEnter"
            @keydown="mainKeyDown"
          >
          </canvas>
        </div>
      </div>
      <!-- ----------------------LayoutList-------------------------- -->
      <div id="layoutList">
        <div id="edit">
          <!-- -----------------------head------------------------- -->
          <div id="head">
            <div id="layoutHead">
              <div id="headName">元件列表</div>
              <div class="editItem" v-if="!isAnySelected">
                <img src="../../assets/district.svg" />
                <h1>{{area.buildingName}}{{area.floorName}}{{area.name}}</h1>
                <p>
                  组件数量：&nbsp;&nbsp;{{rects.length}}<br />
                  长度：{{area.width}}cm &nbsp;&nbsp;&nbsp;宽度：{{area.height}}cm<br />
                  <strong style="font-size:25px">点击组件以查看详细</strong>
                </p>
              </div>
              <div class="editItem" v-else>
                <img src="../../assets/seat.svg" />
                <h1>{{area.buildingName}}{{area.floorName}}{{area.name}}</h1>
                <p>
                  父元件：{{privateComponents[detailObj.pid].name}}<br />
                  长度：{{privateComponents[detailObj.pid].width}}cm &nbsp;&nbsp;&nbsp;宽度：{{privateComponents[detailObj.pid].height}}cm<br />
                  x轴坐标：&nbsp;&nbsp;<input
                    type="text"
                    style="position: relative; left: 0.5px"
                    class="lineInput"
                    v-model.number="detailObj.anchor.x"
                  /><br />
                  y轴坐标：&nbsp;&nbsp;<input
                    type="text"
                    class="lineInput"
                    v-model.number="detailObj.anchor.y"
                  /><br />
                  旋转角度：<input
                    type="text"
                    style="position: relative; left: 1.8px"
                    class="lineInput"
                    v-model.number="detailObj.rotate"
                  /><br />
                </p>
              </div>
            </div>
          </div>
          <!-- -----------------------canvas------------------------- -->
          <div id="blackLine"></div>
          <div id="items">
            <canvas
              @contextmenu.prevent="rightClickServe"
              @mousemove="serverMouseMove"
              @mousedown="serverMouseDown"
              @mouseleave="serverMouseLeave"
              @mouseup="serverMouseUp"
              ref="canvasServe"
              id="layoutCanvas"
              width="328px"
              height="578px"
            >
            </canvas>
          </div>
        </div>
      </div>
      <!-- ----------------------mainWindow-------------------------- -->

      <!-- ---------------------------对话框------------------------------------ -->
      <el-dialog
        @open="setVolatileArea"
        @closed="clearAreaChange"
        title="区域修改"
        :visible.sync="isChange"
      >
        <h2>修改前</h2>
        <el-form label-position="right" label-width="80px">
          <el-row :gutter="10" type="flex" justify="space-between">
            <el-form-item label="办公楼">
              <el-input v-model.trim="area.buildingName" disabled></el-input>
            </el-form-item>
            <el-form-item label="楼层">
              <el-input v-model.trim="area.floorName" disabled></el-input>
            </el-form-item>
            <el-form-item label="区域名">
              <el-input v-model.trim="area.name" disabled></el-input>
            </el-form-item>
          </el-row>
          <el-row :gutter="10" type="flex" justify="start">
            <el-form-item label="长度">
              <el-input v-model.number.trim="area.width" disabled></el-input>
            </el-form-item>
            <el-form-item label="宽度">
              <el-input v-model.number.trim="area.height" disabled></el-input>
            </el-form-item>
          </el-row>
        </el-form>
        <hr style="border: 1px dashed #000" />
        <h2>修改后</h2>
        <el-form label-position="right" label-width="80px">
          <el-row :gutter="10" type="flex" justify="space-between">
            <el-form-item label="办公楼">
              <el-input v-model.trim="volatileArea.buildingName"></el-input>
            </el-form-item>
            <el-form-item label="楼层">
              <el-input v-model.trim="volatileArea.floorName"></el-input>
            </el-form-item>
            <el-form-item label="区域名">
              <el-input v-model.trim="volatileArea.name"></el-input>
            </el-form-item>
          </el-row>
          <el-row :gutter="10" type="flex" justify="start">
            <el-form-item label="长度">
              <el-input v-model.number.trim="volatileArea.width"
                ><template slot="append">厘米</template></el-input
              >
            </el-form-item>
            <el-form-item label="宽度">
              <el-input v-model.number.trim="volatileArea.height"
                ><template slot="append">厘米</template></el-input
              >
            </el-form-item>
          </el-row>
        </el-form>
        <div slot="footer">
          <el-button
            @click="changeArea"
            :disabled="isVolatileDiff"
            type="primary"
            >修改</el-button
          >
          <el-button @click="isChange = false">取消</el-button>
        </div>
      </el-dialog>
      <el-dialog @closed="clearAreaAdd" title="增添区域" :visible.sync="isAdd">
        <el-form label-position="right" label-width="60px">
          <el-row :gutter="10" type="flex">
            <el-form-item label="办公楼">
              <el-input
                v-model.trim="newArea.buildingName"
                placeholder="请输入楼名"
              ></el-input>
            </el-form-item>
            <el-form-item label="楼层数">
              <el-input
                v-model.trim="newArea.floorName"
                placeholder="请输入楼层数"
              ></el-input>
            </el-form-item>
            <el-form-item label="区域号">
              <el-input
                v-model.trim="newArea.name"
                placeholder="请输入区域名或房间号"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row :gutter="10" type="flex" justify="space-between">
            <el-form-item label="区域长">
              <el-input
                v-model.number.trim="newArea.width"
                placeholder="请输入长度"
                ><template slot="append">厘米</template></el-input
              >
            </el-form-item>
            <el-form-item label="区域宽">
              <el-input
                v-model.number.trim="newArea.height"
                placeholder="请输入宽度"
                ><template slot="append">厘米</template></el-input
              >
            </el-form-item>
          </el-row>
        </el-form>
        <div slot="footer">
          <el-button @click="addArea" type="primary">创建</el-button>
          <el-button @click="isAdd = false">取消</el-button>
        </div>
      </el-dialog>
      <el-dialog @closed="clearPcAdd" title="添加相似组件" :visible.sync="isAddPc" width="700px">
        <el-form label-position="right" label-width="60px">
          <el-row :gutter="10" type="flex">
            <el-form-item label="名称">
              <el-input
                v-model.trim="newPrivateComponent.name"
                placeholder="请输入新组件名"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row :gutter="10" type="flex" >
            <el-form-item label="组件长">
              <el-input
                v-model.number.trim="newPrivateComponent.width"
                placeholder="请输入长度"
                ><template slot="append">厘米</template></el-input
              >
            </el-form-item>
            <el-form-item label="组件宽">
              <el-input
                v-model.number.trim="newPrivateComponent.height"
                placeholder="请输入宽度"
                ><template slot="append">厘米</template></el-input
              >
            </el-form-item>
          </el-row>
        </el-form>
        <div slot="footer">
          <el-button @click="addPrivateCompoments" type="primary">创建</el-button>
          <el-button @click="isAddPc = false">取消</el-button>
        </div>
      </el-dialog>
      <el-dialog
        @closed="clearPcChange"
        title="修改私有组件"
        :visible.sync="isPcChange"
      >
        <h2>修改前</h2>
        <el-form label-position="right" label-width="60px">
          <el-row :gutter="10" type="flex">
            <el-form-item label="名称">
              <el-input
                v-model.trim="originalPrivateComponent.name"
                placeholder="请输入新组件名"
                disabled
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row :gutter="10" type="flex" >
            <el-form-item label="组件长">
              <el-input
                v-model.number.trim="originalPrivateComponent.width"
                placeholder="请输入长度"
                disabled
                ><template slot="append">厘米</template></el-input
              >
            </el-form-item>
            <el-form-item label="组件宽">
              <el-input
                v-model.number.trim="originalPrivateComponent.height"
                placeholder="请输入宽度"
                disabled
                ><template slot="append">厘米</template></el-input
              >
            </el-form-item>
          </el-row>
        </el-form>
        <hr style="border: 1px dashed #000" />
        <h2>修改后</h2>
        <el-form label-position="right" label-width="60px">
          <el-row :gutter="10" type="flex">
            <el-form-item label="名称">
              <el-input
                v-model.trim="volatilePrivateComponent.name"
                placeholder="请输入新组件名"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row :gutter="10" type="flex" >
            <el-form-item label="组件长">
              <el-input
                v-model.number.trim="volatilePrivateComponent.width"
                placeholder="请输入长度"
                ><template slot="append">厘米</template></el-input
              >
            </el-form-item>
            <el-form-item label="组件宽">
              <el-input
                v-model.number.trim="volatilePrivateComponent.height"
                placeholder="请输入宽度"
                ><template slot="append">厘米</template></el-input
              >
            </el-form-item>
          </el-row>
        </el-form>
        <div slot="footer">
          <el-button
            @click="changePrivateCompoments"
            :disabled="isVolatilePcDiff"
            type="primary"
            >修改</el-button
          >
          <el-button @click="isPcChange = false">取消</el-button>
        </div>
      </el-dialog>
      <el-dialog
        @closed="clearImgChange"
        title="从组件库中添加"
        :visible.sync="isAddImg"
        width="600px">
        <div id="imgOuter">
          <div class="imgLine">
            <div class="imgInner"><img-item-vue @changeChosens="changeChosens" :source="getWscUrl(0)" :isChosen="getWscBool(0)"></img-item-vue></div>
            <div class="imgInner"><img-item-vue @changeChosens="changeChosens" :source="getWscUrl(1)" :isChosen="getWscBool(1)"></img-item-vue></div>
            <div class="imgInner"><img-item-vue @changeChosens="changeChosens" :source="getWscUrl(2)" :isChosen="getWscBool(2)"></img-item-vue></div>
            <div class="imgInner"><img-item-vue @changeChosens="changeChosens" :source="getWscUrl(3)" :isChosen="getWscBool(3)"></img-item-vue></div>
          </div>
          <div class="imgLine">
            <div class="imgInner"><img-item-vue @changeChosens="changeChosens" :source="getWscUrl(4)" :isChosen="getWscBool(4)"></img-item-vue></div>
            <div class="imgInner"><img-item-vue @changeChosens="changeChosens" :source="getWscUrl(5)" :isChosen="getWscBool(5)"></img-item-vue></div>
            <div class="imgInner"><img-item-vue @changeChosens="changeChosens" :source="getWscUrl(6)" :isChosen="getWscBool(6)"></img-item-vue></div>
            <div class="imgInner"><img-item-vue @changeChosens="changeChosens" :source="getWscUrl(7)" :isChosen="getWscBool(7)"></img-item-vue></div>
          </div>
          <div class="imgLine">
            <div class="imgInner"><img-item-vue @changeChosens="changeChosens" :source="getWscUrl(8)" :isChosen="getWscBool(8)"></img-item-vue></div>
            <div class="imgInner"><img-item-vue @changeChosens="changeChosens" :source="getWscUrl(9)" :isChosen="getWscBool(9)"></img-item-vue></div>
            <div class="imgInner"><img-item-vue @changeChosens="changeChosens" :source="getWscUrl(10)" :isChosen="getWscBool(10)"></img-item-vue></div>
            <div class="imgInner"><img-item-vue @changeChosens="changeChosens" :source="getWscUrl(11)" :isChosen="getWscBool(11)"></img-item-vue></div>
          </div>
          <div class="imgLine">
            <div class="imgInner"><img-item-vue @changeChosens="changeChosens" :source="getWscUrl(12)" :isChosen="getWscBool(12)"></img-item-vue></div>
            <div class="imgInner"><img-item-vue @changeChosens="changeChosens" :source="getWscUrl(13)" :isChosen="getWscBool(13)"></img-item-vue></div>
            <div class="imgInner"><img-item-vue @changeChosens="changeChosens" :source="getWscUrl(14)" :isChosen="getWscBool(14)"></img-item-vue></div>
            <div class="imgInner"><img-item-vue @changeChosens="changeChosens" :source="getWscUrl(15)" :isChosen="getWscBool(15)"></img-item-vue></div>
          </div>
        </div>
        <div slot="footer">
            <el-button
              @click="changeImgs"
              :disabled="!isAddImgChange"
              type="primary"
              >添加</el-button
            >
            <el-button @click="isAddImg = false">取消</el-button>
        </div>
      </el-dialog>
      <RightMenuVue
        :rightclickInfo="rightClickInfo"
        @addPc="addPc"
        @changePc="changePc"
        @deletePc="deletePc"
        @muiltiAdd="muiltiAdd"
        @addCI="addCI"
      />
    </div>
  </div>
</template>

<script>
import {
  setRectAbove,
  isPointInRotate,
  RoratePoint,
  Corner,
  isPointInRect,
  redrawAll,
  isPointInAnyRect,
  Point,
  Rect,
  canvasStatus,
  getDistance,
  rotatePoint,
  detectRectsConflict,
} from "../../canvas/domain.js";
import RightMenuVue from "../Menu/RightMenu.vue";
import ImgItemVue from './ImgItem.vue';
export default {
  name: "LayoutPage",
  components: {
    RightMenuVue,
    ImgItemVue
  },
  data() {
    return {
      //有关区域更新的变量
      area: {}, //当前的区域信息，只有在确定后改变，要么为空，要么完整，area变量仅在与后端交互后更新
      volatileArea: {
        buildingName: "",
        floorName: "",
        name: "",
        width: 0,
        height: 0,
      }, //当前修改后的区域信息，
      newArea: {
        buildingName: "",
        floorName: "",
        name: "",
        width: "",
        height: "",
      }, //新增区域信息
      areas: [], //所有区域信息，在进入页面，新增页面、删除页面、修改页面后更新
      //将areas筛选后得到的三个数组，其中buidings是固定的，只会随着areas的变化而改变
      //而floors和rooms是根据buidings的变化而变化的
      buildings: [],
      floors: [],
      rooms: [],
      //正在选择中的区域，用于区域框更新算法
      selectBuilding: "",
      selectFloor: "",
      selectRoom: "",
      //--------------------------------
      once: false, //once变量确保图片只加载一次
      isAdd: false,
      isChange: false,
      isDelete: false,
      isVolatileDiff: false,
      isAddPc:false,
      sources: {},
      images: {},
      imgNum: 0,
      //私有组件
      privateComponents: {},
      newPrivateComponent: {
        name: "",
        width: null,
        height: null,
        parentId:null,
      },
      volatilePrivateComponent:{
        name: "",
        width: null,
        height: null,
        id:null
      },
      originalPrivateComponent:{
        name: "",
        width: null,
        height: null,
        id:null
      },
      isPcChange:false,
      curComponent: {
        pid: 0,
        imageUrl: "",
      },
      //组件实例
      components: [],
      // 添加区域
      //主窗口数据
      ratio: 0,
      floorDisabled: true,
      areaDisabled: true,
      // 主窗口画布数据
      canvas: {},
      canvasWidth: 0,
      canvasHeight: 0,
      ctx: {},
      canvasInfo: {
        status: canvasStatus.IDLE,
        beginPoint: null,
        currentPoint: null,
        targetIndex: null,
      },
      canvasServeInfo: {
        status: canvasStatus.IDLE,
        beginPoint: null,
        currentPoint: null,
        targetIndex: null,
        currentRect: null,
      },
      rotatePoint: {},
      rects: [],
      // 侧边栏画布数据
      ctxServe: {},
      canvasServe: {},
      rectsServe: [],
      // 全局画布数据
      container: null,
      globalRect: null,
      // 侧边栏数据
      observer: {},
      windowObserve: {},
      isOrigin: true,
      isNew: false,
      rightClickInfo: {},
      dId:null,
      dIndex:null,
      isVolatilePcDiff:false,
      isAddImg:false,
      isAddImgChange:false,
      wscData:[],
      changeList:[],
      isAnySelected:false,
      detailObj:{}
    };
  },
  // --------------------生命周期钩子函数-------------------
  mounted() {
    this.mountedInit();
  },
  activated() {
    this.isOrigin = true;
  },
  // --------------------------侦听器---------------------
  watch: {
    // 实现楼层下拉菜单搜索
    selectBuilding() {
      this.areaDisabled = true;
      this.selectRoom = "";
      this.selectFloor = "";
      this.floors = [];
      if (this.selectBuilding == "") this.floorDisabled = true;
      else {
        this.floorDisabled = false;
      }
      this.areas.forEach((item) => {
        if (
          this.selectBuilding == item.buildingName &&
          !this.floors.includes(item.floorName)
        )
          this.floors.push(item.floorName);
      });
    },
    selectFloor(value) {
      if (this.selectFloor == "") this.areaDisabled = true;
      else {
        this.areaDisabled = false;
      }
      this.selectRoom = "";
      this.rooms = [];
      this.areas.forEach((item) => {
        if (
          this.selectBuilding == item.buildingName &&
          this.selectFloor == item.floorName &&
          !this.rooms.includes(item.name)
        )
          this.rooms.push(item.name);
      });
    },
    selectRoom(value) {
      if (
        this.selectBuilding != "" &&
        this.selectFloor != "" &&
        this.selectRoom != ""
      ) {
        this.areas.forEach((item) => {
          if (
            item.buildingName == this.selectBuilding &&
            item.floorName == this.selectFloor &&
            item.name == this.selectRoom
          ) {
            this.area = this.copyArea(item);
          }
        });
        this.getLayoutInfo(
          this.selectBuilding,
          this.selectFloor,
          this.selectRoom
        );
      } else return;
    },
    volatileArea: {
      deep: true,
      handler() {
        this.diffVolatile();
      },
    },
    volatilePrivateComponent: {
      deep: true,
      handler() {
        this.diffPcVolatile();
      },
    },
    detailObj:{
      deep:true,
      handler(){
        if(!Number.isFinite(this.detailObj.anchor.x))
          this.detailObj.anchor.x = 0
        if(!Number.isFinite(this.detailObj.anchor.y))
          this.detailObj.anchor.y = 0
        if(!Number.isFinite(this.detailObj.rotate))
          this.detailObj.rotate = 0
        redrawAll(this.ctx, this.canvas, this.rects,this.rotatePoint,false,this.canvas.clientWidth,this.canvas.clientHeight);
      }
    }
    // ---------------------------------------------------------
  },
  computed: {
    canvasStyle() {
      if (this.isOrigin) return null;
      else {
        return {
          height: this.canvasHeight + "px",
          width: this.canvasWidth + "px",
        };
      }
    }
  },
  methods: {
    copyArea(area) {
      return {
        buildingName: area.buildingName,
        floorName: area.floorName,
        name: area.name,
        width: area.width,
        height: area.height,
      };
    },
    diffVolatile() {
      this.isVolatileDiff =
        this.area.buildingName == this.volatileArea.buildingName &&
        this.area.floorName == this.volatileArea.floorName &&
        this.area.name == this.volatileArea.name &&
        this.area.width == this.volatileArea.width &&
        this.area.height == this.volatileArea.height;
    },
    diffPcVolatile(){
      this.isVolatilePcDiff = 
        this.originalPrivateComponent.name == this.volatilePrivateComponent.name &&
        this.originalPrivateComponent.width == this.volatilePrivateComponent.width &&
        this.originalPrivateComponent.height == this.volatilePrivateComponent.height;
    },
    syncSetSelects(buildingName, floorName, name) {
      this.selectBuilding = buildingName;
      this.$nextTick(() => {
        this.selectFloor = floorName;
        this.$nextTick(() => {
          this.selectRoom = name;
        });
      });
    },
    // 根据当前选择的区域重新设置待选
    resetSelect() {
      this.buildings = [];
      this.floors = [];
      this.rooms = [];
      this.areas.forEach((item) => {
        if (
          this.selectBuilding == item.buildingName &&
          !this.floors.includes(item.floorName)
        )
          this.floors.push(item.floorName);
      });
      this.areas.forEach((item) => {
        if (
          this.selectBuilding == item.buildingName &&
          this.selectFloor == item.floorName &&
          !this.rooms.includes(item.name)
        )
          this.rooms.push(item.name);
      });
      this.areas.forEach((item) => {
        if (
          item.buildingName == this.selectBuilding &&
          item.floorName == this.selectFloor &&
          item.name == this.selectRoom
        ) {
          this.area = this.copyArea(item);
        }
      });
    },
    async mountedInit() {
      try {
        await this.getPrivateCompoments();
        await this.loadImages();
        this.initServeCanvas();
        await this.getAllBuildingsInfo();
        this.autoSelectArea();
      } catch (e) {
        console.log(e);
      }
    },
    async reloadPcCanvas(){
      try {
        await this.getPrivateCompoments();
        await this.loadImages();
        this.initServeCanvas();
      } catch (e) {
        console.log(e);
      }
    },
    initMainCanvasData() {
      this.canvas = this.$refs.canvas;
      this.ctx = this.canvas.getContext("2d");
      //计算画布大小比例
      this.mainCanvasRedraw();
      //开启尺寸监视，实时修改画布尺寸
      this.windowObserve = new ResizeObserver(() => {
        if (
          this.canvas.height != this.canvas.clientHeight ||
          this.canvas.width != this.canvas.clientWidth
        ) {
          this.isOrigin = true;
          this.$nextTick(() => {
            try {
              this.mainCanvasRedraw();
            } catch (e) {
              console.log(e);
            }
          });
        }
      });
      this.windowObserve.observe(this.$refs.mainWindow);
      // window.addEventListener('resize',()=>{
      //     console.log("窗口变化")
      //     this.isOrigin = true
      // })
    },
    mainCanvasRedraw() {
      var oldRatio = this.ratio;
      this.canvasWidth = this.canvas.clientWidth;
      this.canvasHeight = this.canvas.clientHeight;
      this.ratio = Math.min(
        this.canvasWidth / this.area.width,
        this.canvasHeight / this.area.height
      );
      if (
        this.canvasWidth / this.area.width <
        this.canvasHeight / this.area.height
      ) {
        this.canvasHeight = this.area.height * this.ratio;
        // this.canvas.clientHeight = this.canvasHeight
      } else {
        this.canvasWidth = this.area.width * this.ratio;
        // this.canvas.clientWidth = this.canvasWidth
      }
      this.isOrigin = false;
      //初始化基本画布信息
      this.rotatePoint = new RoratePoint(
        this.images["rotate"],
        new Point(-100, -100)
      );
      //初始化先前画布信息
      if (this.rects.length == 0 || this.isNew) {
        this.rects = [];
        this.components.forEach((item, index) => {
          this.rects.push(
            new Rect(
              index,
              this.images[this.privateComponents[item.privateComponentId].componentImage.id],
              new Point(item.x * this.ratio, item.y * this.ratio),
              this.privateComponents[item.privateComponentId].width *
                this.ratio,
              this.privateComponents[item.privateComponentId].height *
                this.ratio,
              (item.rotate * Math.PI) / 180,
              item.privateComponentId,
              null,
              null,
              item.isConflictable,
              item.isReservable
            )
          );
        });
        this.isNew = false;
      } else {
        this.rects.forEach((item, index) => {
          item.anchor.x = (item.anchor.x * this.ratio) / oldRatio;
          item.anchor.y = (item.anchor.y * this.ratio) / oldRatio;
          item.width = (item.width * this.ratio) / oldRatio;
          item.height = (item.height * this.ratio) / oldRatio;
        });
      }
      this.$nextTick(() => {
        this.ctx.clearRect(
          0,
          0,
          this.canvas.clientWidth + 10,
          this.canvas.clientHeight + 10
        );
        detectRectsConflict(this.rects);
        redrawAll(this.ctx, this.canvas, this.rects,null,false,this.canvas.clientWidth,this.canvas.clientHeight);
      });
    },
    initServeCanvas() {
      this.canvasServe = this.$refs.canvasServe;
      this.ctxServe = this.canvasServe.getContext("2d");
      this.canvasServe.height = this.canvasServe.clientHeight;
      //初始化右侧画布信息
      var k = 0;
      this.rectsServe = []
      var arr = Object.values(this.privateComponents)
      for (var j = 10; j <= 500; j += 100) {
        for (var i = 10; i <= 250; i += 100) {
          this.rectsServe.push(
            new Rect(
              k,
              this.images[arr[k].componentImage.id],
              new Point(i, j),
              60,
              60,
              0,
              Number(arr[k].id),
              null,
              null,
              arr[k].isConflictable,
              arr[k].isReservable
            )
          );
          k++;
          if (k === arr.length) {
            redrawAll(this.ctxServe, this.canvasServe, this.rectsServe,null,false,this.canvasServe.clientWidth,this.canvasServe.clientHeight);
            return;
          }
        }
      }
      //开启尺寸监视，实时修改画布尺寸
      this.observer = new ResizeObserver(() => {
        if (this.canvasServe.height != this.canvasServe.clientHeight) {
          this.canvasServe.height = this.canvasServe.clientHeight;
          redrawAll(this.ctxServe, this.canvasServe, this.rectsServe,null,false,this.canvasServe.clientWidth,this.canvasServe.clientHeight);
        }
      });
      this.observer.observe(this.canvas);
    },
    mainMouseMove(e) {
      if (!this.canvas || !e) return;
      var mouse = new Point(e.offsetX, e.offsetY);
      // 安全性检查
      if (
        mouse.x < 0 ||
        mouse.x >= this.canvas.clientWidth ||
        mouse.y < 0 ||
        mouse.y >= this.canvas.clientHeight
      )
        return;
      // 设置鼠标样式
      let body = document.querySelector("body");
      //旋转中鼠标形态不变
      if (this.canvasInfo.status === canvasStatus.ROTATING) {
        body.style.cursor = "url(api/imgs/rotatePointer.svg),auto";
      } else if (this.canvasInfo.status === canvasStatus.DRAGING)
        body.style.cursor = "pointer";
      else {
        if (isPointInRotate(mouse, this.rotatePoint)) {
          body.style.cursor = "url(api/imgs/rotatePointer.svg),auto";
        } else if (Number.isFinite(isPointInAnyRect(mouse, this.rects))) {
          body.style.cursor = "pointer";
        } else {
          body.style.cursor = "default";
        }
      }
      // 旋转（绘制）
      if (this.canvasInfo.status === canvasStatus.ROTATING) {
        var theta = Math.acos(
          (this.rects[this.canvasInfo.targetIndex].anchor.y - mouse.y) /
            getDistance(this.rects[this.canvasInfo.targetIndex].anchor, mouse)
        );
        if (mouse.x - this.rects[this.canvasInfo.targetIndex].anchor.x > 0) {
          this.rects[this.canvasInfo.targetIndex].rotate = theta;
        } else {
          this.rects[this.canvasInfo.targetIndex].rotate = Math.PI * 2 - theta;
        }
        this.rects[this.canvasInfo.targetIndex].rotate =
          (Math.round(
            (this.rects[this.canvasInfo.targetIndex].rotate * 360) /
              (2 * Math.PI) /
              10
          ) *
            10 *
            Math.PI) /
          180;
        detectRectsConflict(this.rects);
        redrawAll(this.ctx, this.canvas, this.rects, this.rotatePoint,false,this.canvas.clientWidth,this.canvas.clientHeight);
      }
      // 拖拽（死区限制）
      if (
        this.canvasInfo.status === canvasStatus.DRAG_START &&
        getDistance(this.canvasInfo.beginPoint, mouse) > 5
      ) {
        setRectAbove(this.canvasInfo.targetIndex, this.rects);
        this.canvasInfo.targetIndex = this.rects.length - 1;
        this.canvasInfo.status = canvasStatus.DRAGING;
        return;
      }
      // 拖拽（绘制）
      if (this.canvasInfo.status === canvasStatus.DRAGING) {
        //鼠标跟踪
        var deltaX = mouse.x - this.canvasInfo.currentPoint.x;
        var deltaY = mouse.y - this.canvasInfo.currentPoint.y;
        this.rects[this.canvasInfo.targetIndex].anchor.x += deltaX;
        this.rects[this.canvasInfo.targetIndex].anchor.y += deltaY;
        this.canvasInfo.currentPoint.x = mouse.x;
        this.canvasInfo.currentPoint.y = mouse.y;
        //重新绘制
        detectRectsConflict(this.rects);
        redrawAll(this.ctx, this.canvas, this.rects, this.rotatePoint,false,this.canvas.clientWidth,this.canvas.clientHeight);
      }
    },
    mainMouseDown(e) {
    if(e.button!=0)
        return
      var mouse = new Point(e.offsetX, e.offsetY);
      //安全性检查
      if (
        mouse.x < 0 ||
        mouse.x >= this.canvas.clientWidth ||
        mouse.y < 0 ||
        mouse.y >= this.canvas.clientHeight
      )
        return;
      //如果按下时在旋转点内 旋转
      if (isPointInRotate(mouse, this.rotatePoint)) {
        this.rects.forEach((item, index) => {
          if (item.isSelected === true) {
            targetIndex = index;
          }
        });
        this.canvasInfo = {
          status: canvasStatus.ROTATING,
          beginPoint: null,
          currentPoint: null,
          targetIndex: targetIndex,
        };
        return;
      }
      //如果按下时在某个矩形内 拖拽（准备）
      var targetIndex = isPointInAnyRect(mouse, this.rects);
      if (Number.isFinite(targetIndex)) {
        this.canvasInfo = {
          status: canvasStatus.DRAG_START,
          beginPoint: mouse,
          currentPoint: mouse,
          targetIndex: targetIndex,
        };
      }
      //如果按下时在空白处
      else {
        this.rects.forEach((item) => {
          if (item.isSelected === true) {
            item.isSelected = false;
            this.turnOffSelect();
            redrawAll(this.ctx, this.canvas, this.rects, this.rotatePoint,false,this.canvas.clientWidth,this.canvas.clientHeight);
          }
        });
        this.canvasInfo = {
          status: canvasStatus.IDLE,
          beginPoint: null,
          currentPoint: null,
          targetIndex: null,
        };
      }
    },
    mainMouseUp(e) {
      //判断是选中还是拖拽，如果在死区内就是选中
      if (this.canvasInfo.status === canvasStatus.DRAG_START) {
        this.rects.forEach((item) => {
          item.isSelected = false;
          this.turnOffSelect()
        });
        this.rects[this.canvasInfo.targetIndex].isSelected = true;
        this.turnOnSelect(this.canvasInfo.targetIndex)
        setRectAbove(this.canvasInfo.targetIndex, this.rects);
        redrawAll(this.ctx, this.canvas, this.rects, this.rotatePoint,false,this.canvas.clientWidth,this.canvas.clientHeight);
      }
      this.canvasInfo = {
        status: canvasStatus.IDLE,
        beginPoint: null,
        currentPoint: null,
        targetIndex: null,
      };
    },
    mainMouseLeave(e) {
      if (this.globalRect) this.globalRect = null;
      if (this.canvasInfo.status === canvasStatus.DRAG_START) {
        this.rects.forEach((item) => {
          item.isSelected = false;
          this.turnOffSelect()
        });
        this.rects[this.canvasInfo.targetIndex].isSelected = true;
        this.turnOnSelect(this.canvasInfo.targetIndex)
        redrawAll(this.ctx, this.canvas, this.rects, this.rotatePoint,false,this.canvas.clientWidth,this.canvas.clientHeight);
      }
      this.canvasInfo = {
        status: canvasStatus.IDLE,
        beginPoint: null,
        currentPoint: null,
        targetIndex: null,
      };
    },
    mainMouseEnter(e) {
      var mouse = new Point(e.offsetX, e.offsetY);
      if (!this.globalRect) return;
      var rect = this.globalRect;
      rect.anchor.x = e.offsetX;
      rect.anchor.y = e.offsetY;
      rect.width = this.privateComponents[rect.pid].width * this.ratio;
      rect.height = this.privateComponents[rect.pid].height * this.ratio;
      this.rects.push(rect);
      this.canvasInfo = {
        status: canvasStatus.DRAGING,
        beginPoint: null,
        currentPoint: { x: e.offsetX, y: e.offsetY },
        targetIndex: this.rects.length - 1,
      };
    },
    mainKeyDown(e) {
      console.log(e);
      if (e.key == "Delete") {
        this.rects.forEach((item, index) => {
          if (item.isSelected === true) {
            this.rects.splice(index, 1);
          }
        });
        detectRectsConflict(this.rects);
        redrawAll(this.ctx, this.canvas, this.rects, this.rotatePoint,false,this.canvas.clientWidth,this.canvas.clientHeight);
      }
    },
    serverMouseMove(e) {
      var mouse = new Point(e.offsetX, e.offsetY);
      // 安全性检查
      if (
        mouse.x < 0 ||
        mouse.x >= this.canvasServe.clientWidth ||
        mouse.y < 0 ||
        mouse.y >= this.canvasServe.clientHeight
      )
        return;
      // 设置鼠标样式
      let body = document.querySelector("body");
      if (
        this.canvasServeInfo.status === canvasStatus.DRAGING ||
        Number.isFinite(isPointInAnyRect(mouse, this.rectsServe))
      )
        body.style.cursor = "pointer";
      else body.style.cursor = "default";
      if (this.canvasServeInfo.status === canvasStatus.DRAGING) {
        //鼠标跟踪
        var deltaX = mouse.x - this.canvasServeInfo.currentPoint.x;
        var deltaY = mouse.y - this.canvasServeInfo.currentPoint.y;
        this.canvasServeInfo.currentRect.anchor.x += deltaX;
        this.canvasServeInfo.currentRect.anchor.y += deltaY;
        this.canvasServeInfo.currentPoint.x = mouse.x;
        this.canvasServeInfo.currentPoint.y = mouse.y;
        //重新绘制
        redrawAll(this.ctxServe, this.canvasServe, this.rectsServe,null,false,this.canvasServe.clientWidth,this.canvasServe.clientHeight);
        this.canvasServeInfo.currentRect.drawAlphaImg(this.ctxServe);
      }
    },
    serverMouseDown(e) {
      if(e.button!=0)
        return
      var mouse = new Point(e.offsetX, e.offsetY);
      //安全性检查
      if (
        mouse.x < 0 ||
        mouse.x >= this.canvasServe.clientWidth ||
        mouse.y < 0 ||
        mouse.y >= this.canvasServe.clientHeight
      )
        return;
      var targetIndex = isPointInAnyRect(mouse, this.rectsServe);
      if (Number.isFinite(targetIndex)) {
        this.canvasServeInfo = {
          status: canvasStatus.DRAGING,
          beginPoint: mouse,
          currentPoint: mouse,
          targetIndex: targetIndex,
          currentRect: this.rectsServe[targetIndex].getCopy(),
        };
      }
    },
    serverMouseUp(e) {
      this.canvasServeInfo = {
        status: canvasStatus.IDLE,
        beginPoint: null,
        currentPoint: null,
        targetIndex: null,
        currentRect: null,
      };
      redrawAll(this.ctxServe, this.canvasServe, this.rectsServe,null,false,this.canvasServe.clientWidth,this.canvasServe.clientHeight);
    },
    serverMouseLeave(e) {
      if (this.canvasServeInfo.status === canvasStatus.DRAGING) {
        this.globalRect = this.canvasServeInfo.currentRect;
      }
      this.canvasServeInfo = {
        status: canvasStatus.IDLE,
        beginPoint: null,
        currentPoint: null,
        targetIndex: null,
        currentRect: null,
      };
      redrawAll(this.ctxServe, this.canvasServe, this.rectsServe,null,false,this.canvasServe.clientWidth,this.canvasServe.clientHeight);
    },
    rightClickServe(e) {
      var mouse = new Point(e.offsetX, e.offsetY);
      var target = isPointInAnyRect(mouse, this.rectsServe);
      if (Number.isFinite(target)) {
        this.rightClickInfo = {
          position: {
            x: e.clientX,
            y: e.clientY,
          },
          menulists: [
            {
              fnName: "addPc",
              params: target,
              icoName: "el-icon-circle-plus-outline",
              btnName: "添加相似",
            },
            {
              fnName: "changePc",
              params: target,
              icoName: "el-icon-setting",
              btnName: "修改当前",
            },
            {
              fnName: "deletePc",
              params: target,
              icoName: "el-icon-delete",
              btnName: "删除当前",
            },
            {
              fnName: "muiltiAdd",
              params: target,
              icoName: "el-icon-more-outline",
              btnName: "多次放置",
            },
          ],
        };
      } else {
        this.rightClickInfo = {
          position: {
            x: e.clientX,
            y: e.clientY,
          },
          menulists: [
            {
              fnName: "addCI",
              icoName: "el-icon-download",
              btnName: "添加样式",
            },
          ],
        };
      }
    },
    containerMouseUp(e) {
      this.globalRect = null;
    },
    async loadImages() {
      await new Promise((resolve) => {
        var count = 0;
        this.imgNum = 0;
        for (var src in this.sources) {
          this.imgNum++;
        }
        for (let src in this.sources) {
          this.images[src] = new Image();
          this.images[src].src = "api/" + this.sources[src];
          this.images[src].onload = () => {
            if (++count >= this.imgNum) {
              resolve();
            }
          };
        }
      });
    },
    async getPrivateCompoments() {
      await this.$http
        .get("/layout/pc", { timeout: 1000 })
        .then((res) => {
          if (res.data.code == 1) {
            res.data.data.forEach((item) => {
              this.privateComponents[item.id] = item;
            });
            Object.values(this.privateComponents).forEach((item) => {
              this.sources[item.componentImage.id] =
                item.componentImage.imageUrl;
            });
            this.sources["rotate"] = "imgs/rotate.svg";
          } else {
            this.$message({
              message: res.data.msg,
              type: "error",
            });
          }
        })
        .catch(() => {
          this.$message({
            message: "服务器访问错误",
            type: "error",
          });
        });
    },
    //获取给定区域的数据，并且设置当前区域为选中区域
    getLayoutInfo(buildingName, floorName, name) {
      //获取当前选中区域的区域信息，如果不选中，则后端默认返回一些信息
      this.$http
        .get("/layout/info", {
          timeout: 2000,
          params: {
            buildingName: buildingName,
            floorName: floorName,
            areaName: name,
          },
        })
        .then((res) => {
          if (res.data.code == 1) {
            // 将获取到的组件信息赋值给components变量
            this.components = res.data.data.components;
            this.isNew = true;
            this.initMainCanvasData();
          } else {
            this.$message({
              message: res.data.msg,
              type: "error",
            });
          }
        })
        .catch(() => {
          this.$message({
            message: "服务器访问错误",
            type: "error",
          });
        });
    },
    async getAllBuildingsInfo() {
      //获取所有楼栋信息，在获取时要同步更新buidings数组
      await this.$http.get("/layout/area").then((res) => {
        if (res.data.code == 1) {
          this.areas = res.data.data;
          this.areas.forEach((item) => {
            if (!this.buildings.includes(item.buildingName))
              this.buildings.push(item.buildingName);
          });
        } else {
          throw res.data.msg;
        }
      });
    },
    autoSelectArea() {
      if (this.areas.length > 0) {
        this.area = this.copyArea(this.areas[0]);
        this.syncSetSelects(
          this.area.buildingName,
          this.area.floorName,
          this.area.name
        );
      }
    },
    addPrivateCompoments() {
      this.$http
        .post("layout/pc", {
          name: this.newPrivateComponent.name,
          width: this.newPrivateComponent.width,
          height: this.newPrivateComponent.height,
          parentId: this.newPrivateComponent.parentId,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.reloadPcCanvas()
            this.isAddPc = false
            this.$message.success("添加成功");
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(() => {
          this.$message.error("服务器访问错误");
        });
    },
    deletePrivateCompoments(dId) {
      this.$http
        .delete("layout/pc?ComponentId="+dId)
        .then((res) => {
          if (res.data.code == 1) {
            delete this.privateComponents[dId]
            this.initServeCanvas()
            this.getLayoutInfo(this.area.buildingName,this.area.floorName,this.area.name)
            this.$message.success("删除成功");
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(() => {
          this.$message.error("服务器访问错误");
        });
    },
    changePrivateCompoments(){
      this.$http.put('/layout/pc',this.volatilePrivateComponent,{timeout:2000})
      .then((res)=>{
        if(res.data.code==1){
          this.privateComponents[this.volatilePrivateComponent.id].name = this.volatilePrivateComponent.name
          this.privateComponents[this.volatilePrivateComponent.id].width = this.volatilePrivateComponent.width
          this.privateComponents[this.volatilePrivateComponent.id].height = this.volatilePrivateComponent.height
          this.initServeCanvas()
          this.getLayoutInfo(this.area.buildingName,this.area.floorName,this.area.name)
          this.$message.success("修改成功");
          this.isPcChange = false
        }
        else{
          this.$message.error(res.data.msg);
        }
      })
      .catch(e=>{
        this.$message.error('服务器访问异常')
      })
    },
    // 区域管理
    addArea() {
      if (
        this.newArea.buildingName == "" ||
        this.newArea.floorName == "" ||
        this.newArea.name == "" ||
        this.newArea.width == "" ||
        this.newArea.height == ""
      ) {
        this.$message.error("区域信息不能含空");
        return;
      }
      this.$http
        .post(
          "/layout/area",
          {
            buildingName: this.newArea.buildingName,
            floorName: this.newArea.floorName,
            name: this.newArea.name,
            width: this.newArea.width,
            height: this.newArea.height,
          },
          { timeout: 1000 }
        )
        .then((res) => {
          if (res.data.code == 1) {
            this.$message.success("添加成功");
            //将新添加的区域信息添加到areas数组中
            this.areas.push(this.copyArea(this.newArea));
            //将新添加的区域信息的楼栋信息添加到buildings数组中
            this.resetSelect();
            this.isAdd = false;
          } else this.$message.error(res.data.msg);
        })
        .catch(() => {
          this.$message.error("服务器访问错误");
        });
    },
    deleteArea() {
      this.$http
        .delete("layout/area", {
          params: {
            buildingName: this.area.buildingName,
            floorName: this.area.floorName,
            areaName: this.area.name,
          },
          timeout: 1000,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.$message.success("删除成功");
            this.areas.forEach((item, index) => {
              if (
                item.buildingName == this.area.buildingName &&
                item.floorName == this.area.floorName &&
                item.name == this.area.name
              )
                this.areas.splice(index, 1);
            });
            this.buildings = [];
            this.areas.forEach((item) => {
              if (!this.buildings.includes(item.buildingName))
                this.buildings.push(item.buildingName);
            });
            this.selectRoom = "";
            this.selectFloor = "";
            this.selectBuilding = "";
            //清除当前界面的组件信息
            this.ctx.clearRect(
              0,
              0,
              this.canvas.clientWidth,
              this.canvas.clientHeight
            );
          } else this.$message.error(res.data.msg);
        })
        .catch(() => {
          this.$message.error("服务器访问错误");
        });
    },
    changeArea() {
      if (
        this.volatileArea.buildingName == "" ||
        this.volatileArea.floorName == "" ||
        this.volatileArea.name == "" ||
        this.volatileArea.width == "" ||
        this.volatileArea.height == ""
      ) {
        this.$message.error("区域信息不能含空");
        return;
      }
      this.$http
        .put(
          "/layout/area",
          {
            areaOld: {
              buildingName: this.area.buildingName,
              floorName: this.area.floorName,
              name: this.area.name,
            },
            areaNew: {
              buildingName: this.volatileArea.buildingName,
              floorName: this.volatileArea.floorName,
              name: this.volatileArea.name,
              width: this.volatileArea.width,
              height: this.volatileArea.height,
            },
          },
          { timeout: 1000 }
        )
        .then((res) => {
          if (res.data.code == 1) {
            this.$message.success("修改成功");
            // areas重新设置
            this.areas.forEach((item, index) => {
              if (
                item.buildingName == this.area.buildingName &&
                item.floorName == this.area.floorName &&
                item.name == this.area.name
              )
                this.areas.splice(index, 1, this.copyArea(this.volatileArea));
            });
            this.area = this.copyArea(this.volatileArea);
            this.syncSetSelects(
              this.area.buildingName,
              this.area.floorName,
              this.area.name
            );
            this.resetSelect();
            this.buildings = [];
            this.areas.forEach((item) => {
              if (!this.buildings.includes(item.buildingName))
                this.buildings.push(item.buildingName);
            });
            this.initMainCanvasData();
            this.isChange = false;
          } else this.$message.error(res.data.msg);
        })
        .catch(() => {
          this.$message.error("服务器访问错误");
        });
    },
    saveCompomentsInstances() {
      this.rects.forEach((item) => {
        item.x = (item.anchor.x - item.width / 2) / this.ratio;
        item.y = (item.anchor.y - item.height / 2) / this.ratio;
        item.type = 1;
        item.privateComponentId = item.pid;
        item.rotateTemp = item.rotate;
        item.rotate = Math.round((item.rotate * 180) / Math.PI);
      });
      this.$http
        .post(
          "/layout/componentInstance",
          {
            area: {
              buildingName: this.area.buildingName,
              floorName: this.area.floorName,
              name: this.area.name,
            },
            componentInstances: this.rects,
          },
          { timeout: 2000 }
        )
        .then((res) => {
          if (res.data.code == 1) {
            this.$message.success("保存成功");
          } else this.$message.error(res.data.msg);
        })
        .catch(() => {
          this.$message.error("服务器访问错误");
        })
        .finally(() => {
          this.rects.forEach((item) => {
            item.rotate = item.rotateTemp;
          });
        });
    },
    setVolatileArea() {
      this.volatileArea = this.copyArea(this.area);
    },
    clearAreaChange() {
      this.volatileArea = this.copyArea(this.area);
    },
    clearAreaAdd() {
      this.newArea.name = "";
      this.newArea.floorName = "";
      this.newArea.buildingName = "";
      this.newArea.width = "";
      this.newArea.height = "";
    },
    clearPcAdd(){
      this.newPrivateComponent.name=''
      this.newPrivateComponent.width=null
      this.newPrivateComponent.height=null
      this.newPrivateComponent.parentId=null
    },
    clearPcChange(){
      this.volatilePrivateComponent.name=''
      this.volatilePrivateComponent.id=null
      this.volatilePrivateComponent.width=null
      this.volatilePrivateComponent.height=null
      this.originalPrivateComponent.name=''
      this.originalPrivateComponent.id=null
      this.originalPrivateComponent.width=null
      this.originalPrivateComponent.height=null
    },
    addPage() {
      this.isAdd = true;
    },
    changePage() {
      this.isChange = true;
    },
    addPc(target){
      this.newPrivateComponent.parentId = this.privateComponents[this.rectsServe[target].pid].componentImage.id
      this.isAddPc = true
    },
    deletePc(target){
      this.deletePrivateCompoments(this.rectsServe[target].pid)
    },
    changePc(target){
      this.originalPrivateComponent.name = this.privateComponents[this.rectsServe[target].pid].name
      this.originalPrivateComponent.id = this.privateComponents[this.rectsServe[target].pid].id
      this.originalPrivateComponent.height = this.privateComponents[this.rectsServe[target].pid].height
      this.originalPrivateComponent.width = this.privateComponents[this.rectsServe[target].pid].width
      this.volatilePrivateComponent.name=this.originalPrivateComponent.name
      this.volatilePrivateComponent.id=this.originalPrivateComponent.id
      this.volatilePrivateComponent.width=this.originalPrivateComponent.width
      this.volatilePrivateComponent.height=this.originalPrivateComponent.height
      this.isPcChange = true
    },
    addCI(){
      this.$http.get("/layout/wsc").then(res=>{
        if(res.data.code ==1){
          this.wscData = res.data.data;
          this.wscData.forEach((val,index)=>{
            let tmp = false;
            for(let key in this.privateComponents)
              if(this.privateComponents[key].componentImage.id == val.id)
                tmp=true
            this.wscData[index].isChosen = tmp
            this.wscData[index].imageUrl = "/api/"+this.wscData[index].imageUrl
          })
          this.changeList = JSON.parse(JSON.stringify(this.wscData))
          this.isAddImg = true;
        }
        else{
          this.$message.error(res.data.msg);
        }
      })
      .catch(e=>{
        this.$message.error("服务器访问异常")
      })
      this.isAddImg = true;
    },
    clearImgChange(){
      this.isAddImgChange = false;
      this.wscData = []
      this.changeList = []
    },
    getWscUrl(index){
      if(this.wscData[index])
        return this.wscData[index].imageUrl
      else 
        return null
    },
    getWscBool(index){
      if(this.wscData[index])
        return this.wscData[index].isChosen
      else 
        return null
    },
    changeChosens(source,res){
      let temp = false
      this.changeList.forEach((val,index)=>{
        if(source==val.imageUrl){
          this.changeList[index].isChosen = res;
        }
        if(this.changeList[index].isChosen!=this.wscData[index].isChosen)
          temp = true
      })
      this.isAddImgChange = temp;
    },
    changeImgs(){
      this.changeList.forEach((val,index)=>{
        if(this.wscData[index].isChosen==false&&this.changeList[index].isChosen==true){
          this.$http.post("/layout/wsc",{id:this.changeList[index].id}).then(res=>{
            if(res.data.code==0){
              this.$message.error(res.data.msg)
            }
            else{
              this.reloadPcCanvas()
              this.isAddImg = false;
              this.$message.success("添加成功")
            }
          }).catch(e=>{
            this.$message.error("服务器访问异常")
          })
        }
      })
    },
    turnOnSelect(index){
      this.isAnySelected = true;
      this.detailObj = this.rects[index]
    },
    turnOffSelect(){
      this.isAnySelected = false;
      this.detailObj = {}
    }
  },
};
</script>

<style lang="scss" scoped>
#layout {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
  width: 99.5%;
  height: 100%;
  display: flex;
}
#layoutWindow {
  width: 100%;
  height: 100%;
}

#layoutList {
  position: relative;
  height: 100%;
  width: 330px;
  margin-left: 10px;
}
#layoutHead {
  position: relative;
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
.editItem {
  position: absolute;
  top: 27px;
  left: 0px;
  height: 148px;
  width: 328px;
}
.editItem > img {
  position: absolute;
  top: 12px;
  left: 13px;
  height: 30px;
  width: 30px;
  border-radius: 12.5px;
}
.editItem > h1 {
  position: absolute;
  top: -1px;
  left: 51px;
  width: 200px;
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
  top: 24px;
  left: 0;
  bottom: 0;
  width: 100%;
  padding-left: 40px;
  font-family: microsoft yahei;
  color: rgb(153, 153, 153);
  font-size: 14px;
  line-height: 1.5;
}
.lineInput {
  padding-left: 3px;
  border-bottom: #666 1px solid;
  border-left-width: 0px;
  border-right-width: 0px;
  border-top-width: 0px;
}
.lineInput:focus {
  outline: none;
  border-bottom: deepskyblue 1px solid;
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
  background-color: white;
  height: 100%;
  width: 328px;
  border-radius: 4px;
}
#items {
  position: absolute;
  top: 179px;
  height: calc(100% - 179px);
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: white;
  border-radius: 4px;
}
#items::-webkit-scrollbar {
  display: none;
}
#layoutCanvas {
  width: 328px;
  height: 100%;
}
#empty {
  position: absolute;
  height: 47px;
  width: 328px;
  background-color: white;
}
#mainWindow {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: white;
  border-radius: 4px;
}
#header {
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding-top: 14px;
  display: flex;
  justify-content: space-between;
}
#areaItems {
  display: flex;
  min-width: 600px;
}
/deep/#changeDiv .el-button {
  padding: 0;
  margin: 0;
}
/deep/#refreshDiv .el-button {
  padding: 0;
  margin: 0;
}
/deep/#deleteDiv .el-button {
  padding: 0;
  margin: 0;
}
/deep/#addDiv .el-button {
  padding: 0;
  margin: 0;
}
#floorItems {
  margin-left: 20px;
}
.floorInfo {
  display: inline-block;
  height: 23px;
  font-size: 14px;
  font-family: "微软雅黑";
  color: rgb(51, 51, 51);
  margin-left: 10px;
}

.selectItem {
  display: inline-block;
  margin-left: 5px;
}

/deep/#sfs {
  padding-left: 4px;
  width: 75px;
  height: 25px;
}

/deep/#tfs {
  padding-left: 4px;
  width: 75px;
  height: 25px;
}

/deep/#ffs {
  padding-left: 4px;
  width: 93px;
  height: 25px;
}

.innerText {
  position: relative;
  height: 30px;
  width: 37px;
}

#saveText {
  position: relative;
  height: 23px;
  width: 60px;
}

#refreshDiv {
  position: relative;
  right: 20px;
  top: 5px;
}

#addDiv {
  position: relative;
  margin-left: 10px;
}

#changeDiv {
  position: relative;
  margin-left: 10px;
}

#deleteDiv {
  position: relative;
  margin-left: 10px;
}

.innerSpan {
  position: absolute;
  top: 2px;
  left: 15px;
  font-size: 14px;
  font-family: PingFang SC;
  z-index: 10;
  color: white;
  pointer-events: none;
}
#canvasBox {
  width: 90%;
  height: calc(100% - 70px);
  margin-left: 5%;
  margin-top: 20px;
  box-sizing: border-box;
  border: 1px solid #c8c9cd;
  border-radius: 4px;
}
#canvasBox:focus {
  outline: none;
}
ul > .el-select-dropdown__item {
  padding-left: 12px;
}
#imgOuter{
  display: flex;
  flex-direction: column;
}
.imgLine{
  display: flex;
  margin-bottom: 10px;
  // background-color: pink;
}
.imgInner{
  margin-right: 10px;
  height: 90px;
  width: 130px;
  // background-color: yellow;
}
</style>
