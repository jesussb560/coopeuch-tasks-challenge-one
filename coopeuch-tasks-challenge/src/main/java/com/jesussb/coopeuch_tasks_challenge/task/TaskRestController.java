package com.jesussb.coopeuch_tasks_challenge.task;

import com.jesussb.coopeuch_tasks_challenge.commons.handler.ResponseHandler;
import com.jesussb.coopeuch_tasks_challenge.task.dto.TaskDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/tasks")
public class TaskRestController {

    private final TaskService taskService;

    @GetMapping(value = "/active")

    public ResponseEntity<Object> findAll(){
        return ResponseHandler.createResponse(taskService.findAll(), HttpStatus.OK);
    }
    @PostMapping(value = "/create")
    public ResponseEntity<Object> create(@Valid @RequestBody TaskDTO taskDTO){
        return ResponseHandler.createResponse(taskService.create(taskDTO), HttpStatus.CREATED);
    }
    @GetMapping(value = "/{id}")
    public ResponseEntity<Object> findById(@PathVariable Long id){
        return ResponseHandler.createResponse(taskService.findById(id), HttpStatus.OK);
    }
    @PatchMapping(value = "/update")
    public ResponseEntity<Object> update(@Valid @RequestBody TaskDTO taskDTO){
        return ResponseHandler.createResponse(taskService.update(taskDTO), HttpStatus.OK);
    }
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Object> remove(@PathVariable Long id){
        return ResponseHandler.createResponse(taskService.remove(id), HttpStatus.OK);
    }

}
