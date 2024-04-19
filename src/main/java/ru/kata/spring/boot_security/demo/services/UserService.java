package ru.kata.spring.boot_security.demo.services;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.models.User;

import java.util.List;
import java.util.Set;

@Service
@Transactional(readOnly = true)
public interface UserService extends UserDetailsService {

    User findByUsername(String username);

    List<User> findAll();

    Set<User> findAllFetchRoles();

    User findById(int id);

    @Transactional
    void save(User user);

    @Transactional
    void update(int id, User updatedUser);

    @Transactional
    void delete(int id);

}
