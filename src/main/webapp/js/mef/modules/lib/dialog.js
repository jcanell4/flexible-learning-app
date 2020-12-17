function getModalDialogManager(){
    var LibDialog={
        showModal:function(id){
            $("#"+id).modal();
        }
    };
    
    return LibDialog;
}

export default getModalDialogManager;

