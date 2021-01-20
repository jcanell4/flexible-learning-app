import getClueManager from "./lib/clues.js";
import RequestTimerClass, {getRequestTimersManager, TimerDataConfig} from "./lib/requestTimer.js";
import LibTemplate from "./mef.js";



LibTemplate.timerObjectData = new TimerDataConfig();
Object.assign(LibTemplate.timerObjectData, {
    timeLapsed:0,
    counter: 0,
    getDataToSend : function(){            
        this.counter++;  
        return {"editor": this.editor.getDoc().getValue(), "counter": this.counter, "timeLapsed":this.timeLapsed};
    }
});

Object.assign(LibTemplate.actions, {
    nextActivity:function(param){
        console.log('LibTemplate#nextActivity('+param+')');
    },
    toHomePage:function(param){
        console.log('LibTemplate#toHomePage('+param+')');            
    },
    showTimerClue:function(remoteParams, localParams){
        $("#"+localParams.onLoadReplaceId).html(remoteParams.fragment);
        LibTemplate.timerObjectData.clueId=remoteParams.nextId;
        LibTemplate.clues.viewClueContent(localParams.onLoadReplaceId);
    }
});

    
LibTemplate.clues=getClueManager();

LibTemplate.utils.requestTimers = getRequestTimersManager();

veet.split.setSplit('splitterVert',{splitterSize:'10',startPosition:'25',minSizePanel1:'10',minSizePanel2:'15',fixedPanel2:true});
veet.split.setSplit('splitterHorl',{splitterSize:'10',startPosition:'50',minSizePanel1:'10',minSizePanel2:'15',fixedPanel2:true});
veet.split.setSplit('splitterHorr',{splitterSize:'10',startPosition:'75',minSizePanel1:'10',minSizePanel2:'5',fixedPanel2:true});

//CodeMirror
var taheight = $("#editor").height();
var tawidth = $("#editor").width();
var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
    autoCloseBrackets:true,
    autoCloseTags:true,
    lineWrapping: false,    
    lineNumbers:true,
    styleActiveLine: true,
    matchBrackets:true,
    matchTags:true,
});
editor.setSize(tawidth, taheight);
editor.on("focus", function(event){
    LibTemplate.clues.closeAllClues();
});
editor.on("mousedown", function(event){
    LibTemplate.clues.closeAllClues();
});

//var urlByType = {mode:"../../codemirror/mode/%N/%N.js", addons:"../../codemirror/addon/%N.js"};
//
//function autoLoadMode (instance, mode) {
//    if (!CodeMirror.modes.hasOwnProperty(mode))
//        requireMode(mode, function() {
//        instance.setOption("mode", instance.getOption("mode"));
//    });
//}
//
//function requireMode(mode, cont) {
//    if (typeof mode != "string") mode = mode.name;
//    if (CodeMirror.modes.hasOwnProperty(mode)) return ensureDeps(mode, cont);
//    if (loading.hasOwnProperty(mode)) return loading[mode].push(cont);
//
//    var file = urlByType.mode.replace(/%N/g, mode);
//    var script = document.createElement("script");
//    script.src = file;
//    var others = document.getElementsByTagName("script")[0];
//    var list = loading[mode] = [cont];
//    CodeMirror.on(script, "load", function() {
//      ensureDeps(mode, function() {
//        for (var i = 0; i < list.length; ++i) list[i]();
//      });
//    });
//    others.parentNode.insertBefore(script, others);
//}
//
//function ensureDeps(mode, cont) {
//    var deps = CodeMirror.modes[mode].dependencies;
//    if (!deps) return cont();
//    var missing = [];
//    for (var i = 0; i < deps.length; ++i) {
//        if (!CodeMirror.modes.hasOwnProperty(deps[i])) missing.push(deps[i]);
//    }
//    if (!missing.length) return cont();
//    var split = splitCallback(cont, missing.length);
//    for (var i = 0; i < missing.length; ++i){
//        requireMode(missing[i], split);
//    }
//}
//
//function splitCallback(cont, n) {
//    var countDown = n;
//    return function() { if (--countDown == 0) cont(); };
//}
//
//var loading = {};

LibTemplate.timerObjectData.editor=editor;
$(document).ready(function(){
    $("mef-config[data-type='timer']").each(function(){
        var id, 
            t = new RequestTimerClass(
                $(this).data("time"),
                $(this).data("url"),
                $(this).data("dataObject"),
                $(this).data("requestMethod"),
                $(this).data("callableObject"),
                $(this).data("getDataToSend"),
                {"onLoadReplaceId":"clueForm"},
                LibTemplate
        );     
        t.run();
        id = this.id;
        LibTemplate.utils.requestTimers.setTimer(id, t);
        LibTemplate.timerObjectData.timeLapsed=$(this).data("time");
        editor.on("change", function(event){
            LibTemplate.clues.closeAllClues();
            LibTemplate.utils.requestTimers.getTimer(id).restart();
        });
    }); 
    
    var $mefModeElement = $("mef-config#codemirrorMode").first();
    if($mefModeElement && $mefModeElement.data("modeName")){     
        CodeMirror.modeURL = $mefModeElement.data("modeUrl")?$mefModeElement.data("modeUrl"):"./js/codemirror/mode/%N/%N.js";
        editor.setOption("mode", $mefModeElement.data("modeName"));
        CodeMirror.autoLoadMode(editor, $mefModeElement.data("modeName"));
//        
//        function change() {
//  var val = modeInput.value, m, mode, spec;
//  if (m = /.+\.([^.]+)$/.exec(val)) {
//    var info = CodeMirror.findModeByExtension(m[1]);
//    if (info) {
//      mode = info.mode;
//      spec = info.mime;
//    }
//  } else if (/\//.test(val)) {
//    var info = CodeMirror.findModeByMIME(val);
//    if (info) {
//      mode = info.mode;
//      spec = val;
//    }
//  } else {
//    mode = spec = val;
//  }
//  if (mode) {
//    editor.setOption("mode", spec);
//    CodeMirror.autoLoadMode(editor, mode);
//    document.getElementById("modeinfo").textContent = spec;
//  } else {
//    alert("Could not find a mode corresponding to " + val);
//  }
//}
    }
});

export default LibTemplate;

