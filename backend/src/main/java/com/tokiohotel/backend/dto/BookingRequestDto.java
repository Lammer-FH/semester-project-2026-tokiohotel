package com.tokiohotel.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record BookingRequestDto(
        @NotNull(message = "roomId must be provided")
        Long roomId,

        @NotNull(message = "startDate must be provided")
        LocalDate startDate,

        @NotNull(message = "endDate must be provided")
        LocalDate endDate,

        @NotBlank(message = "First name must not be blank")
        String firstName,

        @NotBlank(message = "Last name must not be blank")
        String lastName,

        @NotBlank(message = "Email must not be blank")
        @Email(message = "Email must be valid")
        String email,

        Boolean withBreakfast
) {}
