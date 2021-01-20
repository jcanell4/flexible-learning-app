/* 
 * Copyright 2020 Grup de millora MetFlex.
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

import getAjaxObject from './lib/ajax.js';
import LibTemplate from './lib/GlobalLibTemplate.js'


function getNavManager(){
    var libNav={
        /* Toggle the width of the sidebar between 0px and 250px*/
        toggleRelatedResources: function() {
          var $button = $("#relatedResourcesButton");
          var $node = $("#relatedResourcesSidepanel");
          var width = $node.width();
          if(width==0){
            this.openRelatedResources($node, $button);
          }else{
            this.closeRelatedResources($node, $button);
          }
        },
        /* Set the width of the sidebar to 250px (show it) */
        openRelatedResources:function ($node, $button) {
          if(!$node){
            $node = $("#relatedResourcesSidepanel");
          }
          if(!$button){
            $button = $("#relatedResourcesButton");
          }
          $node.width(250);
          $button.addClass("pressed");
        }, 
        /* Set the width of the sidebar to 0 (hide it) */
        closeRelatedResources: function($node, $button) {
          if(!$node){
            $node = $("#relatedResourcesSidepanel");
          }
          if(!$button){
            $button = $("#relatedResourcesButton");
          }
          $node.width(0);
          $button.removeClass("pressed");
        },
        /* Toggle the width of the sidebar between 0px and 250px*/
        toggleInfoPanel: function () {
          var $button = $("#infoButton");
          var $node = $("#infoPanel");
          if($node.height()===0){
            this.openCentralPanel($node, $button);
          }else{
            this.closeCentralPanel($node, $button);
          }
        },
        /* Set the width of the sidebar to 250px (show it) */
        openInfoPanel: function ($node, $button) {
          if(!$node){
            $node = $("#infoPanel");
          }
          if(!$button){
            $button = $("#infoButton");
          }
          this.openCentralPanel($node, $button);
        },
        /* Set the width of the sidebar to 0 (hide it) */
        closeInfoPanel: function($node, $button) {
          if(!$node){
            $node = $("#infoPanel");
          }
          if(!$button){
            $button = $("#infoButton");
          }
          this.closeCentralPanel($node, $button);
        },
        /* Toggle the width of the sidebar between 0px and 250px*/
        toggleExplanatoryVideo: function() {
          var $button = $("#explanatoryVideoButton");
          var $node = $("#explanatoryVideoPanel");
          if($node.height()===0){
            this.openCentralPanel($node, $button);
          }else{
            this.closeCentralPanel($node, $button);
          }
        },
        /* Set the width of the sidebar to 250px (show it) */
        openExplanatoryVideo: function($node, $button) {
          if(!$node){
            $node = $("#explanatoryVideoPanel");
          }
          if(!$button){
            $button = $("#explanatoryVideoButton");
          }
          this.openCentralPanel($node, $button);
        },
        /* Set the width of the sidebar to 0 (hide it) */
        closeExplanatoryVideo: function ($node, $button) {
          if(!$node){
            $node = $("#explanatoryVideoPanel");
          }
          if(!$button){
            $button = $("#explanatoryVideoButton");
          }
          this.closeCentralPanel($node, $button);
        }, 
        /* Toggle the width of the sidebar between 0px and 250px*/
        toggleSummaryPanel: function() {
          var $button = $("#summaryButton");
          var $node = $("#summaryPanel");
          if($node.height()===0){
            this.openCentralPanel($node, $button);
          }else{
            this.closeCentralPanel($node, $button);
          }
        },
        /* Set the width of the sidebar to 250px (show it) */
        openSummaryPanel: function($node, $button) {
          if(!$node){
            $node = $("#summaryPanel");
          }
          if(!$button){
            $button = $("#summaryButton");
          }
          this.openCentralPanel($node, $button);
        }, 
        /* Set the width of the sidebar to 0 (hide it) */
        closeSummaryPanel: function($node, $button) {
          if(!$node){
            $node = $("#summaryPanel");
          }
          if(!$button){
            $button = $("#summaryButton");
          }
          this.closeCentralPanel($node, $button);
        },
        openCentralPanel: function($node, $button) {
          var currenth = $node.css("height");
          var height = "auto";
          if($node.data('height')){
              height = $node.data('height');
          }
          $node.css({"height":height, "border-width":"5px"});
          var autoh = $node.css("height");
          $node.css("height", currenth);
          $node.animate({"height":autoh, "border-width":"5px"});
          $button.addClass("pressed");
        } ,
        closeCentralPanel: function ($node, $button) {
          $node.animate({"height":"0px", "border-width":"0px"});
          $button.removeClass("pressed");
        }, 
        openWindowFromDataAttr: function (obj){
            var width = $(window).width();
            if(width>760 ){
                var heigth = $(window).height();
                if(width>1100){
                    width=1100;
                }
                window.open(obj.dataset.url, "resourceReference", "width="+width+",height="+heigth);
            }else{
                window.open(obj.dataset.url, "resourceReference");
            }
            return false
        }        
    }
    return libNav;
}

//function getUtilities(){
//    var utils={
//        callMethod:function(obj, call, params){
//            var length, propObj, props, aMethod, ret;
//
//            propObj = obj;
//            props = call.split(".");
//            length=props.length-1;
//            for(var i=0; i<length; i++){
//                propObj = propObj[props[i]];
//            }
//
//            aMethod = /(^\w*)(\((.*)\))?/.exec(props[length]);
//            if(aMethod[3]){
//                var aparams = JSON.parse("["+aMethod[3]+"]");
//                ret = propObj[aMethod[1]](aparams);
//            }else{
//                if(params){
//                    ret = propObj[aMethod[1]](params);
//                }else{
//                    ret = propObj[aMethod[1]]();
//                }
//            }
//            return ret;
//        },
//        getProperty:function(obj, property){
//            var propObj, props;
//
//            propObj = obj;
//            props = property.split(".");
//            for(var i=0; i<props.length; i++){
//                propObj = propObj[props[i]];
//            }
//            return propObj;
//        }
//    };
//    return utils;
//}

//var LibTemplate = {
//    libNav: getNavManager(),
//    utils: getUtilities(),
//    http: getAjaxObject(),
//    actions:{},
//    runActionButton: function(action, param){
//        this.actions[action](param);
//    }
//};

LibTemplate.libNav = getNavManager();
LibTemplate.setHttpLib(getAjaxObject());

const global = (0,eval)("this");
global.mefData = LibTemplate;


$(document).ready(function(){
    $("form").submit(function(event){
        var action = $(this).attr("action");
        var method = $(this).attr("method");
        var data = $(this).serialize();
        var onLoadReplaceId = $(this).data("onLoadReplaceId");
        var afterLoading = $(this).data("afterLoading");
        var beforeLoading = $(this).data("beforeLoading");
        if(beforeLoading){
            try{
                LibTemplate.utils.callMethod(LibTemplate, beforeLoading, onLoadReplaceId);
            }catch(err){
                console.log(err.message);
                //mostrar informació d'error!
            }
        }
        var url = new URL(action, document.baseURI).href;
        if(onLoadReplaceId){
           LibTemplate.http.load("#"+onLoadReplaceId, url, method, data, function(){
                    if(afterLoading){
                        try{
                            var message, $infoNode;
                            message = LibTemplate.utils.callMethod(LibTemplate, afterLoading, onLoadReplaceId);
                            if(message){
                                $infoNode = $("#infoMessagePanel");
                                $infoNode.removeClass("error");
                                $infoNode.removeClass("info");
                                $infoNode.addClass("success");
                                $infoNode.text(message);
                            }
                        }catch(err){
                            console.log(err.message);
                            //mostrar informació d'error!
                            var $infoNode = $("#infoMessagePanel");
                            $infoNode.removeClass("success");
                            $infoNode.removeClass("info");
                            $infoNode.addClass("error");
                            $infoNode.text("Error: " + err.message);
                        }
                    }
                }, function(errorResponse){
                    var $infoNode = $("#infoMessagePanel");
                    $infoNode.removeClass("success");
                    $infoNode.removeClass("info");
                    $infoNode.addClass("error");
                    $infoNode.text("Error: " + errorResponse.responseJSON.error + " " + errorResponse.responseJSON.message); 
                }); 
            
        }else{     
            LibTemplate.http.request(url, method, data, function(d){
                console.log(d);
            }, function(e){
                console.log("error");
            });
        }
        event.preventDefault();
    });
    
     $("a.resourceReference").click(function(){
        LibTemplate.libNav.closeRelatedResources();
        LibTemplate.libNav.openWindowFromDataAttr(this);
    });
});

export {LibTemplate as default, getNavManager};