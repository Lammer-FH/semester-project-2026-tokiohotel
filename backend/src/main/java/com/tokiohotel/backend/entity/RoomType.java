package com.tokiohotel.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "room_types")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer capacity;

    @Column(nullable = false)
    private BigDecimal cost;

    @Column(nullable = false)
    private String title;

    private String description;

    @Column(columnDefinition = "TEXT")
    private String images;

    @OneToMany(mappedBy = "roomType", cascade = CascadeType.ALL)
    private List<Room> rooms;

    @ManyToMany
    @JoinTable(
            name = "room_type_extras",
            joinColumns = @JoinColumn(name = "room_type_id"),
            inverseJoinColumns = @JoinColumn(name = "extra_id")
    )
    private Set<Extra> extras;
}