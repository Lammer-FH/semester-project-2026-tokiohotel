package com.tokiohotel.backend.dto;

import jakarta.validation.constraints.NotBlank;

public record ExtraDto(
        Long id,

        @NotBlank(message = "Name must not be blank")
        String name,

        @NotBlank(message = "Icon must not be blank")
        String icon
) {}
