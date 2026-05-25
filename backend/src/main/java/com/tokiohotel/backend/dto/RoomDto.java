package com.tokiohotel.backend.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RoomDto(
        Long id,

        @NotBlank(message = "Zimmernummer darf nicht leer sein")
        String roomNumber,

        @NotNull(message = "Zimmertyp muss zugewiesen werden")
        RoomTypeDto roomType
) {}