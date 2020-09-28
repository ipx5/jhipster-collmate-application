package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.DvdService;
import com.mycompany.myapp.domain.Dvd;
import com.mycompany.myapp.repository.DvdRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Dvd}.
 */
@Service
@Transactional
public class DvdServiceImpl implements DvdService {

    private final Logger log = LoggerFactory.getLogger(DvdServiceImpl.class);

    private final DvdRepository dvdRepository;

    public DvdServiceImpl(DvdRepository dvdRepository) {
        this.dvdRepository = dvdRepository;
    }

    @Override
    public Dvd save(Dvd dvd) {
        log.debug("Request to save Dvd : {}", dvd);
        return dvdRepository.save(dvd);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Dvd> findAll(Pageable pageable) {
        log.debug("Request to get all Dvds");
        return dvdRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Dvd> findOne(Long id) {
        log.debug("Request to get Dvd : {}", id);
        return dvdRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Dvd : {}", id);
        dvdRepository.deleteById(id);
    }
}
