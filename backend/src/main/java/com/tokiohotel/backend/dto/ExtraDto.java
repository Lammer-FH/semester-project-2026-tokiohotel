package com.tokiohotel.backend.dto;

import jakarta.validation.constraints.NotBlank;

public record ExtraDto(
        Long id,

        @NotBlank(message = "Name darf nicht leer sein")
        String name,

        @NotBlank(message = "Icon darf nicht leer sein")
        String icon
) {}
