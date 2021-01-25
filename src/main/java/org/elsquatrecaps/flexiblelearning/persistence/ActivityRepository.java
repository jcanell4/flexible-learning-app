package org.elsquatrecaps.flexiblelearning.persistence;

import org.elsquatrecaps.mef.learningproposal.MefActivityConfiguration;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 *
 * @author josep
 */
@Repository
public interface ActivityRepository extends MongoRepository<MefActivityConfiguration, String>{
    
}
