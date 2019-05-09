import Vue from 'vue';
import progress from "./progress.vue";

const progressConstructor = Vue.extend(progress);
let instance;

export default {
    show(value, max){
        if(instance){
            instance.close();
        }

        instance = new progressConstructor({
            el: document.createElement("div"),
            propsData: {
                value,
                max
            }
        });

        instance.close = function() {
            instance.$el.parentNode && 
            instance.$el.parentNode.removeChild(instance.$el);
        }

        document.querySelector("#vue-editor-wrapper").appendChild(instance.$el);
        return instance;
    },
    remove(){
        instance.close();
    }
};

