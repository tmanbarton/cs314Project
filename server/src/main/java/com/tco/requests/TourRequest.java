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
        buildDataStructures(places);
        log.trace("buildResponse -> {}", this);
    }

    public TourRequest(){
        this.requestType = "tour";
    }

    public void buildDataStructures(Places places){
        for(int i = 0; i < places.size(); i++){
            this.tour[i] = i;
            this.visited[i] = false;
        }
    }
}
