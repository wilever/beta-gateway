package com.wearoft.beta.gateway.web.rest;
import com.wearoft.beta.gateway.domain.MyUser;
import com.wearoft.beta.gateway.service.MyUserService;
import com.wearoft.beta.gateway.web.rest.errors.BadRequestAlertException;
import com.wearoft.beta.gateway.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing MyUser.
 */
@RestController
@RequestMapping("/api")
public class MyUserResource {

    private final Logger log = LoggerFactory.getLogger(MyUserResource.class);

    private static final String ENTITY_NAME = "myUser";

    private final MyUserService myUserService;

    public MyUserResource(MyUserService myUserService) {
        this.myUserService = myUserService;
    }

    /**
     * POST  /my-users : Create a new myUser.
     *
     * @param myUser the myUser to create
     * @return the ResponseEntity with status 201 (Created) and with body the new myUser, or with status 400 (Bad Request) if the myUser has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/my-users")
    public ResponseEntity<MyUser> createMyUser(@RequestBody MyUser myUser) throws URISyntaxException {
        log.debug("REST request to save MyUser : {}", myUser);
        if (myUser.getId() != null) {
            throw new BadRequestAlertException("A new myUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MyUser result = myUserService.save(myUser);
        return ResponseEntity.created(new URI("/api/my-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /my-users : Updates an existing myUser.
     *
     * @param myUser the myUser to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated myUser,
     * or with status 400 (Bad Request) if the myUser is not valid,
     * or with status 500 (Internal Server Error) if the myUser couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/my-users")
    public ResponseEntity<MyUser> updateMyUser(@RequestBody MyUser myUser) throws URISyntaxException {
        log.debug("REST request to update MyUser : {}", myUser);
        if (myUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MyUser result = myUserService.save(myUser);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, myUser.getId().toString()))
            .body(result);
    }

    /**
     * GET  /my-users : get all the myUsers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of myUsers in body
     */
    @GetMapping("/my-users")
    public List<MyUser> getAllMyUsers() {
        log.debug("REST request to get all MyUsers");
        return myUserService.findAll();
    }

    /**
     * GET  /my-users/:id : get the "id" myUser.
     *
     * @param id the id of the myUser to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the myUser, or with status 404 (Not Found)
     */
    @GetMapping("/my-users/{id}")
    public ResponseEntity<MyUser> getMyUser(@PathVariable Long id) {
        log.debug("REST request to get MyUser : {}", id);
        Optional<MyUser> myUser = myUserService.findOne(id);
        return ResponseUtil.wrapOrNotFound(myUser);
    }

    /**
     * DELETE  /my-users/:id : delete the "id" myUser.
     *
     * @param id the id of the myUser to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/my-users/{id}")
    public ResponseEntity<Void> deleteMyUser(@PathVariable Long id) {
        log.debug("REST request to delete MyUser : {}", id);
        myUserService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
