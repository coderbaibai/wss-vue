<template>
    <div>
        <div>
            <el-row>
                <el-button :dark="isDark" type="info">选择</el-button>
            </el-row>
            <el-row>
                <el-button text @click="dialogFormVisible = true" type="info">添加</el-button>
            </el-row>
            <el-row>
                <el-button type="info">修改</el-button>
            </el-row>
            <el-row>
                <el-button type="info">删除</el-button>
            </el-row>
            <el-row>
                <el-button type="info">放置</el-button>
            </el-row>
        </div>

        <el-dialog title="增添区域" :visible.sync="dialogFormVisible">
            <el-form label-position="right" label-width="60px" :inline="true">
                <el-row :gutter="10">
                    <el-form-item label="名称">
                        <el-input v-model="name"></el-input>
                    </el-form-item>
                    <el-form-item label="长度">
                        <el-input v-model="length" aria-placeholder="单位:CM"></el-input>
                    </el-form-item>
                    <el-form-item label="宽度">
                        <el-input v-model="width" aria-placeholder="单位:CM"></el-input>
                    </el-form-item>
                </el-row>

                <!-- 可以选择颜色以及透明度,不需要直接注释即可-->
                <!-- <el-row :gutter="10">
                    <el-form-item label="颜色">
                        <el-color-picker v-model="color" show-alpha />
                    </el-form-item>
                </el-row> -->

            </el-form>
            <div slot="footer">
                <el-button>确定</el-button>
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary">应用</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogFormVisible: 'false',
            color: '',
            name: '',
            length: '',
            width: '',
        }
    },
    // watch: {
    //     color: function (newVal) {
    //         // 将颜色值和透明度值分别保存到变量中
    //         const { r, g, b, a } = newVal.toRgb()
    //         this.colorValue = `rgba(${r}, ${g}, ${b})`
    //         this.alphaValue = a
    //     }
    // },
    // computed: {
    //     // 计算属性，用于在模板中显示颜色值和透明度值
    //     displayValue() {
    //         return `颜色值：${this.colorValue}，透明度：${this.alphaValue}`
    //     }
    // }
}
</script>

<style>
.el-row {
    margin-bottom: 0px;
    padding-right: 0px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 0px;
}
</style>