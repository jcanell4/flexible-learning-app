/* 
 * Copyright 2021 Grup de millora MetFlex.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function getUtilities(){
    var utils={
        callMethod:function(obj, call, params){
            var length, propObj, props, aMethod, ret;

            propObj = obj;
            props = call.split(".");
            length=props.length-1;
            for(var i=0; i<length; i++){
                propObj = propObj[props[i]];
            }

            aMethod = /(^\w*)(\((.*)\))?/.exec(props[length]);
            if(aMethod[3]){
                var aparams = JSON.parse("["+aMethod[3]+"]");
                ret = propObj[aMethod[1]](aparams);
            }else{
                if(params){
                    ret = propObj[aMethod[1]](params);
                }else{
                    ret = propObj[aMethod[1]]();
                }
            }
            return ret;
        },
        getProperty:function(obj, property){
            var propObj, props;

            propObj = obj;
            props = property.split(".");
            for(var i=0; i<props.length; i++){
                propObj = propObj[props[i]];
            }
            return propObj;
        }
    };
    return utils;
}

class LibForTemplates{
    constructor(){
        this.utils = getUtilities();
        this.actions = {},
        this.runActionButton = function(action, param){
            this.actions[action](param);
        };
        this.setHttpLib = function(httpObject){
            this.http = httpObject;  
        }        
    }    
}

var LibTemplate = new LibForTemplates();

export default LibTemplate;