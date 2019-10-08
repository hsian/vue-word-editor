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

上传图片和上传视频的配置 ( uploadImage / uploadVideo )

| 属性           | 类型     | 说明                                              |
| -------------- | -------- | ------------------------------------------------- |
| url            | String   | 上传图片的地址                                    |
| name           | String   | formData字段名                                    |
| uploadBefore   | Function | 上传之前触发，参数返回file文件，返回false则不上传 |
| uploadProgress | Function | 上传中触发，参数返回上传中结果                    |
| uploadSuccess  | Function | 上传成功触发，参数返回上传后的结果和注入方法      |
| uploadError    | Function | 上传失败触发，参数返回错误                        |
| showProgress   | Boolean  | 是否展示上传进度条（可自行在uploadProgress定义）  |
| headers        | Object   | 上传的头信息                                      |



## 使用



### 普通SPA使用

参考 `/example`

````html
<template>
  <div id="app">
    <VueEditor :config="config"/>
  </div>
</template>
````



  ```vue
<script>
import VueEditor from "vue-word-editor";
import "quill/dist/quill.snow.css"

export default {
  name: 'app',

  data(){
    return {
      config: {
        // 上传图片的配置
        uploadImage: {
          url: "http://localhost:3000/upload",
          name: "file",
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess(res, insert){
            insert("http://localhost:3000" + res.data.url)
          }
        },
		 
        // 上传视频的配置
        uploadVideo: {
          url: "http://localhost:3000/upload",
          name: "file",
          uploadSuccess(res, insert){
            insert("http://localhost:3000" + res.data.url)
          }
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



### SSR在Nuxtjs中使用

加个判断再引入即可

```js
import "quill/dist/quill.snow.css"
let VueEditor;

if (process.browser) {
    VueEditor = require('vue-word-editor').default
}
```



### 获取内容

1.给组件添加`ref`

```html
<VueEditor :config="config" ref="vueEditor"/>
```



2.获取富文本

```js
this.$refs.vueEditor.editor.root.innerHTML
```

> 如果想要调用quill对象的方法，可以使用this.$refs.vueEditor.editor访问quill对象