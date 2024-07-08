package com.jesussb.coopeuch_tasks_challenge.task.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record TaskDTO(
        Long id,
        @NotBlank
        String description
) {
}
