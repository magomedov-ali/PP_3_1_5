package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.RegistrationService;
import ru.kata.spring.boot_security.demo.services.UserService;

import java.util.Set;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;
    private final RegistrationService registrationService;

    @Autowired
    public AdminController(UserService userService, RegistrationService registrationService) {
        this.userService = userService;
        this.registrationService = registrationService;
    }

    @GetMapping("/view")
    public ModelAndView adminPage() {
        return new ModelAndView("admin");
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id) {
        return new ResponseEntity<>(userService.findById(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Set<User>> getAllUsers() {
        return new ResponseEntity<>(userService.findAllFetchRoles(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<HttpStatus> create(@RequestBody User user) {
        registrationService.register(user);
        return ResponseEntity.ok(HttpStatus.CREATED);
    }

    @PatchMapping
    public ResponseEntity<HttpStatus> update(@RequestBody User user) {
        registrationService.update(user);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable int id) {
        userService.delete(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

}