package com.tokiohotel.backend.service;

import com.tokiohotel.backend.dto.RoomDto;
import com.tokiohotel.backend.exception.BadRequestException;
import com.tokiohotel.backend.exception.NotFoundException;
import com.tokiohotel.backend.mapper.RoomMapper;
import com.tokiohotel.backend.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;


@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final RoomMapper roomMapper;

    @Transactional(readOnly = true)
    public Page<RoomDto> findAll(Pageable pageable) {
        return roomRepository.findAll(pageable).map(roomMapper::toDto);
    }

    @Transactional(readOnly = true)
    public RoomDto findById(Long id) {
        return roomRepository.findById(id)
                .map(roomMapper::toDto)
                .orElseThrow(() -> new NotFoundException("Room " + id + " not found"));
    }

    @Transactional(readOnly = true)
    public Page<RoomDto> findAll(LocalDate startDate, LocalDate endDate, Pageable pageable) {
        if (startDate == null || endDate == null) {
            return findAll(pageable);
        }
        if (!endDate.isAfter(startDate)) {
            throw new BadRequestException("endDate must be after startDate");
        }
        return roomRepository.findAvailable(startDate, endDate, pageable).map(roomMapper::toDto);
    }
}
