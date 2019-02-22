package com.wearoft.beta.gateway.service;

import com.wearoft.beta.gateway.domain.MyUser;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing MyUser.
 */
public interface MyUserService {

    /**
     * Save a myUser.
     *
     * @param myUser the entity to save
     * @return the persisted entity
     */
    MyUser save(MyUser myUser);

    /**
     * Get all the myUsers.
     *
     * @return the list of entities
     */
    List<MyUser> findAll();


    /**
     * Get the "id" myUser.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<MyUser> findOne(Long id);

    /**
     * Delete the "id" myUser.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
