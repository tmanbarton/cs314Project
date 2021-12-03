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
            TourUtility Util = new TourUtility(places, this.response, this.start);
            var prev = this.inf;
            int[] temp_tour = new int[this.tour.length + 1];
            Place[] finalTrip = new Place[places.length];

            for (var j = 0; j < places.length; j++) {

                this.tour = Util.nearestNeighbor(this.tour, j, this.distanceMatrix, this. opt_tour, this.tour_1, this.visited_1);
                this.opt_tour[this.tour.length] = this.tour[0];
                if(this.tour.length > 3){
                    Util.opt_2(this.opt_tour, this.distanceMatrix);
                }
                var total_distance = Util.get_distances(this.opt_tour, this.distanceMatrix);
                if (total_distance < prev){
                    System.arraycopy(this.opt_tour, 0, temp_tour, 0, this.opt_tour.length);
                    prev = total_distance;
                }
                if(outOfTime()) break;
            }
            if(finalTrip.length > 3){arrange_trip(finalTrip,temp_tour);}
            return finalTrip;
        }


        private boolean outOfTime(){
            return System.currentTimeMillis() > this.start + (long)this.response;
        }
    }
}
