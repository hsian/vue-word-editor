export default class hook {
    constructor(){
        this.hooks = {};
    }

    add (name, callback){
        let _hook = this.hooks[name];
        if(!_hook){
            _hook = [];
        }
        _hook.push(callback);
        this.hooks[name] = _hook;
    }

    emit (name, args = []){
        let _hook = this.hooks[name];
        let res =  true;
        if(_hook){
            _hook.forEach(v => {
                if(!res) return;
                if(typeof v === "function") {
                    res = v(...args);
                }
            }) 
        }

        return res;
    }

    remove(name){
        delete this.hooks[name]; 
    }
}