package ru.kata.spring.boot_security.demo.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.models.User;

@Service
@Transactional
public interface RegistrationService {

    void register(User user);

    void update(User updatedUser);

}
