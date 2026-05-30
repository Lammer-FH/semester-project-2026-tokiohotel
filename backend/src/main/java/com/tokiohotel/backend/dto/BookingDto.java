package com.tokiohotel.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record BookingDto(
        Long id,
        GuestDto guest,
        RoomDto room,
        BigDecimal totalCost,
        LocalDate bookingDate,
        LocalDate startDate,
        LocalDate endDate,
        Boolean withBreakfast
) {}
