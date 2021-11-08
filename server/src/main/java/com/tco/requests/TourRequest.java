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
        if (response == 0 || places.size() < 4){ // send back places unchanged
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

    public void setPlaces(Places places) {
        this.places = places;
    }

    public Places getPlaces() {
        return this.places;
    }


    public class OptimizeTrip {
        private int[] tour;
        private boolean[] visited;
        private int[] tour_1; 
        private boolean[] visited_1;
        private double[][] distanceMatrix;
        private Places preOptimizedPlaces;
        private double earthRadius;
        private double response;
        private double inf  = Math.pow(10, 1000);
        private long start;
        Places finalTrip;
        private ArrayList<Long> distances = new ArrayList<Long>();

        public OptimizeTrip(Places Places, double earthRadius, double response){
            this.start = System.currentTimeMillis();
            this.preOptimizedPlaces = places;
            this.earthRadius = earthRadius;
            this.response = (response * 1000) * .5;
        }


        public void buildDataStructures(){
            int placeSize = this.preOptimizedPlaces.size();
            this.tour = new int[placeSize];
            this.visited = new boolean[placeSize];
            this.tour_1 = new int[placeSize];
            this.visited_1 = new boolean[placeSize];
            this.distanceMatrix = new double[placeSize][placeSize];
            DistanceCalculator calculator = new DistanceCalculator(places, this.earthRadius);
            for(int i = 0; i < placeSize; i++){
                this.tour[i] = i;
                this.tour_1[i] = i;
                this.visited[i] = false;
                this.visited_1[i] = false;
                if(outOfTime()) break;
                for (int j = 0; j < this.preOptimizedPlaces.size(); j++) {
                    double latitude1 = Double.parseDouble(this.preOptimizedPlaces.get(i).get("latitude"));
                    double latitude2 = Double.parseDouble(this.preOptimizedPlaces.get(j).get("latitude"));
                    double longitude1 = Double.parseDouble(this.preOptimizedPlaces.get(i).get("longitude"));
                    double longitude2 = Double.parseDouble(this.preOptimizedPlaces.get(j).get("longitude"));
                    this.distanceMatrix[i][j] =
                        calculator.computeDistance(latitude1, latitude2, longitude1, longitude2);
                    if(outOfTime()){
                        break;
                    }
                }
            }
        }
        //returns an optimized list of places
        public Places optimize(){
            var prev = this.inf;
            Places finalTrip = new Places(this.preOptimizedPlaces);

            for (var j = 0; j < this.preOptimizedPlaces.size(); j++) {
                int[] optimizedTour = nearestNeighbor(this.tour, j);
                Places optimizedTrip = new Places(this.preOptimizedPlaces);
                for (int i = 0; i < this.preOptimizedPlaces.size(); i++){
                    int indexOfPlace = this.tour[i];
                    Place temp = this.preOptimizedPlaces.get(indexOfPlace);
                    optimizedTrip.set(i, temp);
                    if(outOfTime()) break;
                }
                var total_distance = get_distances(optimizedTrip);
                if (total_distance < prev){
                    finalTrip = optimizedTrip;
                    prev = total_distance;
                }
                if(outOfTime()) break;
            }
            return finalTrip;
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
                if(outOfTime()) break;
            }
            return final_index;
        }

        
        private int[] nearestNeighbor(int[] tour, int start_index) {
            if(this.preOptimizedPlaces.size() > 1){
            this.tour = this.tour_1.clone();
            this.visited = this.visited_1.clone();

            this.tour[0] = start_index;
            this.visited[start_index] = true;
            int i = 0;
            int currrent = start_index; 
            int tour_size = this.preOptimizedPlaces.size();
            while (i < tour_size - 1){
                int close_index = find_closest(currrent, this.visited);
                i++;
                this.tour[i] = close_index;
                this.visited[close_index] = true;
                currrent = close_index;
                if(outOfTime()) break;  
            }
            return this.tour;
            }
            else{
                this.tour[0] = 0;
                return this.tour;
            }
        }

        //Calculates total Distance
        private double totalDistance(ArrayList<Long> distances)
        {
            var total = 0;
        
            for (var i = 0; i < distances.size(); i++)
            {
                total += distances.get(i);
                if(outOfTime()) break;
            }
            return total;
        }	


        private double get_distances(Places places){ 
            DistanceCalculator calc = new DistanceCalculator(places, this.earthRadius);
            if (places.size() == 0) {
            this.distances = new ArrayList<Long>();
            } else {
            this.distances = calc.getDistances();
            }
            return totalDistance(this.distances);
        }
        
        private boolean outOfTime(){
            return System.currentTimeMillis() > this.start + (long)this.response;
        }
    }
}
