package org.elsquatrecaps.flexiblelearning.controllers;

import java.util.Map;
import java.util.function.BiConsumer;
import org.elsquatrecaps.flexiblelearning.eventactivity.request.EventDataMap;
import org.elsquatrecaps.flexiblelearning.eventactivity.responses.DataEventResponse;
import org.elsquatrecaps.flexiblelearning.eventactivity.responses.ShowAlertProcessor;
import org.elsquatrecaps.flexiblelearning.services.AppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.thymeleaf.TemplateEngine;
import org.elsquatrecaps.flexiblelearning.eventactivity.responses.EventResponseData;
import org.springframework.web.bind.annotation.PathVariable;

/**
 *
 * @author josep
 */
@RestController
public class AppRestController {
    @Autowired 
    AppService appService;
    @Autowired
    private TemplateEngine templateEngine;
    
    @RequestMapping("/processEventToJson/{eventName}")
    public EventResponseData processEvent(@PathVariable("eventName") String eventName,
            @RequestParam Map<String,String> eventparams){
        EventDataMap eventDataMap = new EventDataMap(eventparams);
        EventResponseData ret = appService.processEventToJson("lp001", "st001", eventName, eventDataMap);
        return ret;
    }
    
    @RequestMapping("/autoTimerFeedback")
    public EventResponseData autoFeedback(@RequestParam Map<String, String> eventData){
        StringBuilder p = new StringBuilder();
        DataEventResponse ret = new DataEventResponse();
//        CallableJavascript call = new CallableJavascript();
//        p.append("PROVA DEL RequestTimer. Els paràmetres enviats al servidor han estat:<br/>\n<br/>\n");
        p.append("Els paràmetres enviats al servidor han estat:<br/>\n<br/>\n");
        eventData.forEach(new BiConsumer<String, String>() {
            @Override
            public void accept(String key, String value) {
                p.append(key + ": " + value +"<br/>\n"); 
            }
        });
//        call.setName("alert");
//        call.setParam("text", p.toString());
//       ret.setOnReciveCallable(call);
        ShowAlertProcessor processor = new ShowAlertProcessor("PROVA DEL RequestTimer", p.toString());
        ret.setOnReciveProcessor(processor);
        return ret;
    }    
}
