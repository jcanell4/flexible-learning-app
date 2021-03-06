package org.elsquatrecaps.flexiblelearning.persistence;

import org.elsquatrecaps.flexiblelearning.learningproposal.LearningProposalConfiguration;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 *
 * @author josep
 */
@Repository
public interface LearningProposalRepository extends MongoRepository<LearningProposalConfiguration, String>{
    
}
