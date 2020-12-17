import getClueManager from "./lib/clues.js";
import LibTemplate, {getRequestTimersManager, RequestTimerClass} from "./mef.js";


LibTemplate.timerObjectData = {
    timeLapsed:0,
    clueId:0,
    counter: 0,
    editor:null,
    getDataToSend:function(){            
        this.counter++;
        return {"editor": this.editor.getDoc().getValue(), "clueId": this.clueId, "counter": this.counter, "timeLapsed":this.timeLapsed};
    }
};

LibTemplate.actions = {
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
};
    
LibTemplate.clues=getClueManager();

LibTemplate.utils.requestTimers = getRequestTimersManager();

veet.split.setSplit('splitterWirtter',{splitterSize:'10',startPosition:'25',minSizePanel1:'10',minSizePanel2:'15',fixedPanel2:true});
var taheight = $("#editor").height();
var tawidth = $("#editor").width();
var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
  lineWrapping: true,
  indentWithTabs: true,
  spellcheck:true,          
});
editor.setSize(tawidth, taheight);
editor.on("focus", function(event){
    LibTemplate.clues.closeAllClues();
});
editor.on("mousedown", function(event){
    LibTemplate.clues.closeAllClues();
});
LibTemplate.timerObjectData.editor=editor;
$(document).ready(function(){
    $("mef-timer").each(function(){
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
});

export default LibTemplate;