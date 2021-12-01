package com.tco.requests;

import java.lang.Math;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TourRequest extends Request {
    private Place[] places;
    private double earthRadius;
    private double response;

    private final transient Logger log =
    LoggerFactory.getLogger(TourRequest.class);

    @Override
    public void buildResponse(){
        if (response < 0.1 || places.length < 4){ // send back places unchanged
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

    public void setPlaces(Place[] places) {
        this.places = places;
    }

    public Place[] getPlaces() {
        return this.places;
    }


    public class OptimizeTrip {
        private int[] tour;
        private boolean[] visited;
        private int[] tour_1; 
        private int[] opt_tour;
        private boolean[] visited_1;
        private double[][] distanceMatrix;
        private double earthRadius;
        private double response;
        private double inf  = 100000000000.0d;
        private long start;

        public OptimizeTrip(Place[] place, double earthRadius, double response){
            this.start = System.currentTimeMillis();
            this.earthRadius = earthRadius;
            this.response = (response * 1000) * .8;
        }


        public void buildDataStructures(){
            int placeSize = places.length;
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
                for (int j = i; j < places.length; j++) {
                    if(i==j){
                        this.distanceMatrix[i][j] = 0;
                        this.distanceMatrix[j][i] = 0;
                        continue;
                    }
                    double latitude1 = Double.parseDouble(places[i].get("latitude"));
                    double latitude2 = Double.parseDouble(places[j].get("latitude"));
                    double longitude1 = Double.parseDouble(places[i].get("longitude"));
                    double longitude2 = Double.parseDouble(places[j].get("longitude"));
                    this.distanceMatrix[i][j] = calculator.computeDistance(latitude1, latitude2, longitude1, longitude2);
                    this.distanceMatrix[j][i] = this.distanceMatrix[i][j];
                    if(outOfTime()) break;
                }
            }
        }

        // Arrange trip so that the starting location is preserved
        public void arrange_trip(Place[] place, int[] tour){
            int i = 0;
            for (var j = 0; j < tour.length ; j++) {
                if(tour[j] == 0){
                    i = j;
                    break;
                }
            }
            for (var j = 0; j < tour.length - 1; j++) {
                place[j] = places[tour[i]];
                i++;
                if(i == (tour.length - 1)){
                    i = 0;
                }
            }
        }

        //returns an optimized list of places
        public Place[] optimize(){
            var prev = this.inf;
            int[] temp_tour = new int[this.tour.length + 1];
            Place[] finalTrip = new Place[places.length];

            for (var j = 0; j < places.length; j++) {

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
            if(finalTrip.length > 3){arrange_trip(finalTrip,temp_tour);}
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
                if(outOfTime()) break;
            }   
            return 0; 
        }

        private void opt_2(int[] tour){
            var improvement = true;
            while (improvement){
                improvement = false;
                for (var i = 0; i <= (tour.length - 4); i++) { 
                    for (var j = i + 2; j <= (tour.length - 2); j++) { 
                        if (opt_2_improves(tour, i, j)){
                            opt_2_reverse(tour, i+1, j);
                            improvement = true;
                        }
                        if(outOfTime()) break;
                    }
                    if(outOfTime()) break;
                }
            }
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
                // if(outOfTime()) break;
            }
            return final_index;
        }

        
        private int[] nearestNeighbor(int[] tour, int start_index) {
            if(places.length > 1){
            this.tour = this.tour_1.clone();
            this.visited = this.visited_1.clone();

            this.tour[0] = start_index;
            this.opt_tour[0] =  start_index;
            this.visited[start_index] = true;
            int i = 0;
            int currrent = start_index; 
            int tour_size = places.length;
            while (i < (tour_size - 1)){
                int close_index = find_closest(currrent, this.visited);
                i++;
                this.tour[i] = close_index;
                this.opt_tour[i] = close_index;
                this.visited[close_index] = true;
                currrent = close_index;
                // if(outOfTime()) break;  
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
            return System.currentTimeMillis() > this.start + (long)this.response;
        }
    }
}
