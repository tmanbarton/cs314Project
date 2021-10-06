package com.tco.requests;

import java.util.ArrayList;
import java.lang.Math;

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

    public double computeDistance(double latitude1, double latitude2, double longitude1, double longitude2) {
        lattitude1 = Math.toRadians(lattitude1);
        lattitude2 = Math.toRadians(lattitude2);
        longitude1 = Math.toRadians(longitude1);
        longitude2 = Math.toRadians(longitude2);
//        distance = 2 * radius * arcsin(sqrt(sin^2((lat2 - lat1)/2) + cos(lat1)*cos(lat2)*sin^2((long2 - long1)/2)))
        double distance = 2 * this.earthRadius * Math.asin(Math.sqrt( Math.pow(Math.sin( (latitude2 - latitude1)/2 ), 2) + Math.cos(latitude1) * Math.cos(latitude2) * Math.pow(Math.sin( (longitude2-longitude1)/2 ) , 2) ));
        return distance;
    }
    
}