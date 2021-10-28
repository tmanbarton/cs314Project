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
        DistanceCalculator calculator = new DistanceCalculator(places, 3959);
        for(int i = 0; i < places.size(); i++){
            this.tour[i] = i;
            this.visited[i] = false;
            for (int j = 0; j < places.size(); j++) {
                double latitude1 = Double.parseDouble(places.get(i).get("latitude"));
                double latitude2 = Double.parseDouble(places.get(j).get("latitude"));
                double longitude1 = Double.parseDouble(places.get(i).get("longitude"));
                double longitude2 = Double.parseDouble(places.get(j).get("longitude"));
                this.distanceMatrix[i][j] =
                    calculator.computeDistance(latitude1, latitude2, longitude1, longitude2);
            }
        }
    }
}
