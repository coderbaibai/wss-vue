<template>
    <div>
        <div>
            <el-button :dark="isDark" type="info" @onclick="dialogFormVisible = true">更改组件库</el-button>
        </div>

        <el-dialog title="更改组件库" :visible.sync="dialogFormVisible">
            <el-row :gutter="10">
                <el-col :span="6"><el-image :src="src" /><el-checkbox v-model="checked1" label=""
                        size="small" /></el-col>
                <el-col :span="6"><el-image :src="src" /><el-checkbox v-model="checked2" label=""
                        size="small" /></el-col>
                <el-col :span="6"> <el-image :src="src" /><el-checkbox v-model="checked3" label=""
                        size="small" /></el-col>
                <el-col :span="6"> <el-image :src="src" /><el-checkbox v-model="checked4" label=""
                        size="small" /></el-col>
            </el-row>

            <el-row :gutter="10">
                <el-col :span="6"><el-image :src="src" /><el-checkbox v-model="checked5" label=""
                        size="small" /></el-col>
                <el-col :span="6"><el-image :src="src" /><el-checkbox v-model="checked6" label=""
                        size="small" /></el-col>
                <el-col :span="6"><el-image :src="src" /><el-checkbox v-model="checked7" label=""
                        size="small" /></el-col>
                <el-col :span="6"><el-image :src="src" /><el-checkbox v-model="checked8" label=""
                        size="small" /></el-col>
            </el-row>

            <el-row :gutter="10">
                <el-col :span="6"><el-image :src="src" /><el-checkbox v-model="checked5" label=""
                        size="small" /></el-col>
                <el-col :span="6"><el-image :src="src" /><el-checkbox v-model="checked5" label=""
                        size="small" /></el-col>
                <el-col :span="6"><el-image :src="src" /><el-checkbox v-model="checked5" label=""
                        size="small" /></el-col>
                <el-col :span="6"><el-image :src="src" /><el-checkbox v-model="checked5" label=""
                        size="small" /></el-col>
            </el-row>

            <el-row :gutter="10">
                <div class="example-pagination-block">
                    <!-- <div class="example-demonstration">When you have few pages</div> -->
                    <el-pagination layout="prev, pager, next" :total="50" />
                </div>
            </el-row>


            <!-- 从本地选择图片传入方式 不需要删掉即可，script为相关内容-->
            <!-- <div>
                <el-upload action="' '" list-type="picture-card" :limit="3" show-file-list :auto-upload="false"
                    :on-change="change" multiple>
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="" />
                </el-dialog>
                <div class="submitFeedbackBtn" @click="submit">提交</div>
            </div> -->

            <div slot="footer">
                <el-button>确定</el-button>
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary">应用</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import axios from "axios"; //数据请求            
export default {
    data() {
        return {
            src: 'src/assets/cat.jpg',
            dialogFormVisible: 'false',
            dataList: "",
            dialogImageUrl: "",
        };
    },
    methods: {
        submit() {
            let config = {
                timeout: 30000,
                headers: {
                    "Content-Type": "multipart/form-data", //设置headers
                },
            };
            const formData = new FormData();
            var that = this;
            // 首先判断是否上传了图片，如果上传了图片，将图片存入到formData中
            console.log(this.dataList);
            if (this.dataList) {
                that.dataList.forEach((item, index) => {
                    // console.log(item)
                    formData.append(index, item);
                });
            }
            // console.log(formData.get(0));
            axios.post(
                ".....", //请求后端的url
                formData,
                config
            )
                .then((res) => {
                    console.log(res)
                    if (res.data.status == 'ok') {
                        //上传成功
                        console.log("上传成功");
                        this.$router.push({
                            path: './'
                        })
                    } else {
                        alert('上传失败')
                    }
                })
                .catch((error) => {
                    console.log("请求失败");
                });
            //用户可以在上传完成之后将数组给清空，这里直接跳转到首页了，没有做清空的操作
        },
        change(file, fileList) {
            //将每次图片数组变化的时候，实时的进行监听，更改数组里面的图片数据
            var arr = [];
            fileList.forEach((item) => {
                arr.push(item.raw);
            });
            this.dataList = arr;
            console.log(arr);
        }
    }
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