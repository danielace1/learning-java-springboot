package com.example.demo.dto;

public class OrderCreated {
    private String referenceId;

    public String getReferenceId() {
        return referenceId;
    }

    public void setReferenceId(String referenceId) {
        this.referenceId = referenceId;
    }

    public OrderCreated() {
        super();
    }

    public OrderCreated(String referenceId) {
        this.referenceId = referenceId;
    }

}
