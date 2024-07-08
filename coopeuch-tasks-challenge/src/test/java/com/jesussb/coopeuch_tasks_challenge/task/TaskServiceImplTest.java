package com.jesussb.coopeuch_tasks_challenge.task;

import com.jesussb.coopeuch_tasks_challenge.task.dto.TaskDTO;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
class TaskServiceImplTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskServiceImpl taskServiceImpl;

    private TaskDTO taskDTO;

    @BeforeEach
    void setUp() {
        taskDTO = new TaskDTO(1L, "TEST");
    }

    @Test
    void findAll() {

        when(taskRepository.findAllActive()).thenReturn(List.of());

        List<Task> result = taskServiceImpl.findAll();

        assertThat(result).isNotNull();
        verify(taskRepository, times(1)).findAllActive();

    }

    @Test
    void create() {

        String result = taskServiceImpl.create(taskDTO);

        assertThat(result).isNotNull();
        assertThat(result).isEqualTo("Tarea creada correctamente.");

        verify(taskRepository, times(1)).save(Mockito.any(Task.class));

    }

    @Test
    void findById(){

        Task task = new Task();
        task.setId(1L);
        task.setDescription("TEST");

        when(taskRepository.findActiveById(Mockito.any(Long.class))).thenReturn(Optional.of(task));

        Task result = taskServiceImpl.findById(1L);

        assertThat(result).isNotNull();
        assertThat(result).isEqualTo(task);
    }

    @Test
    void findByIdException() {

        when(taskRepository.findActiveById(Mockito.any(Long.class))).thenReturn(Optional.empty());
        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> taskServiceImpl.findById(1L));

        assertThat(exception.getMessage()).isEqualTo("Tarea no encontrada.");
        verify(taskRepository, times(1)).findActiveById(1L);

    }

    @Test
    void update() {

        Task task = new Task();

        when(taskRepository.findActiveById(Mockito.any(Long.class))).thenReturn(Optional.of(task));

        String result = taskServiceImpl.update(taskDTO);

        assertThat(result).isNotNull();
        assertThat(result).isEqualTo("Tarea actualizada correctamente.");

        verify(taskRepository, times(1)).findActiveById(Mockito.any(Long.class));
        verify(taskRepository, times(1)).save(Mockito.any(Task.class));

    }

    @Test
    void updateException() {

        when(taskRepository.findActiveById(Mockito.any(Long.class))).thenReturn(Optional.empty());
        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> taskServiceImpl.remove(1L));

        assertThat(exception.getMessage()).isEqualTo("Tarea no encontrada.");
        verify(taskRepository, times(1)).findActiveById(1L);

    }

    @Test
    void remove() {

        Task task = new Task();

        when(taskRepository.findActiveById(Mockito.any(Long.class))).thenReturn(Optional.of(task));

        String result = taskServiceImpl.remove(1L);

        assertThat(result).isNotNull();
        assertThat(result).isEqualTo("Tarea eliminada correctamente.");

        verify(taskRepository, times(1)).findActiveById(Mockito.any(Long.class));
        verify(taskRepository, times(1)).save(Mockito.any(Task.class));

    }

    @Test
    void removeException() {

        when(taskRepository.findActiveById(Mockito.any(Long.class))).thenReturn(Optional.empty());
        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> taskServiceImpl.remove(1L));

        assertThat(exception.getMessage()).isEqualTo("Tarea no encontrada.");
        verify(taskRepository, times(1)).findActiveById(1L);

    }

}