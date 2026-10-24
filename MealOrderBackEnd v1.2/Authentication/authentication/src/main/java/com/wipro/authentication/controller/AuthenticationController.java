package com.wipro.authentication.controller;

import com.wipro.authentication.dto.LoginRequest;
import com.wipro.authentication.dto.RegisterUserResponse;
import com.wipro.authentication.dto.RegistrationRequest;
import com.wipro.authentication.dto.UserLogin;
import com.wipro.authentication.model.User;
import com.wipro.authentication.repository.UserRepository;
import com.wipro.authentication.security.JwtUtil;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class AuthenticationController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<RegisterUserResponse> register(@RequestBody RegistrationRequest request) {
        User newUser = new User();
        RegisterUserResponse registerUserResponse = new RegisterUserResponse();
        newUser.setUsername(request.getUsername());
        String pass = passwordEncoder.encode(request.getPassword());
        newUser.setPassword(pass);
        newUser.setEmail(request.getEmail());
        newUser.setRole(request.getRole());
        userRepository.save(newUser);
        registerUserResponse.setMessage("User registered successfully!");
        return ResponseEntity.ok(registerUserResponse);
    }

    @PostMapping("/register/adminAndProvider")
    public ResponseEntity<RegisterUserResponse> registerAdmin(@RequestBody RegistrationRequest request) {
        User newUser = new User();
        RegisterUserResponse registerUserResponse = new RegisterUserResponse();
        newUser.setUsername(request.getUsername());
        String pass = passwordEncoder.encode(request.getPassword());
        newUser.setPassword(pass);
        newUser.setEmail(request.getEmail());
        newUser.setRole(request.getRole());
        userRepository.save(newUser);
        registerUserResponse.setMessage("Admin/Provider registered successfully!");
        return ResponseEntity.ok(registerUserResponse);
    }

    @GetMapping("/getAllUsers")
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    @PostMapping("/login")
    public ResponseEntity<UserLogin> login(@RequestBody LoginRequest request) throws AuthenticationException {
        UserLogin userLogin = new UserLogin();
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        // final var userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        User userDetails = userRepository.findByEmail(request.getEmail())
        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        userLogin.setJwt(jwtUtil.generateToken(userDetails.getUsername(), userDetails.getRole()));
        return ResponseEntity.ok(userLogin);
    }
}
