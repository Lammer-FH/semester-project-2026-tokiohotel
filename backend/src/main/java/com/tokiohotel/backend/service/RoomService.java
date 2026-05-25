package com.tokiohotel.backend.service;

import com.tokiohotel.backend.dto.RoomDto;
import com.tokiohotel.backend.mapper.RoomMapper;
import com.tokiohotel.backend.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final RoomMapper roomMapper;

    public Page<RoomDto> findAll(Pageable pageable){
        return roomRepository.findAll(pageable).map(roomMapper::toDto);
    }
}
