package com.jesussb.coopeuch_tasks_challenge.commons.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Date;
import java.util.HashMap;

public class ResponseHandler {

    public static ResponseEntity<Object> createResponse(Object data, HttpStatus httpStatus) {

        var response = new HashMap<String, Object>();

        response.put("status", httpStatus.value());
        response.put("message", httpStatus.getReasonPhrase());
        response.put("timestamp", new Date());
        response.put("data", data);

        return new ResponseEntity<>(response, httpStatus);

    }

}
