package com.tco.requests;

import java.util.ArrayList;

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

        return null;
    }

    public DistancesRequest() {
        this.requestType = "distances";
    }
    
}