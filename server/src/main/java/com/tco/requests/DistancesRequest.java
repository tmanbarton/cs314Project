package com.tco.requests;

import java.util.ArrayList;
import java.lang.Math;
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

    public ArrayList<Integer> getDistances(Places places) {
        ArrayList<Integer> distances = new ArrayList<Integer>();
        double latitude1 = 0;
        double longitude1 = 0;
        double latitude2 = 0;
        double longitude2 = 0;
        for(int i = 1; i <= places.length(); i++) {
            latitude1 = Integer.parseInt(places[i - 1].get("latitude"));
            longitude1 = Integer.parseInt(places[i - 1].get("longitude"));
            
            if(i == places.length()) {
                latitude2 = Integer.parseInt(places[0].get("latitude"));
                longitude2 = Integer.parseInt(places[0].get("longitude"));
            }
            else {
                latitude2 = Integer.parseInt(places[i].get("latitude"));
                longitude2 = Integer.parseInt(places[i].get("longitude"));
            }
            int distance = computeDistance(latitude1, latitude2, longitude1, longitude2);
            distances.add(distance);
        }
        return distances;
    }

    public DistancesRequest() {
        this.requestType = "distances";
    }

    public int computeDistance(double latitude1, double latitude2, double longitude1, double longitude2) {
        latitude1 = Math.toRadians(latitude1);
        latitude2 = Math.toRadians(latitude2);
        longitude1 = Math.toRadians(longitude1);
        longitude2 = Math.toRadians(longitude2);
//        distance = 2 * radius * arcsin(sqrt(sin^2((lat2 - lat1)/2) + cos(lat1)*cos(lat2)*sin^2((long2 - long1)/2)))
        double distance = 2 * this.earthRadius * Math.asin(Math.sqrt( Math.pow(Math.sin( (latitude2 - latitude1)/2 ), 2) + Math.cos(latitude1) * Math.cos(latitude2) * Math.pow(Math.sin( (longitude2-longitude1)/2 ) , 2) ));
        return (int)distance;
    }
    
}