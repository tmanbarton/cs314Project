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

    public double getEarthRadius() {
        return this.earthRadius;
    }

    public void setEarthRadius(double earthRadius) {
        this.earthRadius = earthRadius;
    }

    public void buildDataStructures(Places places){
        int placeSize = places.size();
        this.tour = new double[placeSize];
        this.visited = new boolean[placeSize];
        this.distanceMatrix = new double[placeSize][placeSize];
        DistanceCalculator calculator = new DistanceCalculator(places, this.earthRadius);
        for(int i = 0; i < placeSize; i++){
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

    public double[] nearestNeighbor() {
        return this.tour;
    }
}
