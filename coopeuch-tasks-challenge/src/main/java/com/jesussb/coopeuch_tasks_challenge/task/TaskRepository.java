package com.jesussb.coopeuch_tasks_challenge.task;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {

    @Query("SELECT t FROM Task t WHERE t.active = true")
    List<Task> findAllActive();

    @Query("SELECT t FROM Task t WHERE t.id = :id AND t.active = true")
    Optional<Task> findActiveById(long id);

}
