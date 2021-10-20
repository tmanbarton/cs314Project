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
    long latitude1 = 0;
    long longitude1 = 0;
    long latitude2 = 0;
    long longitude2 = 0;
    for (int i = 1; i < places.size(); i++) {
      latitude1 = Long.parseLong(places.get(i - 1).get("latitude"));
      longitude1 = Long.parseLong(places.get(i - 1).get("longitude"));

      latitude2 = Long.parseLong(places.get(i).get("latitude"));
      longitude2 = Long.parseLong(places.get(i).get("longitude"));

      int distance =
          computeDistance(latitude1, latitude2, longitude1, longitude2);
      distances.add(distance);
    }
    latitude1 =
        Long.parseLong(places.get(places.size() - 1).get("latitude"));
    longitude1 =
        Long.parseLong(places.get(places.size() - 1).get("longitude"));

    latitude2 = Long.parseLong(places.get(0).get("latitude"));
    longitude2 = Long.parseLong(places.get(0).get("longitude"));

    int distance =
        computeDistance(latitude1, latitude2, longitude1, longitude2);
    distances.add(distance);

    return distances;
  }

  private int computeDistance(long latitude1, long latitude2,
                              long longitude1, long longitude2) {
    latitude1 = (long)Math.toRadians((double)latitude1);
    latitude2 = (long)Math.toRadians((double)latitude2);
    longitude1 = (long)Math.toRadians((double)longitude1);
    longitude2 = (long)Math.toRadians((double)longitude2);

    double radius = getEarthRadius();
    long longitudeDifference = longitude2 - longitude1;
    double distance = radius * Math.acos(
      Math.sin(latitude1) * Math.sin(latitude2) +
        Math.cos(latitude1) * Math.cos(latitude2) * Math.cos(longitudeDifference));
    return (int)Math.round((double)distance);
  }

  public void setEarthRadius(double earthRadius) {
    this.earthRadius = earthRadius;
  }

  public double getEarthRadius() { return this.earthRadius; }
}