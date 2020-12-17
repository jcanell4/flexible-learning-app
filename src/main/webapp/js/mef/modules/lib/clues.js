function getClueManager(){

    var clueManager = {
        clueNodes:[],
        minClueHeight: 35,
        viewClueContent: function(onLoadReplaceId){
            var ret="";
            var id = $("#"+onLoadReplaceId+" *[id^='clueContent']")[0].id;
            var obj = document.getElementById(id);
            var nClue = parseInt(id.substring("clueContent_".length));
            ret = $(obj).data("infoMessage");
            if(this.clueNodes[id]){
                $(obj).find(" div.chevron.left").click();
            }else{
                $(".editorContainer").append(obj);
                //situa el top
                $(obj).css("top", ""+(this.minClueHeight*nClue+10)+"px");
                this.openClueContent(obj);
                this.clueNodes[id] =obj;
            }
            return ret;
        },
        closeClueContent: function(obj){
            var $clueContent =  $(obj);

            $clueContent.removeClass("opened");
            $clueContent.addClass("closed");
            $("#"+obj.id + " .chevron.right").addClass("invisible");
            $("#"+obj.id + " .chevron.left").removeClass("invisible");
            $clueContent.animate({right: "-484px"}, 500);
        },
        openClueContent: function(obj){
            var $clueContent =  $(obj);

            $clueContent.removeClass("closed");
            $clueContent.addClass("opened");
            $("#"+obj.id + " .chevron.right").removeClass("invisible");
            $("#"+obj.id + " .chevron.left").addClass("invisible");
            this.closeAllClues(obj.id);
            $clueContent.animate({right: "0"}, 500);
        },
        closeAllClues: function(exceptId){
            for(var i in this.clueNodes){
                if(!exceptId || this.clueNodes[i].id!==exceptId && this.clueNodes[i].className.includes("opened")){
                    this.closeClueContent(this.clueNodes[i]);
                }
            }
        }
    };
    return clueManager;
}

export default getClueManager;


