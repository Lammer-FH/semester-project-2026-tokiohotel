package com.tokiohotel.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.Set;

public record RoomTypeDto(
        Long id,

        @NotNull(message = "Kapazität muss angegeben werden")
        @Min(value = 1, message = "Kapazität muss mindestens 1 sein")
        Integer capacity,

        @NotNull(message = "Preis muss angegeben werden")
        @Min(value = 0, message = "Preis darf nicht negativ sein")
        Double cost,

        @NotBlank(message = "Titel darf nicht leer sein")
        String title,

        String description,
        String images,
        Set<ExtraDto> extras
) {}