package com.tco.requests;

import java.util.ArrayList;

/*
this import is here just for testing.
remove when getDistances() is complete
**/
import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DistancesRequest extends Request {
    private double earthRadius;
    private ArrayList<Integer> distances = new ArrayList<Integer>();
    private Places places;

    private final transient Logger log = LoggerFactory.getLogger(DistancesRequest.class);

    @Override
    public void buildResponse() {
        distances = getDistances(places);

        log.trace("buildResponse -> {}", this);
    }

    public ArrayList<Integer> getDistances(Places places){

        //Delete when complete
        return new ArrayList<Integer>(Arrays.asList(1,2,3));
    }

    public DistancesRequest() {
        this.requestType = "distances";
    }
    
}