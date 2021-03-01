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
package org.elsquatrecaps.flexiblelearning.services;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.PostConstruct;
import org.elsquatrecaps.flexiblelearning.eventactivity.request.EventData;
import org.elsquatrecaps.flexiblelearning.eventactivity.request.EventDataMap;
import org.elsquatrecaps.flexiblelearning.eventactivity.responses.EventResponseData;
import org.elsquatrecaps.flexiblelearning.eventcomposer.components.ActivityEventProcessorConfiguration;
import org.elsquatrecaps.flexiblelearning.eventcomposer.components.MefActivityEventProcessorConfiguration;
import org.elsquatrecaps.flexiblelearning.eventcomposer.components.ActivityEventProcessorId;
import org.elsquatrecaps.flexiblelearning.eventcomposer.components.BaseEventComponentConfiguration;
import org.elsquatrecaps.flexiblelearning.eventcomposer.components.BaseGroupingOfEventProcessorsConfiguration;
import org.elsquatrecaps.flexiblelearning.learningstate.LearningState;
import org.elsquatrecaps.flexiblelearning.manager.event.BaseEventManager;
import org.elsquatrecaps.flexiblelearning.manager.event.EventManager;
import org.elsquatrecaps.flexiblelearning.manager.starter.BaseStarterManager;
import org.elsquatrecaps.flexiblelearning.persistence.ActivityRepository;
import org.elsquatrecaps.flexiblelearning.persistence.ClueSetConfigRepository;
import org.elsquatrecaps.flexiblelearning.persistence.LearningProposalRepository;
import org.elsquatrecaps.flexiblelearning.persistence.LearningStateRepository;
import org.elsquatrecaps.flexiblelearning.manager.starter.StarterManager;
import org.elsquatrecaps.flexiblelearning.persistence.EventRepository;
import org.elsquatrecaps.mef.learningproposal.MefCodeEditorActivityConfiguration;
import org.elsquatrecaps.mef.learningproposal.MefLearningProposalConfiguration;
import org.elsquatrecaps.mef.templates.viewcomposer.components.codeeditor.MefCodeEditorModeConfig;
import org.elsquatrecaps.mef.templates.viewcomposer.components.miscelanea.MefClueComponent;
import org.elsquatrecaps.mef.templates.viewcomposer.components.miscelanea.MefTimerConfig;
import org.elsquatrecaps.mef.templates.viewcomposer.template.ItemResource;
import org.elsquatrecaps.mef.templates.viewcomposer.components.progessbar.ProgressBarNode;
import org.elsquatrecaps.mef.templates.viewcomposer.template.VideoResource;
import org.elsquatrecaps.mef.templates.viewcomposer.components.progessbar.MefLinialProgressbarComponent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author josep
 */

@Service
public class AppService{
    StarterManager starterManager;
    EventManager eventManager;
    @Autowired 
    LearningStateRepository learningStateRepository;
    @Autowired 
    LearningProposalRepository learningProposalRepository;
    @Autowired 
    ActivityRepository activityRepository;
    @Autowired 
    EventRepository eventRepository;
    @Autowired 
    ClueSetConfigRepository clueSetConfigRepository;

    public AppService() {}

    @PostConstruct
    public void init(){
        //Simulació de les dades de la base de dades
        MefLearningProposalConfiguration lp;
        LearningState ls;
        learningStateRepository.deleteAll();
        learningProposalRepository.deleteAll();
        activityRepository.deleteAll();
        eventRepository.deleteAll();
        
        ls = new LearningState("st001", "lp001", "ac001");
        learningStateRepository.save(ls);
        ls = new LearningState("st001", "lp002", "ac005");
        learningStateRepository.save(ls);
        ls = new LearningState("st001", "lp003", "ac008");
        learningStateRepository.save(ls);
        ls = new LearningState("st002", "lp001", "ac003");
        learningStateRepository.save(ls);
        ls = new LearningState("st002", "lp002", "ac001");
        learningStateRepository.save(ls);
        ls = new LearningState("st003", "lp001", "ac008");
        learningStateRepository.save(ls);
        
        List<String> authors = new ArrayList<>();
        authors.add("Belén Bergós");
        authors.add("Josep Cañellas");
        authors.add("Maria José Pedraza");
        authors.add("Joan Ramon Serret");
        lp = new MefLearningProposalConfiguration("lp001", "Proposta d'aprnnetatge per...", "programació, codi, java", authors);
        lp.setInfoTextToNavElement(
"                <h3>infoooooo</h3> \n" +
"                <p>Lorem ipsum dolor sit amet. Et minus minima sit voluptatibus repudiandae sed ipsam voluptatem sed similique ratione quaerat vero qui quis molestiae vel corrupti internos! Eos quia ipsam quo reprehenderit impedit quo praesentium odit ex debitis galisum est deserunt ipsa est quibusdam dignissimos eum consequuntur dignissimos. Et repellendus voluptatem sed dolorem facere et omnis rerum aut exercitationem quia ut facilis beatae.</p>\n" +
"                <p>Ut quod porro sed optio rem culpa voluptatum in distinctio sunt et quae praesentium. Et dolor rerum ab nobis iure est quas minus At pariatur nihil non accusamus nisi 33 ipsam earum et fuga quam? Aut sequi velit aut suscipit consequatur id ipsa enim quo quis sequi.</p>\n" +
"                <p>Et quia eaque ea ipsa voluptas ut commodi nemo in culpa reprehenderit nam dolor omnis eum veniam voluptatem. Sed vitae quia et laborum obcaecati sit voluptatum illum et nobis officiis.</p>\n" +
"                <p>Ut perspiciatis iste aut laborum iste est autem recusandae. Et fuga molestiae quo eveniet blanditiis qui harum reiciendis ut nostrum corrupti ut magnam reiciendis ut omnis exercitationem est nostrum sapiente. Ut quae aperiam sed distinctio quaerat ut fuga excepturi qui autem pariatur hic porro voluptatem sed tempora pariatur aut exercitationem laborum. Aut totam illum id harum iste vel quia harum et provident vitae.</p>\n" +
"                <p>Aut ipsa perferendis et saepe sint non quia voluptates nam vero quas. Ad perferendis adipisci qui eius velit aut enim sint ea veritatis alias sit vitae ratione aut sint sunt et omnis rerum? Qui vero quibusdam aut quae quod est omnis autem sed praesentium soluta et magni animi.</p>\n" +
"                <p>Ea illum pariatur ut odio praesentium qui corrupti magnam non aperiam earum. In galisum consequatur et quibusdam odio aut debitis possimus 33 cupiditate praesentium est nihil consequatur. A earum perferendis qui voluptatem atque quo sequi unde id cumque perferendis. Ab magni exercitationem officiis accusantium sit consequatur saepe.</p>\n" +
"");
        lp.setSummaryToNavElement("<div class=\"d-flex flex-column w-100\">\n" +
"                    <div class=\"d-flex\">\n" +
"                        <div class=\"border flex-fill container containerCell\" style=\"width:16%;\">\n" +
"                            <ul>\n" +
"                                <li>Bla bla bla</li>\n" +
"                                <li>Bla bla blablabla</li>\n" +
"                                <li>Bla blabla blabla</li>\n" +
"                                <li>Blablabla bla blabla blabla</li>\n" +
"                                <li>Blabla blablabla blabla</li>\n" +
"                            </ul>\n" +
"                        </div>\n" +
"                        <div class=\"d-flex flex-column flex-fill\" style=\"width:32%;\">\n" +
"                            <div class=\"border container containerCell\">\n" +
"                                <img src=\"http://evc-cit.info/cit042/examples/formulas.png\" width=\"100%\">\n" +
"                            </div>\n" +
"                            <div class=\"border container containerCell\">\n" +
"                                <img src=\"http://cs.wellesley.edu/~rds/rds05/projects/grendel/head.jpg\" width=\"100%\">\n" +
"                            </div>  \n" +
"                        </div>\n" +
"                        <div class=\"border d-flex flex-column flex-fill\" style=\"width:52%;\">\n" +
"                            <div class=\"border flex-fill container containerCell\">\n" +
"                                <img src=\"https://collaboration.cmc.ec.gc.ca/science/rpn/gem/gem-climate/Version_3.2.1/Flux_diagram.png\" width=\"100%\">\n" +
"                            </div>\n" +
"                            <div class=\"border flex-fill container containerCell\">\n" +
"                                <h2> Aaa  a a a</h2>\n" +
"                                <p>hdjkh dh jhjkh kdhask dhsk hsajkhd jksahdjkashk hjakh djksah dsahkj hsdajkhjaskh jsak.</p>\n" +
"\n" +
"                            \n" +
"                            </div>\n" +
"                        </div>\n" +
"                    </div>\n" +
"                    <div class=\"d-flex h-100\"> \n" +
"                        <div class=\"border flex-fill container containerCell\" style=\"width:50%;\">Flex item 2</div>\n" +
"                        <div class=\"border flex-fill container containerCell\" style=\"width:50%;\">Flex item 3</div>\n" +
"                    </div>\n" +
"                </div>  ");
        lp.setVideoToNavElement(new VideoResource("https://www.youtube.com/embed/u79dkQxuSv4", "thymeleaf"));
        lp.addRelatedResourceToNavElement(new ItemResource("url/recurs.1", "Recurs 1"));
        lp.addRelatedResourceToNavElement(new ItemResource("url/recurs.2", "Recurs 2"));
        lp.addRelatedResourceToNavElement(new ItemResource("url/recurs.3", "Recurs 3"));
        lp.setLearningProposalNameToNavElement("Mira el món! Tot és codi?");   
        
        MefLinialProgressbarComponent pbc = new MefLinialProgressbarComponent();
        for(int i=1; i<=10; i++){
            pbc.addProgressBarNode(new ProgressBarNode(i, String.format("Exercici %1d", i)));
        }
        
        lp.addNavProgressBarComponent(pbc);
         
        learningProposalRepository.save(lp);
        
        MefCodeEditorActivityConfiguration mefActivityConfiguration = new MefCodeEditorActivityConfiguration("ac001");
        
        mefActivityConfiguration.getCodeActivity().setStatement("Volem fer un algoritme que cerqui si una llista de valors enters conté el valor 19");
        mefActivityConfiguration.getCodeActivity().getInstructions().add("Assigna a la variable <i>a_trobar</i> el valor 19, que desitgem cercar.");
        mefActivityConfiguration.getCodeActivity().getInstructions().add("Inicialitza la variable <i>pos</i> tenint en compte que indicarà la posició de lectura de la llista durant la cerca.");
        mefActivityConfiguration.getCodeActivity().getInstructions().add("Inicialitza la resta de variables que necessitaràs per fer la cerca.");
        mefActivityConfiguration.getCodeActivity().getInstructions().add("Posa la condició de sortida del bucle.");
        mefActivityConfiguration.getCodeActivity().getInstructions().add("Marca la variable <i>trobat</i> en funció de si hi ha algun element de l'array que coincideix amb el valor de la variable <i>a_trobar</i>.");
        mefActivityConfiguration.getCodeActivity().getInstructions().add("Mostra per pantalla el resultat de la cerca.");        
        mefActivityConfiguration.getCodeActivity().getEditor().setFontsize(14);
        mefActivityConfiguration.getCodeActivity().getEditor().setMode("python");
        mefActivityConfiguration.getCodeActivity().getEditor().setDefaultText("values=[10, 20, 4, 7, 2, 19, 26, 1, 17, 0, 3, 21]\n\n"
                + "a_trobar = ____\n"
                + "pos = ____\n"
                + "____ =  ____\n"
                + "____ =  ____\n"
                + "while _______:\n"
                + "   trobat = values[pos]==a_trobar\n"
                + "   pos = pos + 1\n\n"
                + "_____"
                + "");
        mefActivityConfiguration.getConfigComponentElements().add(
                        new MefTimerConfig(5000, "processEventToJson/eco"));
        mefActivityConfiguration.getConfigComponentElements().add(
                        new MefCodeEditorModeConfig(mefActivityConfiguration.getCodeActivity().
                                getEditor().getMode()));
        MefClueComponent mefClueComponent = new MefClueComponent("cls-001");
        mefClueComponent.getClueConfigData().addAllowedClueIteratorType("SequentialClueIterator");
        
        mefActivityConfiguration.getComponentMap().put("clueComponent", mefClueComponent);

        activityRepository.save(mefActivityConfiguration);
        
        ActivityEventProcessorConfiguration activityEventProcessorConfiguration = new MefActivityEventProcessorConfiguration(
                new ActivityEventProcessorId("lp001", "ac001", "eco"),
                new BaseEventComponentConfiguration("default", "SimpleMapActivityEventDataConverter"),
                new BaseGroupingOfEventProcessorsConfiguration("mef", "MefActivityEventResponseHandler")
        );
        activityEventProcessorConfiguration.getEventComponentConfigurationList().add(new BaseEventComponentConfiguration("default", "EcoEventProcessor"));
        eventRepository.save(activityEventProcessorConfiguration);
        
        
        //FI de la simulació de dades
        
        //Codi de l'init
        starterManager = new BaseStarterManager();
        starterManager.init(learningStateRepository, learningProposalRepository, activityRepository);
        eventManager = new BaseEventManager();
        eventManager.init(eventRepository, learningStateRepository, learningProposalRepository, activityRepository);

    }
    
    public ModelAndView start(String studentId, String learningProposalId){
        ModelAndView modelAndView = null;
        modelAndView = starterManager.start(studentId, learningProposalId);
        return modelAndView;
    }
    
    public ModelAndView processEventToHtml(String lpId, String stId, String eventName, EventDataMap eventData){
        ModelAndView modelAndView = null;
        modelAndView = eventManager.processEventAndResponseHtml(eventData);
        return modelAndView;
    }

    public EventResponseData processEventToJson(String lpId, String stId, String eventName, EventDataMap eventData){
        EventResponseData ret = null;
        ret = eventManager.processEventAndResponseJson(lpId, stId, eventName, eventData);
        return ret;
    }
}
