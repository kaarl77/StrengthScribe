package service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.JWTVerifier;
import dto.UserDto;
import entity.User;
import form.UserForm;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import mapper.UserMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import repository.UserRepository;

import java.util.*;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @Value("${security.jwt.token.secret-key:secret-key}")
    private String secretKey;

    @PostConstruct
    void init(){
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public User findByUsername(String username)
    {
        Optional<User> userOptional = userRepository.findByUsername(username);

        if (userOptional.isPresent())
        {
            return userOptional.get();
        }
        else
        {
            throw new EntityNotFoundException();
        }
    }

    public User findById(Long id)
    {
        Optional<User> userOptional = userRepository.findById(id);

        if (userOptional.isPresent())
        {
            return userOptional.get();
        }
        else
        {
            throw new EntityNotFoundException();
        }
    }


    public UserDto register(UserForm userForm)
    {
        Optional<User> userOptional = userRepository.findByUsername(userForm.getUsername());

        if (userOptional.isPresent())
        {
            throw new RuntimeException("User already exists!");
        }
        else
        {
            User user = new User();
            user.setUsername(userForm.getUsername());
            user.setPassword(passwordEncoder.encode(userForm.getPassword()));
            User createdUser = userRepository.save(user);

            return userMapper.userToDto(createdUser);
        }
    }

    public UserDto login(UserForm userForm)
    {
        Optional<User> userOptional = userRepository.findByUsername(userForm.getUsername());
        if (!userOptional.isPresent())
        {
            throw new EntityNotFoundException("Unknown user!");
        }
        User user = userOptional.get();

        if (passwordEncoder.matches(userForm.getPassword(), user.getPassword()))
        {
            return userMapper.userToDto(user);
        }
        throw new RuntimeException("Invalid password!");
    }

    public List<UserDto> getAllUsers()
    {
        List<User> users = userRepository.findAll();
        List<UserDto> usersDto = new ArrayList<>();
        for (User user: users) {
            usersDto.add(userMapper.userToDto(user));
        }
        return usersDto;
    }

    public String createToken(String username)
    {
        Date now = new Date();
        Date validity = new Date(now.getTime() + 3600000);

        Algorithm algorithm = Algorithm.HMAC256(secretKey);

        return JWT.create()
                .withIssuer(username)
                .withIssuedAt(now)
                .withExpiresAt(validity)
                .sign(algorithm);
    }

    public UserDto validate(String token)
    {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);

        JWTVerifier verifier = JWT.require(algorithm).build();

        DecodedJWT decoded = verifier.verify(token);

        try
        {
            User user = findByUsername(decoded.getIssuer());
            return userMapper.userToDto(user);
        }
        catch (EntityNotFoundException e)
        {
            throw e;
        }

    }
}
