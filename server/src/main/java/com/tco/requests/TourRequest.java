package com.tco.requests;

import java.util.ArrayList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Collections;

public class TourRequest extends Request {
    private Places places;
    private double earthRadius;
    private double response;
 
    private final transient Logger log =
    LoggerFactory.getLogger(TourRequest.class);

    @Override
    public void buildResponse(){
        if (places != null){
            OptimizeTrip tripObject = new OptimizeTrip(places, earthRadius);
            tripObject.buildDataStructures();
            this.places = tripObject.optimize();
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


    private class OptimizeTrip {
        private int[] tour;
        private boolean[] visited;
        private double[][] distanceMatrix;
        private Places preOptimizedPlaces;
        private double earthRadius;

        private OptimizeTrip(Places Places, double earthRadius){
            this.preOptimizedPlaces = places;
            this.earthRadius = earthRadius;
        }


        public void buildDataStructures(){
            int placeSize = this.preOptimizedPlaces.size();
            this.tour = new int[placeSize];
            this.visited = new boolean[placeSize];
            this.distanceMatrix = new double[placeSize][placeSize];
            DistanceCalculator calculator = new DistanceCalculator(places, this.earthRadius);
            for(int i = 0; i < placeSize; i++){
                this.tour[i] = i;
                this.visited[i] = false;
                for (int j = 0; j < this.preOptimizedPlaces.size(); j++) {
                    double latitude1 = Double.parseDouble(this.preOptimizedPlaces.get(i).get("latitude"));
                    double latitude2 = Double.parseDouble(this.preOptimizedPlaces.get(j).get("latitude"));
                    double longitude1 = Double.parseDouble(this.preOptimizedPlaces.get(i).get("longitude"));
                    double longitude2 = Double.parseDouble(this.preOptimizedPlaces.get(j).get("longitude"));
                    this.distanceMatrix[i][j] =
                        calculator.computeDistance(latitude1, latitude2, longitude1, longitude2);
            }
        }
    }
        // returns an optimized list of places
        public Places optimize(){
            int[] optimizedTour = nearestNeighbor(this.tour);
            Places optimizedTrip = new Places(this.preOptimizedPlaces);
            for (int i = 0; i < this.preOptimizedPlaces.size(); i++){
                int indexOfPlace = this.tour[i];
                Place temp = this.preOptimizedPlaces.get(indexOfPlace);
                optimizedTrip.set(i, temp);
            }
            return optimizedTrip;
        }
        // filled with test logic to be replaced
        private int[] nearestNeighbor(int[] tour) {
            tour[0] = 1;
            tour[1] = 0;
            return tour;
        }
    }
}