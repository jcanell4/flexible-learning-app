/*
 * Copyright 2021 Grup de millora MetFlex.
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
package org.elsquatrecaps.flexiblelearning.persistence;

import org.elsquatrecaps.flexiblelearning.eventcomposer.components.ActivityEventProcessorConfiguration;
import org.elsquatrecaps.flexiblelearning.eventcomposer.components.ActivityEventProcessorId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author josep
 */
@Repository
public interface EventRepository extends MongoRepository<ActivityEventProcessorConfiguration, ActivityEventProcessorId>{
    
}
