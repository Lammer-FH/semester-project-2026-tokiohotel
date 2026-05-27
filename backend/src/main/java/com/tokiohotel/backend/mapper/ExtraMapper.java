package com.tokiohotel.backend.mapper;

import com.tokiohotel.backend.dto.ExtraDto;
import com.tokiohotel.backend.entity.Extra;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ExtraMapper {

    ExtraDto toDto(Extra extra);

    @Mapping(target = "roomTypes", ignore = true)
    Extra toEntity(ExtraDto extraDto);
}