package com.project.football.exception;

import java.util.HashMap;
import java.util.Map;

public class CustomValidationException extends RuntimeException{
    private Map<String, String> errorFields = new HashMap<>(2);

    public CustomValidationException(Map<String, String> errorFields, String message) {
        super(message);
        this.errorFields.putAll(errorFields);
    }

    public CustomValidationException(String field, String fieldErrorMessage, String message) {
        super(message);
        this.errorFields.put(field, fieldErrorMessage);
    }

    public CustomValidationException(String field, String fieldErrorMessage) {
        super(fieldErrorMessage);
        this.errorFields.put(field, fieldErrorMessage);
    }

    public CustomValidationException(String message) {
        super(message);
    }

    public Map<String, String> getErrorFields() {
        return errorFields;
    }
}
