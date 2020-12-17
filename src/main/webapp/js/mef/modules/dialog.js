import LibTemplate from "./mef.js";
import getModalDialogManager from "./lib/dialog.js";


$(document).ready(function(){
    LibTemplate.dialog = getModalDialogManager();
});


