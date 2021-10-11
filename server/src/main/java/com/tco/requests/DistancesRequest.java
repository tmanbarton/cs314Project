package com.tco.requests;

import java.lang.Math;
import java.util.ArrayList;
import java.util.Arrays;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DistancesRequest extends Request {
  private double earthRadius;
  private ArrayList<Integer> distances = new ArrayList<Integer>();
  private Places places;

  private final transient Logger log =
      LoggerFactory.getLogger(DistancesRequest.class);

  @Override
  public void buildResponse() {
    if (places.size() == 0) {
      distances = new ArrayList<Integer>();
    } else {
      distances = getDistances(places);
    }

    log.trace("buildResponse -> {}", this);
  }

  public DistancesRequest() { this.requestType = "distances"; }

  public ArrayList<Integer> getDistances(Places places) {
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
    double distance =
        2 * (this.earthRadius * 1.609344) *
        Math.asin(Math.sqrt(
            Math.pow(Math.sin((latitude2 - latitude1) / 2), 2) +
            Math.cos(latitude1) * Math.cos(latitude2) *
                Math.pow(Math.sin((longitude2 - longitude1) / 2), 2)));
    distance *= .6214;
    return (int)distance;
  }

  public void setEarthRadius(double earthRadius) {
    this.earthRadius = earthRadius;
  }

  public double getEarthRadius() { return earthRadius; }
}