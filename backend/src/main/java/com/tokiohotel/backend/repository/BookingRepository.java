package com.tokiohotel.backend.repository;

import com.tokiohotel.backend.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    @Query("""
            SELECT COUNT(b) > 0 FROM Booking b
            WHERE b.room.id = :roomId
              AND b.startDate < :requestedEnd
              AND b.endDate   > :requestedStart
            """)
    boolean existsOverlap(@Param("roomId") Long roomId,
                          @Param("requestedStart") LocalDate requestedStart,
                          @Param("requestedEnd") LocalDate requestedEnd);
}
