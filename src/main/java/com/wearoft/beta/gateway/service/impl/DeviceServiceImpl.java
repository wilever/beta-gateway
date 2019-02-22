package com.wearoft.beta.gateway.service.impl;

import com.wearoft.beta.gateway.service.DeviceService;
import com.wearoft.beta.gateway.domain.Device;
import com.wearoft.beta.gateway.repository.DeviceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Device.
 */
@Service
@Transactional
public class DeviceServiceImpl implements DeviceService {

    private final Logger log = LoggerFactory.getLogger(DeviceServiceImpl.class);

    private final DeviceRepository deviceRepository;

    public DeviceServiceImpl(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    /**
     * Save a device.
     *
     * @param device the entity to save
     * @return the persisted entity
     */
    @Override
    public Device save(Device device) {
        log.debug("Request to save Device : {}", device);
        return deviceRepository.save(device);
    }

    /**
     * Get all the devices.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Device> findAll() {
        log.debug("Request to get all Devices");
        return deviceRepository.findAll();
    }


    /**
     * Get one device by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Device> findOne(Long id) {
        log.debug("Request to get Device : {}", id);
        return deviceRepository.findById(id);
    }

    /**
     * Delete the device by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Device : {}", id);        deviceRepository.deleteById(id);
    }
}
