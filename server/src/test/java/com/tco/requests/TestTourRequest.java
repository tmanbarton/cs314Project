package com.tco.requests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.tco.requests.TourRequest.OptimizeTrip;
import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.Arrays;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class TestTourRequest {  
  private ArrayList<String> jsonStrings = new ArrayList<String>(Arrays.asList(
      "{\"latitude\": \"0\", \"longitude\": \"0\"}",
      "{\"latitude\": \"35.350498199499995\",\"longitude\": \"-116.888000488\"}",
      "{\"latitude\": \"0\",\"longitude\": \"0\"}"));
  //Distances came from https://keisan.casio.com/exec/system/1224587128#! and that value was convert to miles using Google's km to miles converter.
  //Everything rounded down.
   private ArrayList<String> jsonStringsInOrder = new ArrayList<String>(Arrays.asList(
      "{\"latitude\": \"0\", \"longitude\": \"0\"}",
      "{\"latitude\": \"0\",\"longitude\": \"0\"}",
      "{\"latitude\": \"35.350498199499995\",\"longitude\": \"-116.888000488\"}"));

  private TourRequest tour;
  private DistanceCalculator calc;
  private Places places = new Places();
  private Places placesInOrder = new Places();
  private double earthRadius = 3958.8;
  private double response = 1;

  @BeforeEach
  public void createConfigurationForTestCases() {
    tour = new TourRequest();
    tour.setEarthRadius(earthRadius);

    for (int i = 0; i < jsonStrings.size(); i++) {
      Place place = new Gson().fromJson(jsonStrings.get(i), Place.class);
      Place placeInOrder = new Gson().fromJson(jsonStringsInOrder.get(i), Place.class);
      places.add(place);
      placesInOrder.add(placeInOrder);
    }
    tour.setPlaces(places);
    calc = new DistanceCalculator(places, earthRadius);
    tour.buildResponse();
  }

  @Test
  @DisplayName("Request type is \"tour\"")
  public void testType() {
    String type = tour.getRequestType();
    assertEquals("tour", type);
  }

  @Test
  @DisplayName("Earth Radius is correct")
  public void testEarthRadius() {
    double eR = tour.getEarthRadius();
    assertEquals(eR, earthRadius);
  }

  @Test
  @DisplayName("Tour Optimizes the trip")
  public void TestResponse() {
    OptimizeTrip tripObject = tour.new OptimizeTrip(tour.getPlaces(), tour.getEarthRadius(), 1);
    tripObject.buildDataStructures();
    Places responsePlaces = tripObject.optimize();
    assertEquals(responsePlaces, placesInOrder);
  }
}
