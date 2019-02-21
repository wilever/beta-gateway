package com.wearoft.beta.gateway.service.impl;

import com.wearoft.beta.gateway.service.MyUserService;
import com.wearoft.beta.gateway.domain.MyUser;
import com.wearoft.beta.gateway.repository.MyUserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing MyUser.
 */
@Service
@Transactional
public class MyUserServiceImpl implements MyUserService {

    private final Logger log = LoggerFactory.getLogger(MyUserServiceImpl.class);

    private final MyUserRepository myUserRepository;

    public MyUserServiceImpl(MyUserRepository myUserRepository) {
        this.myUserRepository = myUserRepository;
    }

    /**
     * Save a myUser.
     *
     * @param myUser the entity to save
     * @return the persisted entity
     */
    @Override
    public MyUser save(MyUser myUser) {
        log.debug("Request to save MyUser : {}", myUser);
        return myUserRepository.save(myUser);
    }

    /**
     * Get all the myUsers.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<MyUser> findAll() {
        log.debug("Request to get all MyUsers");
        return myUserRepository.findAll();
    }


    /**
     * Get one myUser by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<MyUser> findOne(Long id) {
        log.debug("Request to get MyUser : {}", id);
        return myUserRepository.findById(id);
    }

    /**
     * Delete the myUser by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MyUser : {}", id);        myUserRepository.deleteById(id);
    }
}
