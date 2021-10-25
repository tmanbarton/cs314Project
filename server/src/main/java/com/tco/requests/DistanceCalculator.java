package com.tco.requests;

import java.lang.Math;
import java.util.ArrayList;

public class DistanceCalculator {
    private Places places;
    private double earthRadius; 

    public DistanceCalculator(Places places, double earthRadius){
        this.places = places;
        this.earthRadius = earthRadius;
    }

    public ArrayList<Integer> getDistances(){
        return buildDistancesArray(places);
    }

    public ArrayList<Integer> buildDistancesArray(Places places) {
        ArrayList<Integer> distances = new ArrayList<Integer>();
        double latitude1 = 0;
        double longitude1 = 0;
        double latitude2 = 0;
        double longitude2 = 0;
        for (int i = 1; i < places.size(); i++) {
          latitude1 = Double.parseDouble(places.get(i - 1).get("latitude"));
          longitude1 = Double.parseDouble(places.get(i - 1).get("longitude"));
    
          latitude2 = Double.parseDouble(places.get(i).get("latitude"));
          longitude2 = Double.parseDouble(places.get(i).get("longitude"));
    
          int distance =
              computeDistance(latitude1, latitude2, longitude1, longitude2);
          distances.add(distance);
        }
        latitude1 =
            Double.parseDouble(places.get(places.size() - 1).get("latitude"));
        longitude1 =
            Double.parseDouble(places.get(places.size() - 1).get("longitude"));
    
        latitude2 = Double.parseDouble(places.get(0).get("latitude"));
        longitude2 = Double.parseDouble(places.get(0).get("longitude"));
    
        int distance =
            computeDistance(latitude1, latitude2, longitude1, longitude2);
        distances.add(distance);
    
        return distances;
    }
    
    private int computeDistance(double latitude1, double latitude2,
                                  double longitude1, double longitude2) {
        latitude1 = Math.toRadians(latitude1);
        latitude2 = Math.toRadians(latitude2);
        longitude1 = Math.toRadians(longitude1);
        longitude2 = Math.toRadians(longitude2);
    
        double radius = this.earthRadius;
        double longitudeDifference = longitude2 - longitude1;
        double distance = radius * Math.acos(
          Math.sin(latitude1) * Math.sin(latitude2) +
            Math.cos(latitude1) * Math.cos(latitude2) * Math.cos(longitudeDifference));
        return (int)Math.round(distance);
    }
    
}
