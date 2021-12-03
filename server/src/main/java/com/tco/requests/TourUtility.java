package com.tco.requests;

import java.lang.Math;
import java.util.ArrayList;


public class TourUtility{
        private Place[] places;
        private double inf = 100000000000.0d;
        private int[] tour;
        private boolean[] visited;
        private double response;
        private long start;

        public TourUtility(Place[] places, double response, long start){
            this.places = places;
            int placeSize = places.length;
            this.tour = new int[placeSize];
            this.visited = new boolean[placeSize];
            this.tour = new int[placeSize];
            this.visited = new boolean[placeSize];
            this.response = response;
            this.start = start;
        }

        // returns the index of closest destination from current point using distance matrix
        public int find_closest(int index, boolean[] visited, double[][] distanceMatrix){ 
            var value = this.inf;
            var final_index = 0;
            for (var i = 0; i < distanceMatrix[index].length; i++) {
                if (distanceMatrix[index][i] < value && visited[i]!=true && index!=i) {
                  value = distanceMatrix[index][i];
                  final_index = i;
                }
                if(outOfTime()) break;
            }
            return final_index;
        }

        
        public int[] nearestNeighbor(int[] tour, int start_index, double[][] distanceMatrix, int[] opt_tour, int[] tour_1, boolean[] visited_1) {
            System.arraycopy(visited_1, 0, this.visited, 0, visited_1.length);
            System.arraycopy(tour_1, 0, this.tour, 0, tour_1.length);
            this.tour[0] = start_index;
            opt_tour[0] =  start_index;
            this.visited[start_index] = true;
            int i = 0;
            int currrent = start_index; 
            int tour_size = places.length;
            while (i < (tour_size - 1)){
                int close_index = find_closest(currrent, this.visited, distanceMatrix);
                i++;
                this.tour[i] = close_index;
                opt_tour[i] = close_index;
                this.visited[close_index] = true;
                currrent = close_index;
                if(outOfTime()) break;  
            }
            return this.tour;
        }


        public double get_distances(int[] tour, double[][] distanceMatrix){ 
            double total = 0;
            for (var i = 0; i < (tour.length - 1); i++){
                total += distanceMatrix[tour[i]][tour[i+1]];
            }
            return total;
        }

        // Find distance from point j to point k
        public double leg_dist(int[] tour, int j, int k, double[][] distanceMatrix){ 
            return distanceMatrix[tour[j]][tour[k]];
        }

        private boolean opt_2_improves(int[] tour, int i, int j, double[][] distanceMatrix){
            return ((leg_dist(tour, i, j, distanceMatrix) + leg_dist(tour, i+1, j+1, distanceMatrix)) < (leg_dist(tour, i, i+1, distanceMatrix) + leg_dist(tour, j, j+1, distanceMatrix)));    
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

        public void opt_2(int[] tour, double[][] distanceMatrix){
            var improvement = true;
            while (improvement){
                improvement = false;
                for (var i = 0; i <= (tour.length - 4); i++) { 
                    for (var j = i + 2; j <= (tour.length - 2); j++) { 
                        if (opt_2_improves(tour, i, j, distanceMatrix)){
                            opt_2_reverse(tour, i+1, j);
                            improvement = true;
                        }
                        if(outOfTime()) break;
                    }
                    if(outOfTime()) break;
                }
            }
        }

        private boolean outOfTime(){
            return System.currentTimeMillis() > this.start + (long)this.response;
        }
}