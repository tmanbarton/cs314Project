package com.tco.requests;

import java.util.ArrayList;
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
    DistanceCalculator calc = new DistanceCalculator(places, earthRadius);
    if (places.size() == 0) {
      distances = new ArrayList<Integer>();
    } else {
      distances = calc.getDistances();
    }

    log.trace("buildResponse -> {}", this);
  }

  public DistancesRequest() { this.requestType = "distances"; }

  public void setEarthRadius(double earthRadius) {
    this.earthRadius = earthRadius;
  }

  public double getEarthRadius() { return this.earthRadius; }

  public void setPlaces(Places places){
    this.places = places;
  }

  public Places getPlaces(){
    return places;
  }

  public void setDistances(ArrayList<Integer> distances){
    this.distances = distances;
  }

  public ArrayList<Integer> getDistances(){
    return distances;
  }
}