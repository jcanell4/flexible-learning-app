package org.elsquatrecaps.flexiblelearning.controllers;

import java.util.Map;
import java.util.function.BiConsumer;
import org.elsquatrecaps.flexiblelearning.eventmanager.responses.CallableJavascript;
import org.elsquatrecaps.flexiblelearning.eventmanager.responses.EventResponse;
import org.elsquatrecaps.flexiblelearning.services.AppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.thymeleaf.TemplateEngine;

/**
 *
 * @author josep
 */
@RestController
public class AppRestController {
    @Autowired 
    AppService starterService;
    @Autowired
    private TemplateEngine templateEngine;
    
    @RequestMapping("/autoTimerFeedback")
    public EventResponse autoFeedback(@RequestParam Map<String, String> eventData){
        StringBuilder p = new StringBuilder();
        EventResponse ret = new EventResponse();
        CallableJavascript call = new CallableJavascript();
        p.append("PROVA DEL RequestTimer. Els paràmetres enviats al servidor han estat:\n\n");
        eventData.forEach(new BiConsumer<String, String>() {
            @Override
            public void accept(String key, String value) {
                p.append(key + ": " + value +"\n"); 
            }
        });
        call.setName("alert");
        call.setParam("text", p.toString());
        ret.setOnReciveCallable(call);
        return ret;
    }    
}
