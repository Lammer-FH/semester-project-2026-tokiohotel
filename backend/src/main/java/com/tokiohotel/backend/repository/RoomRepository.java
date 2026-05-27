package com.tokiohotel.backend.repository;

import com.tokiohotel.backend.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {
}
