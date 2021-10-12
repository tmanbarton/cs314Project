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

    double radiusAtEquator = 6378137;
    double radiusAtPoles = 6356752.314245;
    double flattenElipsoid = 1 / 298.257223563;
    double longitudeDifference = Math.toRadians(longitude2 - longitude1);
    double U1 = Math.atan((1 - flattenElipsoid) * Math.tan(Math.toRadians(latitude1)));
    double U2 = Math.atan((1 - flattenElipsoid) * Math.tan(Math.toRadians(latitude2)));
    double sinU1 = Math.sin(U1);
    double cosU1 = Math.cos(U1);
    double sinU2 = Math.sin(U2);
    double cosU2 = Math.cos(U2);
    double cosSqAlpha, sinSigma, cos2SigmaM, cosSigma, sigma;
    double lambda = longitudeDifference;
    double lambdaP;
    double iterationLimit = 100;
    
  do {
    double sinLambda = Math.sin(lambda), cosLambda = Math.cos(lambda);
    sinSigma = Math.sqrt( (cosU2 * sinLambda)
      * (cosU2 * sinLambda)
      + (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda)
      * (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda)
    );

    if (sinSigma == 0) return 0;

    cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
    sigma = Math.atan2(sinSigma, cosSigma);
    double sinAlpha = cosU1 * cosU2 * sinLambda / sinSigma;
    cosSqAlpha = 1 - sinAlpha * sinAlpha;
    cos2SigmaM = cosSigma - 2 * sinU1 * sinU2 / cosSqAlpha;
    double C = flattenElipsoid / 16 * cosSqAlpha * (4 + flattenElipsoid * (4 - 3 * cosSqAlpha));
    lambdaP = lambda;
    lambda =  longitudeDifference + (1 - C) * flattenElipsoid * sinAlpha  
      * (sigma + C * sinSigma 
        * (cos2SigmaM + C * cosSigma
          *(-1 + 2 * cos2SigmaM * cos2SigmaM)
        )
      );
  } while (Math.abs(lambda - lambdaP) > 1e-12 && --iterationLimit > 0);

  if(iterationLimit == 0) return 0;
  double uSq = cosSqAlpha * (radiusAtEquator * radiusAtEquator - radiusAtPoles * radiusAtPoles) / (radiusAtPoles * radiusAtPoles);
  double A = 1 + uSq / 16384 * (4069 + uSq * (-768 + uSq * (329 - 175 * uSq)));
  double B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
  double deltaSigma = B * sinSigma
    * (cos2SigmaM + B / 4
      * (cosSigma
        * (-1 + 2 * cos2SigmaM * cos2SigmaM) - B / 6 * cos2SigmaM
          * (-3 + 4 * sinSigma * sinSigma)
            * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
  double s = radiusAtPoles * A * (sigma - deltaSigma);
  return (int)s;
  }

  public void setEarthRadius(double earthRadius) {
    this.earthRadius = earthRadius;
  }

  public double getEarthRadius() { return earthRadius; }
}