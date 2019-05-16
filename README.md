# vue rich text editor

vue 富文本编辑器组件，基于[@quill](https://quilljs.com)新增图片上传和视频上传，欢迎[issues](https://github.com/hsian/vue-word-editor/issues)



## 安装



### NPM

```
npm install vue-word-editor --save 
```

> 依赖 quill，axios，vue



## 配置

遵循Quill原有配置：https://quilljs.com/docs/configuration/



### 新增配置

* **uploadImage**

上传图片配置

| 属性           | 类型     | 说明                                              |
| -------------- | -------- | ------------------------------------------------- |
| url            | String   | 上传图片的地址                                    |
| name           | String   | formData字段名                                    |
| uploadBefore   | Function | 上传之前触发，参数返回file文件，返回false则不上传 |
| uploadProgress | Function | 上传中触发，参数返回上传中结果                    |
| uploadSuccess  | Function | 上传成功触发，参数返回上传后的结果和注入方法      |
| uploadError    | Function | 上传失败触发，参数返回错误                        |
| showProgress   | Boolean  | 是否展示上传进度条（可自行在uploadProgress定义）  |



- **uploadVideo**

上传图片配置

| 属性           | 类型     | 说明                                              |
| -------------- | -------- | ------------------------------------------------- |
| url            | String   | 上传视频的地址                                    |
| name           | String   | formData字段名                                    |
| uploadBefore   | Function | 上传之前触发，参数返回file文件，返回false则不上传 |
| uploadProgress | Function | 上传中触发，参数返回上传中结果                    |
| uploadSuccess  | Function | 上传成功触发，参数返回上传后的结果和注入方法      |
| uploadError    | Function | 上传失败触发，参数返回错误                        |
| showProgress   | Boolean  | 是否展示上传进度条（可自行在uploadProgress定义）  |



## 例子

参考 `/example`

````
<template>
  <div id="app">
    <VueEditor :config="config"/>
  </div>
</template>
````



  ```
<script>
import VueEditor from "vue-word-editor";

// 需要单独引入样式
import "quill/dist/quill.snow.css"

export default {
  name: 'app',
  data(){
    return {
      config: {
        modules: { 
          // 工具栏
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
            ['image', 'video'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction
          ]
        },
        // 主题
        theme: 'snow',
        uploadImage: {
          url: "http://localhost:1337/upload",
          name: "files",
          uploadBefore(file){
            return true
          },
          uploadProgress(res){

          },
          uploadSuccess(res, insert){
            insert("http://localhost:1337" + res.data[0].url)
          },
          uploadError(){},
          showProgress: false
        },

        uploadVideo: {
          //url: "http://157.122.54.189:9095/upload",
          url: "http://localhost:1337/upload",
          name: "files",
          uploadBefore(file){
            return true
          },
          uploadProgress(res){

          },
          uploadSuccess(res, insert){
            insert("http://localhost:1337" + res.data[0].url)
          },
          uploadError(){},
        }
      }
    }
  },

  components: {
    VueEditor
  },
}
</script>
  ```

