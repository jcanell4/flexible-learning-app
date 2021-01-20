package org.elsquatrecaps.flexiblelearning.persistence;

import org.elsquatrecaps.mef.templates.viewcomposer.components.miscelanea.MefClueConfigData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 *
 * @author josep
 */
@Repository
public interface ClueSetConfigRepository extends MongoRepository<MefClueConfigData, String>{
    
}
