package com.tokiohotel.backend.service;

import com.tokiohotel.backend.dto.BookingDto;
import com.tokiohotel.backend.dto.BookingRequestDto;
import com.tokiohotel.backend.entity.Booking;
import com.tokiohotel.backend.entity.Guest;
import com.tokiohotel.backend.entity.Room;
import com.tokiohotel.backend.exception.BadRequestException;
import com.tokiohotel.backend.exception.ConflictException;
import com.tokiohotel.backend.exception.NotFoundException;
import com.tokiohotel.backend.mapper.BookingMapper;
import com.tokiohotel.backend.repository.BookingRepository;
import com.tokiohotel.backend.repository.GuestRepository;
import com.tokiohotel.backend.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
public class BookingService {

    private static final BigDecimal BREAKFAST_SURCHARGE = new BigDecimal("15.00");

    private final BookingRepository bookingRepository;
    private final GuestRepository guestRepository;
    private final RoomRepository roomRepository;
    private final BookingMapper bookingMapper;

    @Transactional
    public BookingDto create(BookingRequestDto req) {
        if (!req.endDate().isAfter(req.startDate())) {
            throw new BadRequestException("endDate must be after startDate");
        }

        Room room = roomRepository.findById(req.roomId())
                .orElseThrow(() -> new NotFoundException("Room " + req.roomId() + " not found"));

        if (bookingRepository.existsOverlap(room.getId(), req.startDate(), req.endDate())) {
            throw new ConflictException("Room " + room.getId() + " is not available for the requested range");
        }

        Guest guest = guestRepository.findByEmail(req.email())
                .map(existing -> {
                    existing.setFirstName(req.firstName());
                    existing.setLastName(req.lastName());
                    return existing;
                })
                .orElseGet(() -> Guest.builder()
                        .firstName(req.firstName())
                        .lastName(req.lastName())
                        .email(req.email())
                        .build());
        guest = guestRepository.save(guest);

        boolean withBreakfast = Boolean.TRUE.equals(req.withBreakfast());
        long nights = ChronoUnit.DAYS.between(req.startDate(), req.endDate());
        BigDecimal nightlyCost = room.getRoomType().getCost();
        if (withBreakfast) {
            nightlyCost = nightlyCost.add(BREAKFAST_SURCHARGE);
        }
        BigDecimal total = nightlyCost.multiply(BigDecimal.valueOf(nights)).setScale(2, RoundingMode.HALF_UP);

        Booking booking = Booking.builder()
                .guest(guest)
                .room(room)
                .totalCost(total)
                .bookingDate(LocalDate.now())
                .startDate(req.startDate())
                .endDate(req.endDate())
                .withBreakfast(withBreakfast)
                .build();

        Booking saved = bookingRepository.save(booking);
        return bookingMapper.toDto(saved);
    }

    @Transactional(readOnly = true)
    public BookingDto findById(Long id) {
        return bookingRepository.findById(id)
                .map(bookingMapper::toDto)
                .orElseThrow(() -> new NotFoundException("Booking " + id + " not found"));
    }
}
