package com.tokiohotel.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.Set;

public record RoomTypeDto(
        Long id,

        @NotNull(message = "Capacity must be provided")
        @Min(value = 1, message = "Capacity must be at least 1")
        Integer capacity,

        @NotNull(message = "Cost must be provided")
        @Min(value = 0, message = "Cost must not be negative")
        BigDecimal cost,

        @NotBlank(message = "Title must not be blank")
        String title,

        String description,
        String images,
        Set<ExtraDto> extras
) {}