package com.tokiohotel.backend.mapper;

import com.tokiohotel.backend.dto.RoomTypeDto;
import com.tokiohotel.backend.entity.RoomType;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {ExtraMapper.class})
public interface RoomTypeMapper {

    RoomTypeDto toDto(RoomType roomType);

    @Mapping(target = "rooms", ignore = true)
    RoomType toEntity(RoomTypeDto roomTypeDto);
}