<template>
    <div id="vue-editor-wrapper">   
        <div id="editor"></div>

        <button class="vue-editor-image-tip ql-snow">
           <svg viewBox="0 0 18 18"> <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect> <circle class="ql-fill" cx="6" cy="7" r="1"></circle> <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline> </svg>
           <input type="file" @change="handleUpload($event, `image`)">
        </button>

        <button class="vue-editor-video-tip ql-snow">
           <svg viewBox="0 0 18 18"> <rect class="ql-stroke" height="12" width="12" x="3" y="3"></rect> <rect class="ql-fill" height="12" width="1" x="5" y="3"></rect> <rect class="ql-fill" height="12" width="1" x="12" y="3"></rect> <rect class="ql-fill" height="2" width="8" x="5" y="8"></rect> <rect class="ql-fill" height="1" width="3" x="3" y="5"></rect> <rect class="ql-fill" height="1" width="3" x="3" y="7"></rect> <rect class="ql-fill" height="1" width="3" x="3" y="10"></rect> <rect class="ql-fill" height="1" width="3" x="3" y="12"></rect> <rect class="ql-fill" height="1" width="3" x="12" y="5"></rect> <rect class="ql-fill" height="1" width="3" x="12" y="7"></rect> <rect class="ql-fill" height="1" width="3" x="12" y="10"></rect> <rect class="ql-fill" height="1" width="3" x="12" y="12"></rect> </svg>
           <input type="file" @change="handleUpload($event, `video`)">
        </button>
    </div>
</template>

<script>
import Quill from "quill";
import axios from "axios";

import hook from "../util/hooks";
import progress from "./progress";
import { setInterval, setTimeout } from 'timers';

let imageHook, videoHook;

export default {
    data(){
        return {
            editor: null,
            hasImage: false,
            hasVideo: false
        }
    },

    props: {
        // guide: https://quilljs.com/docs/configuration/
        config: {
            type: Object,
            default: {
                uploadImage: {
                    url: String,
                    name: String,
                    uploadBefore: Function,
                    uploadProgress: Function,
                    uploadSuccess: Function,
                    uploadError: Function,
                    showProgress:{
                        type: Boolean,
                        default: true
                    }
                },
                uploadVideo: {
                    url: String,
                    name: String,
                    uploadBefore: Function,
                    uploadProgress: Function,
                    uploadSuccess: Function,
                    uploadError: Function,
                    showProgress:{
                        type: Boolean,
                        default: true
                    }
                },
            }
        }
    },

    methods: {
        handleUpload(event, type){
            const isImage = type === "image";
            const isVideo = type === "video";

            const hook = isImage && imageHook || isVideo && videoHook; 
            const { url, name, showProgress } = this.config[
                isImage && 'uploadImage' ||
                isVideo && 'uploadVideo'
            ];

            let formData = new FormData();
            let file = event.target.files[0];
            formData.append( name || "files", file );

            if(!url) throw new Error("请配置上传的url路径");

            const result = hook.emit("before", [file]);
            if(!result) return;
            
            axios({
                url,
                method: "POST",
                data: formData,
                onUploadProgress(res){
                    const {loaded, total} = res;

                    if(showProgress !== false){
                        progress.show(loaded, total);
                    }
                    hook.emit("progress", [res])
                }
            }).then(res => {
                hook.emit("success", [res, (url) => {
                    // 交由前端处理
                    const index = this.editor.selection.savedRange.index;
                    this.editor.insertEmbed(index, type, url);

                    if (showProgress !== false){
                        setTimeout(() => {
                            progress.remove();
                        }, 1000);
                    }
                }]);
            }).catch(err => {
                console.log(err);
                hook.emit("error", [err]);
            })
        },

        handlePosition(tip, newTip){
            const [top, left] = [ tip.offsetTop,  tip.offsetLeft]                
            newTip.style.cssText = `
                display:block;
                left: ${left}px;
                top: ${top}px;
            `
            tip.style.opacity = 0;
        },

        // 初始化媒体元素
        initialEmbed(){
            const imageTip = document.querySelector(".ql-image");
            const videoTip = document.querySelector(".ql-video");
            const newImageTip = document.querySelector(".vue-editor-image-tip");
            const newVideoTip = document.querySelector(".vue-editor-video-tip");
            
            if(imageTip){
                this.handlePosition(imageTip, newImageTip);  
                this.hasImage = true;
                this.preImageUpload();
                
            }

            if(videoTip){
                this.handlePosition(videoTip, newVideoTip);
                this.hasVideo = true;
                this.preVideoUpload();
            }
        },

        preImageUpload(){
            const {
                uploadBefore,
                uploadProgress,
                uploadSuccess,
                uploadError
            } = this.config.uploadImage || {};

            if(!uploadSuccess || typeof uploadSuccess !== "function"){
                console.warn("请配置上传回调函数");
            }

            imageHook = new hook();
            imageHook.add("before", uploadBefore);
            imageHook.add("progress", uploadProgress);
            imageHook.add("success", uploadSuccess);
            imageHook.add("errr", uploadError);
        },

        preVideoUpload(){
            const {
                uploadBefore,
                uploadProgress,
                uploadSuccess,
                uploadError
            } = this.config.uploadVideo || {};

            if(!uploadSuccess || typeof uploadSuccess !== "function"){
                console.warn("请配置上传回调函数");
            }

            videoHook = new hook();
            videoHook.add("before", uploadBefore);
            videoHook.add("progress", uploadProgress);
            videoHook.add("success", uploadSuccess);
            videoHook.add("errr", uploadError);
        }
    },

    mounted(){  
        this.editor = new Quill('#editor', this.config);
        this.initialEmbed();
    }
}
</script>

<style scoped>
    .vue-editor-wrapper{
        position: relative;
    }

    .vue-editor-image-tip, .vue-editor-video-tip{
        position: absolute;
        display: none;
        overflow: hidden;
        height: 24px;
        padding: 3px 5px;
        width: 28px;
        background: none;
        border: none;
        cursor: pointer;
        box-sizing: border-box;
    }

    .vue-editor-image-tip input, 
    .vue-editor-video-tip input{
        position: absolute;
        left:0;
        top:0;
        opacity: 0;
    } 

    .vue-editor-image-tip svg, 
    .vue-editor-video-tipsvg{
        height: 100%;
        box-sizing: border-box;
    }
</style>
