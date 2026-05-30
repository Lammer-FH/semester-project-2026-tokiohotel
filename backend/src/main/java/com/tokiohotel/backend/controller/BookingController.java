package com.tokiohotel.backend.controller;

import com.tokiohotel.backend.dto.BookingDto;
import com.tokiohotel.backend.dto.BookingRequestDto;
import com.tokiohotel.backend.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequestMapping(path = "/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingDto> create(@Valid @RequestBody BookingRequestDto req) {
        BookingDto created = bookingService.create(req);
        return ResponseEntity
                .created(URI.create("/bookings/" + created.id()))
                .body(created);
    }

    @GetMapping("/{id}")
    public BookingDto findById(@PathVariable Long id) {
        return bookingService.findById(id);
    }
}
