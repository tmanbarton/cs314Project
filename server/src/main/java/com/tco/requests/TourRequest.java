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
        private int[] opt_tour;
        private boolean[] visited_1;
        private double[][] distanceMatrix;
        private Places preOptimizedPlaces;
        private double earthRadius;
        private double response;
        private double inf  = Math.pow(10, 1000);
        private long start;
        Places finalTrip;
        // private ArrayList<Long> distances = new ArrayList<Long>();
        String initial_name;
        Double initial_lat, initial_lon;
        Place startingPlace;
        boolean timeout = false;

        public OptimizeTrip(Places Places, double earthRadius, double response){
            this.start = System.currentTimeMillis();
            this.preOptimizedPlaces = places;
            this.earthRadius = earthRadius;
            this.response = (response * 1000) * .5;
            this.startingPlace = places.get(0);
        }


        public void buildDataStructures(){
            int placeSize = this.preOptimizedPlaces.size();
            initial_name = this.preOptimizedPlaces.get(0).get("name");
            initial_lat = Double.parseDouble(this.preOptimizedPlaces.get(0).get("latitude"));
            initial_lon = Double.parseDouble(this.preOptimizedPlaces.get(0).get("longitude"));
            this.tour = new int[placeSize];
            this.visited = new boolean[placeSize];
            this.tour_1 = new int[placeSize];
            this.visited_1 = new boolean[placeSize];
            this.opt_tour = new int[placeSize + 1];
            this.distanceMatrix = new double[placeSize][placeSize];
            DistanceCalculator calculator = new DistanceCalculator(places, this.earthRadius);
            for(int i = 0; i < placeSize; i++){
                this.tour[i] = i;
                this.tour_1[i] = i;
                this.opt_tour[i] = i;
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
                    if(outOfTime()) break;
                }
            }
        }


        // Arrange trip so that the starting location is preserved
        public Places arrange_trip(Places place, int i){
            Places temp = new Places(place);
            for (var j = 0; j < temp.size(); j++) {
                temp.set(j, place.get(i));
                i++;
                if(i == temp.size()){
                    i = 0;
                }
                if(outOfTime()) break;
            }
            return temp;
        }

        //returns an optimized list of places
        public Places optimize(){
            var prev = this.inf;
            var start_index = 0;
            int[] temp_tour = new int[this.tour.length + 1];
            Places finalTrip = new Places(this.preOptimizedPlaces);

            for (var j = 0; j < this.preOptimizedPlaces.size(); j++) {

                this.tour = nearestNeighbor(this.tour, j);
                this.opt_tour[this.tour.length] = this.tour[0];
                if(this.tour.length > 3){
                    opt_2(this.opt_tour);
                }
                var total_distance = get_distances(this.opt_tour);
                if (total_distance < prev){
                    temp_tour = this.opt_tour.clone();
                    prev = total_distance;
                }
                if(outOfTime()) break;
            }
            for (int i = 0; i < (temp_tour.length - 1); i++){
                int indexOfPlace = temp_tour[i];
                Place temp = this.preOptimizedPlaces.get(indexOfPlace);
                //find the index of original starting location
                double epsilon = 0.000001d;
                if(temp.get("name") == initial_name ){
                    Double temp_lat = Double.parseDouble(temp.get("latitude"));
                    Double temp_lon = Double.parseDouble(temp.get("longitude"));
                    if(Math.abs(temp_lat - initial_lat) < epsilon){
                        if(Math.abs(temp_lon - initial_lon) < epsilon){
                                start_index = i;
                        }
                    }
                }
                finalTrip.set(i, temp);
                if(outOfTime()) break;
                }
            if(finalTrip.size() > 3){finalTrip = arrange_trip(finalTrip, start_index);}
            // if(this.timeout){ finalTrip = this.preOptimizedPlaces;}
            return finalTrip;
        }

        // Find distance from point j to point k
        private double leg_dist(int[] tour, int j, int k){ 
            return this.distanceMatrix[tour[j]][tour[k]];
        }

        private boolean opt_2_improves(int[] tour, int i, int j){
            return ((leg_dist(tour, i, j) + leg_dist(tour, i+1, j+1)) < (leg_dist(tour, i, i+1) + leg_dist(tour, j, j+1)));    
        }

        private int opt_2_reverse(int[] tour, int i, int j){
            while (i < j)  {
                int temp = tour[i];
                tour[i] = tour[j];
                tour[j] = temp;
                i++;
                j--;
            }   
            return 0; 
        }

        private int opt_2(int[] tour){
            var improvement = true;
            while (improvement){
                improvement = false;
                for (var i = 0; i <= (tour.length - 4); i++) { 
                    for (var j = i + 2; j <= (tour.length - 2); j++) { 
                        if (opt_2_improves(tour, i, j)){
                            opt_2_reverse(tour, i+1, j);
                            improvement = true;
                        }
                    }
                }
            }
            return 0;
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
            this.opt_tour[0] =  start_index;
            this.visited[start_index] = true;
            int i = 0;
            int currrent = start_index; 
            int tour_size = this.preOptimizedPlaces.size();
            while (i < (tour_size - 1)){
                int close_index = find_closest(currrent, this.visited);
                i++;
                this.tour[i] = close_index;
                this.opt_tour[i] = close_index;
                this.visited[close_index] = true;
                currrent = close_index;
                if(outOfTime()) break;  
            }
            return this.tour;
            }
            else{
                this.tour[0] = 0;
                this.opt_tour[0] = 0;
                return this.tour;
            }
        }


        private double get_distances(int[] tour){ 
            double total = 0;
            for (var i = 0; i < (tour.length - 1); i++){
                total += this.distanceMatrix[tour[i]][tour[i+1]];
            }
            return total;
        }
        
        private boolean outOfTime(){
            this.timeout = true;
            return System.currentTimeMillis() > this.start + (long)this.response;
        }
    }
}
