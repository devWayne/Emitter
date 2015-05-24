Emitter [![Build Status](https://travis-ci.org/devWayne/Emitter.svg?branch=master)](https://travis-ci.org/devWayne/Emitter)
============
> Event emitter for browser

##Usage

```
var Emitter = require('Emitter');

var obj = {};

Emitter(obj);

obj.on('event',function(){})
```

##API

##### on(event,fn)

##### off([event,fn])

##### once(event,fn)

##### emit(event)

