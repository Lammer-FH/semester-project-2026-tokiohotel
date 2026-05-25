package com.tokiohotel.backend.mapper;

import com.tokiohotel.backend.dto.ExtraDto;
import com.tokiohotel.backend.entity.Extra;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ExtraMapper {

    // Von Entity zu DTO (Felder id, name, icon passen exakt)
    ExtraDto toDto(Extra extra);

    // Von DTO zu Entity (Rückweg)
    // Hier sagen wir MapStruct explizit, dass es das JPA-Beziehungsfeld ignorieren MUSS:
    @Mapping(target = "roomTypes", ignore = true)
    Extra toEntity(ExtraDto extraDto);
}