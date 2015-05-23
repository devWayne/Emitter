function Emitter() {
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
            this._callback[eventName] ? this._callback[eventName].push(callback) : [].push(callback);
        return this;
    },

    off: function(eventName, callback) {
        arguments.length == 0 && this._callback = {};
        arguments.length == 1 && delete this._callback[eventName];
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

module.exports = Emitter;
