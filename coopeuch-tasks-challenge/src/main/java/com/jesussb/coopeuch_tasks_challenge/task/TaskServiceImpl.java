package com.jesussb.coopeuch_tasks_challenge.task;

import com.jesussb.coopeuch_tasks_challenge.task.dto.TaskDTO;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    @Override
    public List<Task> findAll() {
        return taskRepository.findAllActive();
    }

    @Override
    public String create(TaskDTO taskDTO) {

        Task task = new Task();
        task.setDescription(taskDTO.description());

        taskRepository.save(task);

        return "Tarea creada correctamente.";
    }

    @Override
    public Task findById(Long id) {

        return taskRepository.findActiveById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tarea no encontrada."));

    }

    @Override
    public String update(TaskDTO taskDTO) {

        Task task = taskRepository.findActiveById(taskDTO.id())
                        .orElseThrow(() -> new EntityNotFoundException("Tarea no encontrada."));

        task.setDescription(taskDTO.description());

        taskRepository.save(task);

        return "Tarea actualizada correctamente.";
    }

    @Override
    public String remove(Long id) {

        Task task = taskRepository.findActiveById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tarea no encontrada."));

        task.setActive(false);
        taskRepository.save(task);

        return "Tarea eliminada correctamente.";
    }

}
