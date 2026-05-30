package com.tokiohotel.backend.repository;

import com.tokiohotel.backend.entity.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;

public interface RoomRepository extends JpaRepository<Room, Long> {

    @Query("""
            SELECT r FROM Room r
            WHERE NOT EXISTS (
                SELECT 1 FROM Booking b
                WHERE b.room = r
                  AND b.startDate < :endDate
                  AND b.endDate   > :startDate
            )
            """)
    Page<Room> findAvailable(@Param("startDate") LocalDate startDate,
                             @Param("endDate") LocalDate endDate,
                             Pageable pageable);
}
