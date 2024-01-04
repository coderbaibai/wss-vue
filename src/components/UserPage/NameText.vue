<template>
  <div id="nameText" @mouseenter="mouseIn" @mouseleave="mouseOut">
    <input ref="name" @blur="endEdit" type="text" id="text" :style="{width:inputWidth+'px'}" @input='handleInput' :value="newName" :readonly="inputAttr.isreadOnly"  :unselectable="inputAttr.unselectable">
    <img @click="beginEdit" v-show="isShowEdit" id="changeImg" src="../../assets/change.svg">
  </div>
</template>

<script>
export default {
    data(){
        return{
            newName:'',
            isShowEdit :false,
            inputWidth:0,
            inputAttr:{
                isreadOnly:true,
                unselectable:"on"
            }
        }
    },
    props:["name"],
    computed:{
        lenPx(){
            return this.getLenPx(this.newName)
        }
    },
    watch:{
        newName(value){
            this.inputWidth = this.getLenPx(value)
        },
        name(value){
            this.newName = value
            this.inputWidth = this.getLenPx(value)
        }
    },
    methods:{
        mouseIn(){
            this.isShowEdit = true;
        },
        mouseOut(){
            this.isShowEdit = false;
        },
        beginEdit(){
            this.inputAttr.isreadOnly = false
            this.inputAttr.unselectable = 'off'
            this.$refs.name.focus()
            this.$refs.name.setSelectionRange(0, this.newName.length)
        },
        endEdit(){
            this.inputAttr.isreadOnly = true
            this.inputAttr.unselectable = 'on'
            if(this.newName==""){
                this.$message.error("姓名不能为空")
                this.cancelAllChange();
                return
            }
            if(this.newName!=this.name){
                this.$emit('changeName',this.newName)
            }
        },
        cancelAllChange(){
            this.newName = this.name
        },
        handleInput(e){
            this.newName = e.target.value
        },
        getLenPx(str){
            var result
            let ele = document.createElement('span')
            //字符串中带有换行符时，会被自动转换成<br/>标签，若需要考虑这种情况，可以替换成空格，以获取正确的宽度
            //str = str.replace(/\\n/g,' ').replace(/\\r/g,' ');
            ele.innerText = str;
            //不同的大小和不同的字体都会导致渲染出来的字符串宽度变化，可以传入尽可能完备的样式信息
            ele.style.fontSize = "20px"; 
            
            //由于父节点的样式会影响子节点，这里可按需添加到指定节点上
            document.documentElement.append(ele);

            result =  ele.offsetWidth;

            document.documentElement.removeChild(ele);
            return result+5;
        }

    }
}
</script>

<style scoped>
#nameText{
    display: inline-block;
}
#text{
    display: inline;
    height: 35px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
    font-weight: 700;
    line-height: 35px;
    border: 0px;
}
#text:focus{
    outline: none;
}
#changeImg{
    cursor: pointer;
    position:relative;
    top: 5px;
    margin-left: 6px;
    height: 20px;
    width: 20px;
}
</style>