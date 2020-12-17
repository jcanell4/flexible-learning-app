package org.elsquatrecaps.flexiblelearning.persistence;

import org.elsquatrecaps.flexiblelearning.learningstate.LearningState;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 *
 * @author josep
 */
@Repository
public interface LearningStateRepository extends MongoRepository<LearningState, String>{
    
}
