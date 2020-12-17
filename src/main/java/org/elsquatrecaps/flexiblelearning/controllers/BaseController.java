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
package org.elsquatrecaps.flexiblelearning.controllers;

import org.elsquatrecaps.flexiblelearning.learningstate.LearningState;
import org.elsquatrecaps.flexiblelearning.persistence.LearningStateRepository;
import org.elsquatrecaps.flexiblelearning.services.StarterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author josep
 */

@Controller
@EnableAutoConfiguration
public class BaseController {
    
    @Autowired 
    StarterService starterService;
    
    @RequestMapping("/")
    public String startAct(){
        
        return "index";
    }
    
    @RequestMapping("/getlp")
    public ModelAndView startGetlp(@RequestParam(name = "stuId") String studentId, @RequestParam(name="lpId") String learningProposalId){
        ModelAndView modelAndView= null;
       
        try {
//            StarterService starterService = new StarterService(learningStateRepository);
            modelAndView = starterService.start(studentId, learningProposalId);
//            modelAndView = new ModelAndView("mef/mef_base");
//            modelAndView.addObject("maindata", "studentId: ".concat(studentId).concat("\n learningProposalId: ").concat(learningProposalId).concat("\n activityId: ").concat(ls.getCurrentActivityId()));
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
        
        return modelAndView;         
    }
    
}
