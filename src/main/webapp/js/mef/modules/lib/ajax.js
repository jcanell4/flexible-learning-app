

function getAjaxObject(){
    function __getUrl(url){
        var lpId = $("meta[name='id']").attr("content");
        if(lpId){
            url += url.includes('?')?('&lp_id='+lpId):('?lp_id='+lpId);
        }
        return url;
    }
    
    function __buildProp(url, method, data, complete, onError, dataType){
        var prop = {
            url : __getUrl(url),
            type: method
        };
        if($.isFunction(data)){
            complete = data;
            data = undefined;
        }
        if(data){                    
            prop.data=data;
        }
        if(complete){
            prop.complete=complete;
        }
        if(onError){
            prop.error = onError;
        }
        if(dataType){
            prop.dataType = dataType;
        }
        return prop;
    }
    
    var ajaxObject = {
        load:function(selector, url, method, data, complete, onError){
            var _loadWithError = function( /*String*/ responseText, /*String*/ textStatus, /*jqXHR*/ jqXHR ){
                if(jqXHR.status>=400){
                    onError({responseJSON:{error:""+ jqXHR.status + " HTTP Error", message:jqXHR.statusText}} );
                }else{
                    complete(responseText, textStatus, jqXHR);
                }
            };
            var ret;
            if((typeof method!=="string")
                    || !["GET", "POST"].includes(method.toUpperCase())){
                complete = data;
                data = method; 
                method = "GET";
            }
            if(method.toUpperCase()==="GET"){
                ret = $(selector).load(__getUrl(url), data, _loadWithError);
            }else{
                var prop = __buildProp(url, method, data, complete, onError);
                ret = $.ajax(prop).done(function(response){
                    $(selector).html(response);
                });
            }
            return ret;
        },
        requestRest:function(url, method, data, complete, onError){
            var ret;
            if((typeof method!=="string")
                    || !["GET", "POST"].includes(method.toUpperCase())){
                complete = data;
                data = method; 
                method = "GET";
            }
            var prop = __buildProp(url, method, data, undefined, undefined, "json");
            ret = $.ajax(prop).done(function(data){
                complete(data);
            }).fail(function(jhttp, st, thr){
                onError(thr);
            });
            return ret;   
        },
        request:function(url, method, data, complete, onError){
            var ret;
            if((typeof method!=="string")
                    || !["GET", "POST"].includes(method.toUpperCase())){
                complete = data;
                data = method; 
                method = "GET";
            }
            var prop = __buildProp(url, method, data, complete, onError);
            ret = $.ajax(prop);
            return ret;        
        }
    };
    return ajaxObject;
}

export default getAjaxObject;

