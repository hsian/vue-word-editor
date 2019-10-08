<template>
  <div id="app">
    <vueEditor :config="config"/>
  </div>
</template>
<script>
import vueEditor from "vue-word-editor";
import "quill/dist/quill.snow.css"

export default {
  name: 'app',

  data(){
    return {
      config: {
        uploadImage: {
          url: "http://localhost:3000/upload",
          name: "file",
          headers: {
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInVzZXJuYW1lIjoiMTAwMTAiLCJuaWNrbmFtZSI6Indvc2hpc2h1aSIsImhlYWRfaW1nIjoiIiwiZ2VuZGVyIjoxLCJpYXQiOjE1Njk2NDE2OTl9.h28pFRjheEUNVrD1vWnk8gaqOqvOnPSp4l7i2SKHreI"
          },
          uploadBefore(file){
            return true
          },
          uploadProgress(res){

          },
          uploadSuccess(res, insert){
            console.log(res)
            insert("http://localhost:3000" + res.data.data.url)
          },
          uploadError(){}
        },

        uploadVideo: {
          //url: "http://157.122.54.189:9095/upload",
          url: "http://localhost:3000/upload",
          name: "file",
          headers: {
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInVzZXJuYW1lIjoiMTAwMTAiLCJuaWNrbmFtZSI6Indvc2hpc2h1aSIsImhlYWRfaW1nIjoiIiwiZ2VuZGVyIjoxLCJpYXQiOjE1Njk2NDE2OTl9.h28pFRjheEUNVrD1vWnk8gaqOqvOnPSp4l7i2SKHreI"
          },
          uploadBefore(file){
            return true
          },
          uploadProgress(res){

          },
          uploadSuccess(res, insert){
            insert("http://localhost:3000" + res.data.data.url)
          },
          uploadError(){},
        }
      }
    }
  },

  components: {
    vueEditor
  },
}
</script>

<style>

</style>
