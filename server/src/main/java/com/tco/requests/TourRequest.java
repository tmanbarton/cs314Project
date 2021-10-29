package com.tco.requests;

import java.util.ArrayList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TourRequest extends Request {
    private Places places;
    private double earthRadius;
    private double response;

    private double[] tour;
    private boolean[] visited;
    private double[][] distanceMatrix;
 
    private final transient Logger log =
    LoggerFactory.getLogger(TourRequest.class);

    @Override
    public void buildResponse(){
        if (places != null){
            buildDataStructures(places);
        }
        log.trace("buildResponse -> {}", this);
    }

    public TourRequest(){
        this.requestType = "tour";
    }

    public void buildDataStructures(Places places){
        int placeSize = places.size();
        this.tour = new double[placeSize];
        this.visited = new boolean[placeSize];
        this.distanceMatrix = new double[placeSize][placeSize];
        for(int i = 0; i < placeSize; i++){
            this.tour[i] = i;
            this.visited[i] = false;
        }
    }
}
