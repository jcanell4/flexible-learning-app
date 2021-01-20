import LibTemplate from './GlobalLibTemplate.js'

function getRequestTimersManager(){
    var requestTimersManager = {
        timers: [],

        setTimer: function(id, time, url, dataObject, method, callableObject, getDataToSend, baseObject){
            var ret;
            if(time instanceof RequestTimerClass){
                ret = time;                
            }else{
                ret = new RequestTimerClass(time, url, dataObject, method, callableObject, getDataToSend, baseObject);
            }
            this.timers[id] = ret;
            return ret;
        },
        setTimerAndRun: function(id, time, url, dataObject, method, callableObject, getDataToSend, baseObject){
            var ret = this.seTimer(id, time, url, dataObject, method, callableObject, getDataToSend, baseObject);
            ret.run();
            return ret;
        },
        getTimer:function(id){
            return this.timers[id];
        }        
    };
    return requestTimersManager;
}

class TimerDataConfig{
    constructor(time, url, dataObject, method, callableObject){
        this.time = time;
        this.url = url;
        this.requestMethod = method;
        this.callableObject = callableObject;
    }
    
    setTime(time){
        this.time = time;
        return this;
    }
    
    setUrl(url){
        this.url = url;
        return this;
    }
    
    setRequestMethod(method){
        this.requestMethod = method;
        return this;
    }
    
    setCallableObject(callable){
        this.callableObject = callable;
        return this;
    }
    
    setGetDataToSend(getDataToSend){
        this.getDataToSend = getDataToSend;
        return this;
    }
    
}

class RequestTimerClass{
    constructor(time, url, dataObject, method, callableObject, getDataToSend, localParamForCallback, baseObject){
        this.baseObject = baseObject?baseObject:this;
        this.time = time;
        this.url = url;
        this._setDataObject(dataObject, getDataToSend);
        this.requestMethod=method;
        this._setCallableObject(callableObject);
        this.localParamForCallback=localParamForCallback;
    }

    _setCallableObject(callableObject, stringOnly){
        if(typeof callableObject === 'string'){
            this.callableObject = LibTemplate.utils.getProperty(this.baseObject, callableObject);
        }else if(!stringOnly){
            this.callableObject = callableObject;
        }
    }

    _setDataObject(dataObject, getDataToSend, stringOnly){
        if(typeof dataObject === 'string'){
            this.dataElement = document.getElementById(dataObject);
            if(!this.dataElement){
                this.dataObject = LibTemplate.utils.getProperty(this.baseObject, dataObject);
                this.getDataToSend = getDataToSend?getDataToSend:"getDataToSend";
            }   
        }else if(!stringOnly && dataObject instanceof Element){
            this.dataElement = dataObject;
        }else if(!stringOnly){
            this.dataObject=dataObject;
            this.getDataToSend = getDataToSend?getDataToSend:"getDataToSend";
        }            
    }

    set(timerDataConfig){
        if(timerDataConfig.dataObject){
            this._setDataObject(dataObject, getDataToSend, true);
        }else if(timerDataConfig.getDataToSend){
            this.getDataToSend = timerDataConfig.getDataToSend;
        }
        this.time = timerDataConfig.time;
        if(timerDataConfig.url){
            this.url = timerDataConfig.url;
        }
        if(timerDataConfig.requestMethod){
            this.requestMethod=timerDataConfig.requestMethod;
        }
        if(timerDataConfig.callableObject){
            this._setCallableObject(timerDataConfig.callableObject, true);
        }
    }

    run(){
        this.handler = setTimeout(this.request.bind(this), this.time);
    }

    restart(){
        this.stop();
        this.run();
    }

    stop(){
        clearTimeout(this.handler);
    }

    request(){
        var self = this;
        var data = undefined;
        if(this.dataElement){
            data = $(this.dataElement).serialize();
        }else if(this.dataObject){
            data = this.dataObject[this.getDataToSend]();
        }
        LibTemplate.http.requestRest(this.url, this.requestMethod, data,
            function(jsonResponse){ //
                self.stop();
                if(jsonResponse.onReciveCallable){
                    if(jsonResponse.onReciveCallable.params){
                        self.callableObject[jsonResponse.onReciveCallable.name](jsonResponse.onReciveCallable.params, self.localParamForCallback);
                    }else{
                        self.callableObject[jsonResponse.onReciveCallable.name](localParamForCallback);
                    }
                }
                if(jsonResponse.nextTimer){
                    self.set(jsonResponse.nextTimer);
                    self.run();
                }
            },
            function(e){
                self.stop();
                throw e;
            }
        );
    }
}

export {RequestTimerClass as default, getRequestTimersManager, TimerDataConfig};


