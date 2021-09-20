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
        find.buildResponse();
    }

    @Test
    @DisplayName("Request type is \"find\"")
    public void testType(){
        String type = find.getRequestType();
        assertEquals("find", type);
    }

    @Test
    @DisplayName("Match is correct")
    public void testMatch(){
        String match = find.getMatch();
        assertEquals(this.match, match);
    }

    @Test
    @DisplayName("Limit is correct")
    public void testLimit(){
        int limit = find.getLimit();
        assertEquals(this.limit, limit);
    }

    @Test
    @DisplayName("Places is correct")
    public void testPlaces(){
        
    }
    
}
