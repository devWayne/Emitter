function Emitter(obj) {
    return mixin(obj);
}


function mixin(obj) {
    for (var key in Emitter.prototype) {
        obj[key] = Emitter.prototype[key];
    }
    return obj;
}

var proto = {

    on: function(eventName, callback) {
        this._callback = this._callback || {},
            this._callback[eventName] ? this._callback[eventName].push(callback) : (this._callback[eventName]=this._callback[eventName]||[]).push(callback);
        return this;
    },

    off: function(eventName, callback) {
        arguments.length == 0 ? this._callback = {}:
        arguments.length == 1 ? delete this._callback[eventName]:
	arguments.length == 2 ? (function(){
		this._callback[eventName]= this._callback[eventName] || [];
		this._callback[eventName].forEach(function(v,idx){
			callback === v? Array.prototype.splice.call(this._callback[eventName],idx, 1) :false;
		}.bind(this))
	}.bind(this))():false;
        return this;
    },

    once: function(eventName, callback) {
        function on() {
            this.off(event, on);
            callback.apply(this, arguments);
        }
        this.on(event, on);
        return this;
    },

    emit: function(eventName) {
	 this._callback[eventName] = this._callback[eventName] || [];
	 this._callback[eventName].forEach(function(fn,idx){
	 	fn.apply(this, arguments);
	 });
	 return this; 
    }
}

Emitter.prototype = proto;

//module.exports = Emitter;
