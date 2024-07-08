package com.jesussb.coopeuch_tasks_challenge.commons.advice;

import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Date;

@Order(value = 2)
@RestControllerAdvice
public class GlobalRestControllerAdvice {

    @ExceptionHandler(value = RuntimeException.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public ProblemDetail handleRuntimeException(RuntimeException ex) {

        ProblemDetail detail = ProblemDetail.forStatus(HttpStatus.NOT_FOUND);
        detail.setTitle("Error desconocido.");
        detail.setDetail(ex.getMessage());
        detail.setProperty("timestamp", new Date());

        return detail;

    }

}
