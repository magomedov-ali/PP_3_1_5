package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.RegistrationService;
import ru.kata.spring.boot_security.demo.services.RoleService;
import ru.kata.spring.boot_security.demo.services.UserService;

@Controller
@RequestMapping("/main")
public class MainController {

    private final UserService userService;
    private final RoleService roleService;
    private final RegistrationService registrationService;

    @Autowired
    public MainController(UserService userService, RoleService roleService, RegistrationService registrationService) {
        this.userService = userService;
        this.roleService = roleService;
        this.registrationService = registrationService;
    }

    @GetMapping()
    public String index(@AuthenticationPrincipal UserDetails userDetails, @ModelAttribute("newUser") User newUser, Model model) {
        User authorizedUser = userService.findByUsername(userDetails.getUsername());
        model.addAttribute("users", userService.findAllFetchRoles());
        model.addAttribute("authorizedUser", authorizedUser);
        model.addAttribute("allRoles", roleService.findAll());
        return "index";
    }

//    @GetMapping("/new")
//    public String newUser(@ModelAttribute("user") User user, Model model) {
//        model.addAttribute("all_roles", roleService.findAll());
//        return "users/new";
//    }

    @PostMapping()
    public String create(@ModelAttribute("user") User user) {
        registrationService.register(user);
        return "redirect:/main";
    }

//    @PostMapping("/edit")
//    public String edit(@RequestParam("id") int id, Model model) {
//        model.addAttribute("user", userService.findOne(id));
//        model.addAttribute("all_roles", roleService.findAll());
//        return "users/edit";
//    }

    @PatchMapping("/update")
    public String update(@ModelAttribute("user") User user, @RequestParam("id") int id) {
        registrationService.update(id, user);
        return "redirect:/main";
    }

    @DeleteMapping("/delete")
    public String delete(@RequestParam("id") int id) {
        userService.delete(id);
        return "redirect:/main";
    }

}