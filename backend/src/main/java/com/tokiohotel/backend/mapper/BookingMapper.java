package com.tokiohotel.backend.mapper;

import com.tokiohotel.backend.dto.BookingDto;
import com.tokiohotel.backend.entity.Booking;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {GuestMapper.class, RoomMapper.class})
public interface BookingMapper {

    BookingDto toDto(Booking booking);
}
