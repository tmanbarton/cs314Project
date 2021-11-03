package com.tco.requests;

import java.util.ArrayList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Collections;
import java.lang.Math;

public class TourRequest extends Request {
    private Places places;
    private double earthRadius;
    private double response;
 
    private final transient Logger log =
    LoggerFactory.getLogger(TourRequest.class);

    @Override
    public void buildResponse(){
        if (response <= 0.001){ // send back places unchanged
            return;
        }
        if (places != null){
            OptimizeTrip tripObject = new OptimizeTrip(places, earthRadius, response);
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
        private double response;
        private double inf  = Math.pow(10, 1000);
        
        private OptimizeTrip(Places Places, double earthRadius, double response){
            this.preOptimizedPlaces = places;
            this.earthRadius = earthRadius;
            this.response = response;
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

        // returns the index of closest destination from current point using distance matrix
        private int find_closest(int index, boolean[] visited){ 
            var value = this.inf;
            var final_index = 0;
            for (var i = 0; i < this.distanceMatrix[index].length; i++) {
                if (this.distanceMatrix[index][i] < value && visited[i]!=true && index!=i) {
                  value = this.distanceMatrix[index][i];
                  final_index = i;
                }
            }
            return final_index;
        }

        
        private int[] nearestNeighbor(int[] tour) {
            if(this.preOptimizedPlaces.size() > 1){

            this.tour[0] = 0;
            this.visited[0] = true;
            int i = 0;
            int currrent = 0; 

            double ms = this.response/2;
            double start = System.currentTimeMillis();
            double end = start + (ms*1000); 
            while (System.currentTimeMillis() < end){
                int tour_size = this.preOptimizedPlaces.size();
                while (i < tour_size - 1){
                    int close_index = find_closest(currrent, this.visited);
                    i++;
                    this.tour[i] = close_index;
                    this.visited[close_index] = true;
                    currrent = close_index;
                }
            }
            return this.tour;
        }
        else{
            this.tour[0] = 0;
            return this.tour;
        }
    }
    }
}
