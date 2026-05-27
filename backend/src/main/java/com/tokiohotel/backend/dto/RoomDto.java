package com.tokiohotel.backend.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RoomDto(
        Long id,

        @NotBlank(message = "Room number must not be blank")
        String roomNumber,

        @NotNull(message = "Room type must be assigned")
        RoomTypeDto roomType
) {}