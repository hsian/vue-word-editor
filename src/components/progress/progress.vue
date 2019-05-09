<template>
    <div class="progress-box">
        <span>{{message}}</span>
        <progress :value="value" :max="max"></progress>
    </div>
</template>

<script>
export default {
    data(){
        return {
            message: "正在上传"
        }
    },
    props: {
        value: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 100
        }
    },
    mounted(){
        if(this.value === this.max){
            this.message = "上传完毕";
        }
    }
}
</script>

<style scoped>
    .progress-box{
        width:350px;
        padding:30px 0;
        position: absolute;
        left:50%;
        top:100px;
        margin: 0 0 0 -175px;
        border:1px #eee solid;
        text-align: center;
        background: #fff;
        font-size:14px;
    }

    .progress-box * {
        vertical-align: middle;
    }

    progress{
        height:10px;
        margin-left:20px;
        background:#eee;
        color: #1989fa;
    }

    /* 表示总长度背景色 */
    progress::-webkit-progress-bar{     
        background-color: #eee;
        border-radius: 0.2rem;
    }
    /* 表示已完成进度背景色 */
    progress::-webkit-progress-value{
        background: #1989fa;
        border-radius: 0.2rem; 
    }

    /* 表示已完成进度背景色 */
    progress::-moz-progress-bar{
        background: #1989fa;
        border-radius: 0.2rem; 
    }
</style>
