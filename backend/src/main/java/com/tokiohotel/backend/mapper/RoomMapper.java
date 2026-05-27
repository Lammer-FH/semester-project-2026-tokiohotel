package com.tokiohotel.backend.mapper;

import com.tokiohotel.backend.dto.RoomDto;
import com.tokiohotel.backend.entity.Room;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {RoomTypeMapper.class})
public interface RoomMapper {

    RoomDto toDto(Room room);

    Room toEntity(RoomDto roomDto);
}