package com.tokiohotel.backend.mapper;

import com.tokiohotel.backend.dto.GuestDto;
import com.tokiohotel.backend.entity.Guest;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GuestMapper {

    GuestDto toDto(Guest guest);
}
