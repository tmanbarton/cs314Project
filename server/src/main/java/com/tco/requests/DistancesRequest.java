package com.tco.requests;

import java.util.ArrayList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DistancesRequest extends Request {
  private double earthRadius;
  private ArrayList<Long> distances = new ArrayList<Long>();
  private Place[] places;

  private final transient Logger log =
      LoggerFactory.getLogger(DistancesRequest.class);

  @Override
  public void buildResponse() {
    DistanceCalculator calc = new DistanceCalculator(places, earthRadius);
    if (places.length == 0) {
      distances = new ArrayList<Long>();
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

  public void setPlaces(Place[] places){
    this.places = places;
  }

  public ArrayList<Long> getDistances(){
    return distances;
  }
}
