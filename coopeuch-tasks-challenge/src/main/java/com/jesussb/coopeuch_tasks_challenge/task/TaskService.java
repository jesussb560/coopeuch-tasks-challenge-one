package com.jesussb.coopeuch_tasks_challenge.task;

import com.jesussb.coopeuch_tasks_challenge.task.dto.TaskDTO;

import java.util.List;

public interface TaskService {

    List<Task> findAll();
    String create(TaskDTO taskDTO);
    Task findById(Long id);
    String update(TaskDTO taskDTO);
    String remove(Long id);

}
