package com.strengthscribe.strengthscribe.mapper;

import com.strengthscribe.strengthscribe.dto.UserDto;
import com.strengthscribe.strengthscribe.entity.User;
import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class UserMapper {

    public UserDto userToDto(User user)
    {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());

        return userDto;
    }
}
