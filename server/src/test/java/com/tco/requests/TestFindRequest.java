package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestFindRequest {

    private FindRequest find;
    private String match = "airport";
    private int limit = 10;

    @BeforeEach
    public void createConfigurationForTestCases(){
        find = new FindRequest();
        find.setMatch(match);
        find.setLimit(limit);
    }
    
}
