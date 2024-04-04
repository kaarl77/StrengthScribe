package controller;

import dto.UserDto;
import form.UserForm;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import service.UserService;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class UserController {

    private final UserService userService;

    @PostMapping(path = "/login", consumes = "application/json", produces = "application/json")
    public ResponseEntity<UserDto> login(@RequestBody UserForm userForm)
    {
        try {
            UserDto userDto = userService.login(userForm);
            userDto.setToken(userService.createToken(userDto.getUsername()));
            return new ResponseEntity<>(userDto, HttpStatus.OK);
        }
        catch (EntityNotFoundException e)
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        catch (RuntimeException e)
        {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @PostMapping(path = "/register", consumes = "application/json", produces = "application/json")
    public ResponseEntity<UserDto> register(@RequestBody UserForm userForm)
    {
        try {
            UserDto userDto = userService.register(userForm);
            userDto.setToken(userService.createToken(userDto.getUsername()));
            return new ResponseEntity<>(userDto, HttpStatus.CREATED);
        }
        catch (RuntimeException e)
        {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @GetMapping(path = "/isAuth", produces = "application/json")
    public ResponseEntity<Object> isAuth(@RequestBody UserDto userDto)
    {
        UserDto currentUser = userService.validate(userDto.getToken());
        return new ResponseEntity<>(currentUser, HttpStatus.ACCEPTED);
    }

    @GetMapping(path = "/api/users", produces = "application/json")
    public ResponseEntity<List<UserDto>> getAllUsers()
    {
        List<UserDto> usersDto = userService.getAllUsers();
        return new ResponseEntity<>(usersDto, HttpStatus.OK);
    }
}
